import React, { useState, useEffect } from "react";
import { View, FlatList, Text, ActivityIndicator, Alert } from "react-native";
import AddProductHeader from "./components/AddProductHeader";
import ManualAddButton from "./components/ManualAddButton";
import SearchResultItem from "./components/SearchResultItem";
import ManualAddForm from "./components/ManualAddForm";
import { useRouter } from "expo-router";
import productService, { Product, SourceStatus } from "@/api/services/productService";
import collectionService from "@/api/services/collectionService";
import imageService from "@/api/services/imageService";
import { getFullImageUrl } from "@/api/apiClient";

enum Step {
  SEARCH,
  PRODUCT_DETAILS_FORM,
  MANUAL_FORM
}

export const AddProduct = () => {
  const [step, setStep] = useState<Step>(Step.SEARCH);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        performSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = async () => {
    try {
      setIsLoading(true);
      const results = await productService.search(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step !== Step.SEARCH) {
      setStep(Step.SEARCH);
      setSelectedProduct(null);
    } else {
      router.back();
    }
  };

  const handleAddToCollection = async (data: any) => {
    // 1. Mandatory Fields Validation
    if (!data.title || !data.brand || !data.openedDate || !data.pao) {
      Alert.alert("Required Fields", "Please fill in Product Name, Brand, Opened Date, and PAO.");
      return;
    }

    setIsLoading(true);
    try {
      let productId = selectedProduct?.id;

      // Logic for creating NEW product if manual
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

      // Handle Image for parsed products (if user changed it)
      let userAddedImageId = undefined;
      if (step === Step.PRODUCT_DETAILS_FORM && data.imageUrl && data.imageUrl.startsWith('file://')) {
        const uploaded = await imageService.upload(data.imageUrl, 'product');
        userAddedImageId = uploaded.id;
      }

      // Add to collection
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
  };

  const renderContent = () => {
    switch (step) {
      case Step.PRODUCT_DETAILS_FORM:
        return selectedProduct && (
          <ManualAddForm 
            onAdd={handleAddToCollection} 
            isLoading={isLoading}
            initialData={{
              brand: selectedProduct.brand,
              title: selectedProduct.title,
              description: selectedProduct.description,
              imageUrl: getFullImageUrl(selectedProduct.image?.path || selectedProduct.image?.url)
            }}
          />
        );
      case Step.MANUAL_FORM:
        return <ManualAddForm onAdd={handleAddToCollection} isLoading={isLoading} />;
      default:
        return (
          <View className="flex-1">
            {isLoading && searchQuery.length > 0 && (
              <ActivityIndicator size="small" color="#831843" className="mt-4" />
            )}
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={
                searchQuery.length > 0 ? (
                  <ManualAddButton onPress={() => setStep(Step.MANUAL_FORM)} />
                ) : null
              }
              renderItem={({ item }) => (
                <SearchResultItem 
                  item={item} 
                  onPress={() => {
                    setSelectedProduct(item);
                    setStep(Step.PRODUCT_DETAILS_FORM);
                  }} 
                />
              )}
              ListEmptyComponent={
                searchQuery.length > 0 && !isLoading ? (
                  <View className="items-center mt-10">
                    <Text className="text-brand-pink-900/40">No products found</Text>
                  </View>
                ) : !isLoading ? (
                  <View className="items-center mt-10 px-6">
                    <Text className="text-brand-pink-900/40 text-center">
                      Search for a product above to add it to your collection.
                    </Text>
                  </View>
                ) : null
              }
            />
          </View>
        );
    }
  };

  const getTitle = () => {
    if (step === Step.PRODUCT_DETAILS_FORM) return "Product Details";
    if (step === Step.MANUAL_FORM) return "Add Manually";
    return "Add Product";
  };

  return (
    <View className="flex-1 bg-brand-pink-50">
      <AddProductHeader 
        title={getTitle()}
        onBack={step !== Step.SEARCH ? handleBack : undefined}
        showSearch={step === Step.SEARCH}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />
      {renderContent()}
    </View>
  );
};

export default AddProduct;
