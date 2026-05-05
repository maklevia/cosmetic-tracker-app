import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Image } from "expo-image";
import { CosmeticCard } from "../../../typedefs";

const { width } = Dimensions.get("window");
export const CARD_WIDTH = width * 0.7;

export const ExpiredCard = ({ item }: { item: CosmeticCard }) => {
  return (
    <View
      style={{ width: CARD_WIDTH }}
      className="mr-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-brand-pink-100"
    >
      <Image
        source={{ uri: item.imageUrl }}
        contentFit="cover"
        transition={500}
        style={{ height: 160, width: '100%' }}
      />
      <View className="p-4">
        <Text className="text-xs font-medium text-brand-pink-900/60 uppercase tracking-wider">
          {item.brand}
        </Text>
        <Text className="mt-1 text-lg font-bold text-brand-pink-900" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="mt-1 text-sm text-brand-pink-900/70" numberOfLines={2}>
          {item.description}
        </Text>
        {item.expirationDate && (
          <View className="mt-3 flex-row items-center">
            <View className="h-2 w-2 rounded-full bg-rose-500 mr-2" />
            <Text className="text-xs font-semibold text-rose-500">
              Expiring: {item.expirationDate}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
