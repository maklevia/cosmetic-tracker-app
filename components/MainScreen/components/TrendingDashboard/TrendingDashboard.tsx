import React from "react";
import { FlatList, View } from "react-native";
import { Heading } from "@/components/ui/heading";
import { DASHBOARD_DATA } from "../../constants";
import { TrendingCard, CARD_WIDTH } from "./components/TrendingCard";

const SPACING = 16;

export default function TrendingDashboard() {
  return (
    <View className="mb-8">
      <Heading size="xl" className="mb-4 px-4 text-brand-pink-900">
        Trending among our users
      </Heading>


      <FlatList
        data={DASHBOARD_DATA} // Reusing mock data for demonstration
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 12} // 12 is mr-3
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        renderItem={({ item }) => <TrendingCard item={item} />}
      />
    </View>
  );
}
