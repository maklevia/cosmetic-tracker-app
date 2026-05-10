import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Product } from "@/api/services/productService";
import { getFullImageUrl } from "@/api/apiClient";
import { getGlobalDisplayData } from "@/utils/display";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
export const CARD_WIDTH = width * 0.45; // Smaller cards for trending

export const TrendingCard = ({ item }: { item: Product }) => {
  const displayData = getGlobalDisplayData(item);
  const imageUrl = getFullImageUrl(displayData.imageUrl);
  
  return (
    <View
      style={{ width: CARD_WIDTH }}
      className="mr-3 overflow-hidden rounded-xl bg-white shadow-sm border border-brand-pink-100"
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          contentFit="contain"
          transition={500}
          style={{ height: 120, width: '100%' }}
          className="bg-white"
        />
      ) : (
        <View 
          style={{ height: 120, width: '100%' }} 
          className="bg-brand-pink-100/10 items-center justify-center border-b border-brand-pink-100"
        >
          <Ionicons name="camera-outline" size={28} color="#83184330" />
        </View>
      )}
      <View className="p-3">
        <Text className="text-[10px] font-medium text-brand-pink-900/60 uppercase tracking-wider">
          {displayData.brand}
        </Text>
        <Text className="mt-0.5 text-sm font-bold text-brand-pink-900" numberOfLines={1}>
          {displayData.title}
        </Text>
      </View>
    </View>
  );
};
