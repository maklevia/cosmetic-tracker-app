import React from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { AddProductHeader } from "./components/AddProductHeader";
import { ManualAddButton } from "./components/ManualAddButton";
import { SearchResultItem } from "./components/SearchResultItem";
import { ManualAddForm } from "./components/ManualAddForm";
import { ProductPreview } from "./components/ProductPreview";
import { CollectionDetailsForm } from "./components/CollectionDetailsForm";
import { useAddProduct } from "./hooks/useAddProduct";
import { Step } from "./typedefs";

export const AddProduct = () => {
  const {
    step,
    setStep,
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedProduct,
    isLoading,
    handleBack,
    handleAddToCollection,
    getTitle,
    selectProduct
  } = useAddProduct();

  const renderContent = () => {
    switch (step) {
      case Step.GLOBAL_PREVIEW:
        return selectedProduct && (
          <ProductPreview 
            product={selectedProduct} 
            onContinue={() => setStep(Step.COLLECTION_DETAILS_FORM)} 
          />
        );
      case Step.COLLECTION_DETAILS_FORM:
        return (
          <CollectionDetailsForm 
            onAdd={handleAddToCollection} 
            isLoading={isLoading} 
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
                  onPress={() => selectProduct(item)} 
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
