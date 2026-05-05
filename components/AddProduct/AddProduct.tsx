import React, { useState, useMemo } from "react";
import { View, FlatList, Text } from "react-native";
import { DASHBOARD_DATA } from "../MainScreen/constants";
import AddProductHeader from "./components/AddProductHeader";
import ManualAddButton from "./components/ManualAddButton";
import SearchResultItem from "./components/SearchResultItem";
import ProductPreview from "./components/ProductPreview";
import ManualAddForm from "./components/ManualAddForm";
import { CosmeticCard } from "../MainScreen/typedefs";

enum Step {
  SEARCH,
  PRODUCT_PREVIEW,
  MANUAL_FORM
}

export const AddProduct = () => {
  const [step, setStep] = useState<Step>(Step.SEARCH);
  const [searchQuery, setSearchValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<CosmeticCard | null>(null);

  const filteredData = useMemo(() => {
    if (!searchQuery) return []; // Default to empty list instead of all products
    return DASHBOARD_DATA.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleBack = () => {
    if (step !== Step.SEARCH) {
      setStep(Step.SEARCH);
      setSelectedProduct(null);
    }
  };

  const handleAddToCollection = (data: any) => {
    console.log("Adding product to collection:", data);
    // Real logic to update global state goes here
  };

  const renderContent = () => {
    switch (step) {
      case Step.PRODUCT_PREVIEW:
        return selectedProduct && (
          <ProductPreview 
            product={selectedProduct} 
            onAdd={() => handleAddToCollection(selectedProduct)} 
          />
        );
      case Step.MANUAL_FORM:
        return <ManualAddForm onAdd={handleAddToCollection} />;
      default:
        return (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
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
                  setStep(Step.PRODUCT_PREVIEW);
                }} 
              />
            )}
            ListEmptyComponent={
              searchQuery.length > 0 ? (
                <View className="items-center mt-10">
                  <Text className="text-brand-pink-900/40">No products found</Text>
                </View>
              ) : (
                <View className="items-center mt-10 px-6">
                  <Text className="text-brand-pink-900/40 text-center">
                    Search for a product above to add it to your collection.
                  </Text>
                </View>
              )
            }
          />
        );
    }
  };

  const getTitle = () => {
    if (step === Step.PRODUCT_PREVIEW) return "Product Details";
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
        onSearchChange={setSearchValue}
      />
      {renderContent()}
    </View>
  );
};

export default AddProduct;
