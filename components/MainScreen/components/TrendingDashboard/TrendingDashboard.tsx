import React from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { Heading } from "@/components/ui/heading";
import { TrendingCard, CARD_WIDTH } from "./components/TrendingCard";
import { Product } from "@/api/services/productService";

const SPACING = 16;

interface TrendingDashboardProps {
  products: Product[];
  onProductPress: (product: Product) => void;
}

export default function TrendingDashboard({ products, onProductPress }: TrendingDashboardProps) {
  if (products.length === 0) return null;

  return (
    <View className="mb-8">
      <Heading size="xl" className="mb-4 px-4 text-brand-pink-900">
        Trending among our users
      </Heading>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 12} // 12 is mr-3
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onProductPress(item)} activeOpacity={0.9}>
            <TrendingCard item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
