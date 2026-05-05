import React from "react";
import { ScrollView, View } from "react-native";
import GlobalHeader from "../GlobalHeader/GlobalHeader";
import ExpiredDashboard from "./components/ExpiredDashboard/ExpiredDashboard";
import TrendingDashboard from "./components/TrendingDashboard/TrendingDashboard";
import { CosmeticCard } from "./typedefs";
import { useRouter } from "expo-router";

export const MainScreen = () => {
  const router = useRouter();

  const handleProductPress = (product: CosmeticCard) => {
    router.push({
      pathname: "/product-details",
      params: { id: product.id }
    });
  };

  return (
    <View className="flex-1 bg-brand-pink-50">
      <GlobalHeader />
      
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
      >
        <ExpiredDashboard onProductPress={handleProductPress} />
        
        <TrendingDashboard />
      </ScrollView>
    </View>
  );
};

export default MainScreen;
