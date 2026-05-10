import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Product } from "@/api/services/productService";
import { getFullImageUrl } from "@/api/apiClient";
import { getGlobalDisplayData } from "@/utils/display";
import { Ionicons } from "@expo/vector-icons";

interface SearchResultItemProps {
  item: Product;
  onPress: () => void;
}

export const SearchResultItem = ({ item, onPress }: SearchResultItemProps) => {
  const displayData = getGlobalDisplayData(item);
  const imageUrl = getFullImageUrl(displayData.imageUrl);

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white border-b border-brand-pink-100 flex-row items-center p-4"
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          contentFit="contain"
          style={{ width: 50, height: 50 }}
          className="rounded-xl bg-white"
        />
      ) : (
        <View 
          style={{ width: 50, height: 50 }} 
          className="bg-brand-pink-100/10 items-center justify-center rounded-xl"
        >
          <Ionicons name="camera-outline" size={20} color="#83184330" />
        </View>
      )}

      <View className="ml-4 flex-1">
        <Text className="text-[10px] font-bold text-brand-pink-900/50 uppercase tracking-widest">
          {displayData.brand}
        </Text>
        <Text className="text-brand-pink-900 font-bold" numberOfLines={1}>
          {displayData.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
