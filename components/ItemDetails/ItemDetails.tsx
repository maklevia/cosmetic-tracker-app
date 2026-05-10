import React from "react";
import { View, ScrollView, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { ItemDetailsHeader } from "./components/Header";
import { ProductImage } from "./components/ProductImage";
import { ProductInfo } from "./components/ProductInfo";
import { ProductDates } from "./components/ProductDates";
import { ProductDescription } from "./components/ProductDescription";
import { ProductReview } from "./components/ProductReview";
import { EditButton } from "./components/EditButton";
import { ProductActions } from "./components/ProductActions";
import { useRouter } from "expo-router";
import { formatDate, calculateExpirationDate } from "@/utils/date";
import { useItemDetails } from "./hooks/useItemDetails";
import { ItemDetailsProps } from "./typedefs";

export const ItemDetails = ({ id, collectionItemId, initialProduct, initialCollectionItem }: ItemDetailsProps) => {
  const router = useRouter();
  const {
    product,
    collectionItem,
    isLoading,
    isArchived,
    isExpired,
    userReview,
    displayData,
    imageUrl,
    archiveText,
    handleEditPress,
    handleArchive,
    handleUnarchive,
    handleDelete
  } = useItemDetails(id, collectionItemId, initialProduct, initialCollectionItem);

  if (isLoading) {
    return (
      <View className="flex-1 bg-brand-pink-50 items-center justify-center">
        <ActivityIndicator size="large" color="#831843" />
      </View>
    );
  }

  if (!product || !displayData) {
    return (
      <View className="flex-1 bg-brand-pink-50 items-center justify-center">
        <Text className="text-brand-pink-900">Product not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-brand-pink-900 font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-brand-pink-50">
      <ItemDetailsHeader isArchived={isArchived} isExpired={isExpired} />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 24 }}
      >
        <ProductImage imageUrl={imageUrl || ""} />
        
        <View>
          <ProductInfo brand={displayData.brand} title={displayData.title} />
          
          {archiveText && (
            <View className="bg-rose-100/50 p-3 rounded-xl mt-4 border border-rose-200">
              <Text className="text-rose-600 font-bold text-sm text-center">
                {archiveText}
              </Text>
            </View>
          )}

          <ProductDates 
            openedDate={formatDate(collectionItem?.openedDate) || undefined} 
            expirationDate={calculateExpirationDate(collectionItem?.openedDate, collectionItem?.pao) || undefined} 
          />

          <ProductDescription description={displayData.description} />
          
          <ProductReview review={userReview} /> 
          
          <View className="mt-10">
            {collectionItem && <EditButton onPress={handleEditPress} />}
            <ProductActions 
              onArchive={handleArchive} 
              onUnarchive={handleUnarchive}
              onDelete={handleDelete} 
              isArchived={isArchived}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ItemDetails;
