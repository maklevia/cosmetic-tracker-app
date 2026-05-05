import React from "react";
import { View, ScrollView } from "react-native";
import { ItemDetailsHeader } from "./components/Header";
import { ProductImage } from "./components/ProductImage";
import { ProductInfo } from "./components/ProductInfo";
import { ProductDates } from "./components/ProductDates";
import { ProductDescription } from "./components/ProductDescription";
import { ProductReview } from "./components/ProductReview";
import { EditButton } from "./components/EditButton";
import { ProductActions } from "./components/ProductActions";
import { CosmeticCard } from "../MainScreen/typedefs";
import { useRouter } from "expo-router";

interface ItemDetailsProps {
  product: CosmeticCard;
  isArchived?: boolean;
}

export const ItemDetails = ({ product, isArchived }: ItemDetailsProps) => {
  const router = useRouter();

  const handleEditPress = () => {
    router.push({
      pathname: "/edit-product",
      params: { id: product.id }
    });
  };

  const handleArchive = (reason: string) => {
    console.log(`Archiving product ${product.id} because: ${reason}`);
    // In a real app, update state/database here
    router.back();
  };

  const handleUnarchive = () => {
    console.log(`Moving product ${product.id} out of archive`);
    // In a real app, update state/database here
    router.back();
  };

  const handleDelete = () => {
    console.log(`Deleting product ${product.id}`);
    // In a real app, update state/database here
    router.back();
  };

  return (
    <View className="flex-1 bg-brand-pink-50">
      <ItemDetailsHeader isArchived={isArchived} />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 24 }}
      >
        <ProductImage imageUrl={product.imageUrl} />
        
        <View>
          <ProductInfo brand={product.brand} title={product.title} />
          
          <ProductDates 
            openedDate={product.openedDate} 
            expirationDate={product.expirationDate} 
          />

          <ProductDescription description={product.description} />
          
          <ProductReview review={product.review} />
          
          <View className="mt-10">
            <EditButton onPress={handleEditPress} />
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
