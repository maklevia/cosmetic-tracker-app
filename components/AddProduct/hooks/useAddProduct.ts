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

  const handleBack = useCallback(() => {
    if (step !== Step.SEARCH) {
      setStep(Step.SEARCH);
      setSelectedProduct(null);
    } else {
      router.back();
    }
  }, [step, router]);

  const handleAddToCollection = useCallback(async (data: any) => {
    if (!data.title || !data.brand || !data.openedDate || !data.pao) {
      Alert.alert("Required Fields", "Please fill in Product Name, Brand, Opened Date, and PAO.");
      return;
    }

    setIsLoading(true);
    try {
      let productId = selectedProduct?.id;

      if (step === Step.MANUAL_FORM) {
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

      let userAddedImageId = undefined;
      if (step === Step.PRODUCT_DETAILS_FORM && data.imageUrl && data.imageUrl.startsWith('file://')) {
        const uploaded = await imageService.upload(data.imageUrl, 'product');
        userAddedImageId = uploaded.id;
      }

      await collectionService.add({
        productId: productId,
        openedDate: data.openedDate,
        pao: parseInt(data.pao),
        userAddedTitle: (selectedProduct && data.title !== selectedProduct.title) ? data.title : undefined,
        userAddedDescription: (selectedProduct && data.description !== selectedProduct.description) ? data.description : undefined,
        userAddedImageId: userAddedImageId
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
    if (step === Step.PRODUCT_DETAILS_FORM) return "Product Details";
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
    isLoading,
    handleBack,
    handleAddToCollection,
    getTitle
  };
};
