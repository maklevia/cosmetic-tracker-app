import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { DASHBOARD_DATA } from "@/components/MainScreen/constants";
import ItemDetails from "@/components/ItemDetails/ItemDetails";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const product = DASHBOARD_DATA.find(p => p.id === id) || 
                  DASHBOARD_DATA.find(p => `archived-${p.id}` === id);

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

  const isArchived = id?.toString().startsWith('archived-');

  return <ItemDetails product={product} isArchived={isArchived} />;
}
