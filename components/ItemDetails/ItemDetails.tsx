import React from "react";
import { View, ScrollView, Alert } from "react-native";
import { ItemDetailsHeader } from "./components/Header";
import { ProductImage } from "./components/ProductImage";
import { ProductInfo } from "./components/ProductInfo";
import { ProductDates } from "./components/ProductDates";
import { ProductDescription } from "./components/ProductDescription";
import { ProductReview } from "./components/ProductReview";
import { EditButton } from "./components/EditButton";
import { ProductActions } from "./components/ProductActions";
import { useRouter } from "expo-router";
import { Product } from "@/api/services/productService";
import collectionService, { CollectionItem } from "@/api/services/collectionService";
import { calculateExpirationDate, formatDate } from "@/utils/date";
import { getDisplayData } from "@/utils/display";
import { getFullImageUrl } from "@/api/apiClient";

interface ItemDetailsProps {
  product: Product;
  collectionItem?: CollectionItem | null;
}

export const ItemDetails = ({ product, collectionItem }: ItemDetailsProps) => {
  const router = useRouter();
  const isArchived = collectionItem?.itemStatus === 'archived';

  const displayData = collectionItem ? getDisplayData(collectionItem) : {
    title: product.title,
    brand: product.brand,
    description: product.description,
    imageUrl: product.image?.path || product.image?.url || null
  };

  const imageUrl = getFullImageUrl(displayData.imageUrl);

  const handleEditPress = () => {
    router.push({
      pathname: "/edit-product",
      params: { id: product.id, collectionItemId: collectionItem?.id }
    });
  };

  const handleArchive = async (reason: string) => {
    if (!collectionItem) return;
    try {
      await collectionService.update(collectionItem.id, { 
        itemStatus: 'archived', 
        notes: reason 
      });
      Alert.alert("Success", "Product archived");
      router.replace("/(tabs)/allProducts");
    } catch (error) {
      console.error("Failed to archive:", error);
      Alert.alert("Error", "Failed to archive product");
    }
  };

  const handleUnarchive = async () => {
    if (!collectionItem) return;
    try {
      await collectionService.update(collectionItem.id, { itemStatus: 'active' });
      Alert.alert("Success", "Product moved to active collection");
      router.replace("/(tabs)/allProducts");
    } catch (error) {
      console.error("Failed to unarchive:", error);
      Alert.alert("Error", "Failed to unarchive product");
    }
  };

  const handleDelete = async () => {
    if (!collectionItem) return;
    Alert.alert(
      "Delete Product",
      "Are you sure you want to remove this product from your collection?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await collectionService.delete(collectionItem.id);
              router.replace("/(tabs)/allProducts");
            } catch (error) {
              console.error("Failed to delete:", error);
              Alert.alert("Error", "Failed to delete product");
            }
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-brand-pink-50">
      <ItemDetailsHeader isArchived={isArchived} />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 24 }}
      >
        <ProductImage imageUrl={imageUrl || "https://via.placeholder.com/300"} />
        
        <View>
          <ProductInfo brand={displayData.brand} title={displayData.title} />
          
          <ProductDates 
            openedDate={formatDate(collectionItem?.openedDate) || undefined} 
            expirationDate={calculateExpirationDate(collectionItem?.openedDate, collectionItem?.pao) || undefined} 
          />

          <ProductDescription description={displayData.description} />
          
          <ProductReview review={undefined} /> 
          
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
