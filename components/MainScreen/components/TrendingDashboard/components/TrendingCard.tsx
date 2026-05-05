import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Image } from "expo-image";
import { CosmeticCard } from "../../../typedefs";

const { width } = Dimensions.get("window");
export const CARD_WIDTH = width * 0.45; // Smaller cards for trending

export const TrendingCard = ({ item }: { item: CosmeticCard }) => {
  return (
    <View
      style={{ width: CARD_WIDTH }}
      className="mr-3 overflow-hidden rounded-xl bg-white shadow-sm border border-brand-pink-100"
    >
      <Image
        source={{ uri: item.imageUrl }}
        contentFit="cover"
        transition={500}
        style={{ height: 120, width: '100%' }}
      />
      <View className="p-3">
        <Text className="text-[10px] font-medium text-brand-pink-900/60 uppercase tracking-wider">
          {item.brand}
        </Text>
        <Text className="mt-0.5 text-sm font-bold text-brand-pink-900" numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </View>
  );
};
