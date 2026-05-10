import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import productService, { Product, SourceStatus } from "@/api/services/productService";
import collectionService from "@/api/services/collectionService";
import imageService from "@/api/services/imageService";
import { Step, AddProductHookData } from "../typedefs";

export const useAddProduct = (): AddProductHookData => {
  const [step, setStep] = useState<Step>(Step.SEARCH);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const performSearch = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      const results = await productService.search(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  const selectProduct = useCallback(async (product: Product) => {
    try {
      setIsLoading(true);
      const fullProduct = await productService.getById(product.id);
      setSelectedProduct(fullProduct);
      setStep(Step.GLOBAL_PREVIEW);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      Alert.alert("Error", "Could not load product details.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBack = useCallback(() => {
    if (step === Step.COLLECTION_DETAILS_FORM && selectedProduct) {
      setStep(Step.GLOBAL_PREVIEW);
    } else if (step === Step.GLOBAL_PREVIEW || step === Step.MANUAL_FORM) {
      setStep(Step.SEARCH);
      setSelectedProduct(null);
    } else {
      router.back();
    }
  }, [step, selectedProduct, router]);

  const handleAddToCollection = useCallback(async (data: any) => {
    if (!data.openedDate || !data.pao) {
      Alert.alert("Required Fields", "Please fill in Opened Date and PAO.");
      return;
    }

    setIsLoading(true);
    try {
      let productId = selectedProduct?.id;

      if (step === Step.MANUAL_FORM) {
        if (!data.title || !data.brand) {
          Alert.alert("Required Fields", "Please fill in Product Name and Brand.");
          setIsLoading(false);
          return;
        }

        let imageId = undefined;
        if (data.imageUrl && data.imageUrl.startsWith('file://')) {
          const uploaded = await imageService.upload(data.imageUrl, 'product');
          imageId = uploaded.id;
        }

        const newProduct = await productService.create({
          brand: data.brand,
          title: data.title,
          description: data.description || "",
          sourceStatus: SourceStatus.ADDED_MANUALLY,
          imageId: imageId
        });
        productId = newProduct.id;
      }

      if (!productId) throw new Error("No product ID found");

      await collectionService.add({
        productId: productId,
        openedDate: data.openedDate,
        pao: parseInt(data.pao),
        userAddedDescription: step === Step.MANUAL_FORM ? data.description : undefined
      });

      Alert.alert("Success", "Product added to your collection!");
      router.replace("/(tabs)/allProducts");
    } catch (error: any) {
      console.error("Failed to add product:", error);
      Alert.alert("Error", error.response?.data?.message || "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  }, [selectedProduct, step, router]);

  const getTitle = useCallback(() => {
    if (step === Step.GLOBAL_PREVIEW) return "Product Preview";
    if (step === Step.COLLECTION_DETAILS_FORM) return "Add to Collection";
    if (step === Step.MANUAL_FORM) return "Add Manually";
    return "Add Product";
  }, [step]);

  return {
    step,
    setStep,
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedProduct,
    setSelectedProduct,
    selectProduct,
    isLoading,
    handleBack,
    handleAddToCollection,
    getTitle
  };
};
