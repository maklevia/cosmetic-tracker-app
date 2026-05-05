import React, { useState, useRef, useCallback, useMemo } from "react";
import { View, FlatList, useWindowDimensions } from "react-native";
import { DASHBOARD_DATA, ARCHIVE_DATA } from "../MainScreen/constants";
import { useRouter } from "expo-router";
import { CosmeticCard } from "../MainScreen/typedefs";
import { CollectionTabHeader } from "./components/CollectionTabHeader";
import { CollectionTabs } from "./components/CollectionTabs";
import GlobalHeader from "../GlobalHeader/GlobalHeader";

export const CollectionScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const tabs = useMemo(() => [
    { id: 0, title: "My products", count: DASHBOARD_DATA.length, data: DASHBOARD_DATA },
    { id: 1, title: "Archived", count: ARCHIVE_DATA.length, data: ARCHIVE_DATA }
  ], []);

  const handleProductPress = useCallback((product: CosmeticCard) => {
    router.push({
      pathname: "/product-details",
      params: { id: product.id }
    });
  }, [router]);

  const handleTabPress = useCallback((index: number) => {
    setActiveTab(index);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  }, []);

  const onMomentumScrollEnd = useCallback((event: any) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    if (width > 0) {
      const index = Math.round(scrollOffset / width);
      if (index !== activeTab) {
        setActiveTab(index);
      }
    }
  }, [width, activeTab]);

  const getItemLayout = useCallback((_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  }), [width]);

  return (
    <View className="flex-1 bg-brand-pink-50">
      <GlobalHeader />
      
      <CollectionTabHeader 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabPress={handleTabPress} 
      />
      
      <CollectionTabs 
        tabs={tabs}
        flatListRef={flatListRef}
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={getItemLayout}
        onProductPress={handleProductPress}
      />
    </View>
  );
};

export default CollectionScreen;
