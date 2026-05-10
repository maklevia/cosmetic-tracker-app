import React from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { GlobalHeader } from "../GlobalHeader/GlobalHeader";
import ExpiredDashboard from "./components/ExpiredDashboard/ExpiredDashboard";
import TrendingDashboard from "./components/TrendingDashboard/TrendingDashboard";
import { useRouter } from "expo-router";
import { CollectionItem } from "@/api/services/collectionService";
import { Product } from "@/api/services/productService";
import { useMainScreenData } from "./hooks/useMainScreenData";

export const MainScreen = () => {
  const router = useRouter();
  const { expiringProducts, trendingProducts, isLoading } = useMainScreenData();

  const handleProductPress = (item: CollectionItem | Product) => {
    const productId = 'product' in item ? item.product.id : item.id;
    const collectionItemId = 'product' in item ? item.id : undefined;
    
    router.push({
      pathname: "/product-details",
      params: { id: productId, collectionItemId } as any,
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-brand-pink-50">
        <GlobalHeader />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#831843" />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-brand-pink-50">
      <GlobalHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
      >
        <ExpiredDashboard products={expiringProducts} onProductPress={handleProductPress} />
        <TrendingDashboard products={trendingProducts} onProductPress={handleProductPress} />
      </ScrollView>
    </View>
  );
};

export default MainScreen;
