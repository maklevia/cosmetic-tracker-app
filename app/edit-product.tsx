import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import EditProduct from "@/components/EditProduct/EditProduct";
import productService, { Product } from "@/api/services/productService";
import collectionService, { CollectionItem } from "@/api/services/collectionService";

export default function EditProductScreen() {
  const { id, collectionItemId } = useLocalSearchParams();
  const router = useRouter();
  const [item, setItem] = useState<CollectionItem | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      setIsLoading(true);
      if (collectionItemId) {
        const collection = await collectionService.getByUser();
        // Check both active and archived as the user might be editing from archive
        const archivedCollection = await collectionService.getByUser('archived');
        const fullCollection = [...collection, ...archivedCollection];
        
        const found = fullCollection.find(c => c.id === parseInt(collectionItemId as string));
        if (found) {
          setItem(found);
          setProduct(found.product as any);
        }
      } else if (id) {
        const data = await productService.getById(parseInt(id as string));
        setProduct(data);
      }
    } catch (error) {
      console.error("Failed to load product for editing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [id, collectionItemId])
  );

  if (isLoading) {
    return (
      <View className="flex-1 bg-brand-pink-50 items-center justify-center">
        <ActivityIndicator size="large" color="#831843" />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 bg-brand-pink-50 items-center justify-center">
        <Text className="text-brand-pink-900">Product not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-brand-pink-900 font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <EditProduct product={product} collectionItem={item} />;
}
