import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Image } from "expo-image";
import { CollectionItem } from "@/api/services/collectionService";
import { getFullImageUrl } from "@/api/apiClient";
import { calculateExpirationDate } from "@/utils/date";

import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
export const CARD_WIDTH = width * 0.7;

export const ExpiredCard = ({ item }: { item: CollectionItem }) => {
  const product = item.product;
  const imageUrl = getFullImageUrl(item.customImage?.path || product.image?.path || product.image?.url);
  const expirationDate = calculateExpirationDate(item.openedDate, item.pao);

  return (
    <View
      style={{ width: CARD_WIDTH }}
      className="mr-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-brand-pink-100"
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          contentFit="cover"
          transition={500}
          style={{ height: 160, width: '100%' }}
        />
      ) : (
        <View 
          style={{ height: 160, width: '100%' }} 
          className="bg-brand-pink-100/10 items-center justify-center border-b border-brand-pink-100"
        >
          <Ionicons name="camera-outline" size={48} color="#83184320" />
        </View>
      )}
      <View className="p-4">
        <Text className="text-xs font-medium text-brand-pink-900/60 uppercase tracking-wider">
          {product.brand}
        </Text>
        <Text className="mt-1 text-lg font-bold text-brand-pink-900" numberOfLines={1}>
          {product.title}
        </Text>
        {expirationDate && (
          <View className="mt-3 flex-row items-center">
            <View className="h-2 w-2 rounded-full bg-rose-500 mr-2" />
            <Text className="text-xs font-semibold text-rose-500">
              Expiring: {expirationDate}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
