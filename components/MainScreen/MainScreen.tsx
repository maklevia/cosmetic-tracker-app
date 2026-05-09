import React, { useState, useCallback } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import GlobalHeader from "../GlobalHeader/GlobalHeader";
import ExpiredDashboard from "./components/ExpiredDashboard/ExpiredDashboard";
import TrendingDashboard from "./components/TrendingDashboard/TrendingDashboard";
import { useRouter, useFocusEffect } from "expo-router";
import collectionService, { CollectionItem } from "@/api/services/collectionService";
import productService, { Product } from "@/api/services/productService";
import { getToken } from "@/utils/storage";

export const MainScreen = () => {
  const router = useRouter();
  const [expiringProducts, setExpiringProducts] = useState<CollectionItem[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async (showLoading = true) => {
    try {
      if (showLoading) setIsLoading(true);
      const [dashboardResponse, products] = await Promise.all([
        collectionService.getDashboard(),
        productService.getAll()
      ]);
      
      const allItems = (dashboardResponse as any).soonToExpire || [];
      
      const now = new Date();
      const oneMonthFromNow = new Date();
      oneMonthFromNow.setDate(now.getDate() + 30);

      const expiringSoon = allItems
        .filter((item: CollectionItem) => {
          if (item.itemStatus === 'archived') return false;
          if (!item.openedDate || !item.pao) return false;
          
          const opened = new Date(item.openedDate);
          const expires = new Date(opened);
          expires.setMonth(expires.getMonth() + item.pao);
          
          return expires <= oneMonthFromNow;
        })
        .sort((a: CollectionItem, b: CollectionItem) => {
          const expA = new Date(a.openedDate!);
          expA.setMonth(expA.getMonth() + a.pao!);
          
          const expB = new Date(b.openedDate!);
          expB.setMonth(expB.getMonth() + b.pao!);
          
          return expA.getTime() - expB.getTime();
        });

      setExpiringProducts(expiringSoon);
      setTrendingProducts(products.slice(0, 8));
    } catch (error) {
      console.log("Failed to load dashboard data:", error);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const token = getToken();
      if (token) {
        // Refresh data every time screen is focused
        loadData(expiringProducts.length === 0); 
      } else {
        setIsLoading(false);
      }
    }, [])
  );

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
