import React from "react";
import { FlatList, View, TouchableOpacity, Text } from "react-native";
import { Heading } from "@/components/ui/heading";
import { useRouter } from "expo-router";
import { ExpiredCard, CARD_WIDTH } from "./components/ExpiredCard";
import { CollectionItem } from "@/api/services/collectionService";

const SPACING = 16;

interface ExpiredDashboardProps {
  products: CollectionItem[];
  onProductPress: (product: CollectionItem) => void;
}

export default function ExpiredDashboard({ products, onProductPress }: ExpiredDashboardProps) {
  const router = useRouter();

  if (products.length === 0) return null;

  return (
    <View className="mb-8">
      <View className="flex-row items-center justify-between px-4 mb-4">
        <Heading size="xl" className="text-brand-pink-900">
          Expiring Products
        </Heading>
        <TouchableOpacity onPress={() => router.push("/allProducts")}>
          <Text className="text-brand-pink-900 font-bold text-sm">See my products</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onProductPress(item)} activeOpacity={0.9}>
            <ExpiredCard item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
