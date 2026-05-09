import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { View, FlatList, useWindowDimensions, ActivityIndicator } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { CollectionTabHeader } from "./components/CollectionTabHeader";
import { CollectionTabs } from "./components/CollectionTabs";
import GlobalHeader from "../GlobalHeader/GlobalHeader";
import collectionService, { CollectionItem } from "@/api/services/collectionService";
import { getToken } from "@/utils/storage";

export const CollectionScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      loadCollection();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Use a listener to refresh data without resetting tab state unnecessarily
  useFocusEffect(
    useCallback(() => {
      const token = getToken();
      if (token) {
        // Just refresh the data in the background
        loadCollection(false); 
      }
    }, [])
  );

  const loadCollection = async (showLoading = true) => {
    try {
      if (showLoading) setIsLoading(true);
      const [activeData, archivedData] = await Promise.all([
        collectionService.getByUser('active'),
        collectionService.getByUser('archived')
      ]);
      setItems([...activeData, ...archivedData]);
    } catch (error) {
      console.error("Failed to load collection:", error);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  const tabs = useMemo(() => {
    const activeItems = items.filter(item => item.itemStatus !== 'archived');
    const archivedItems = items.filter(item => item.itemStatus === 'archived');
    
    return [
      { id: 0, title: "My products", count: activeItems.length, data: activeItems },
      { id: 1, title: "Archived", count: archivedItems.length, data: archivedItems }
    ];
  }, [items]);

  const handleProductPress = useCallback((item: CollectionItem) => {
    router.push({
      pathname: "/product-details",
      params: { id: item.productId, collectionItemId: item.id }
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
      
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#831843" />
        </View>
      ) : (
        <CollectionTabs 
          tabs={tabs}
          flatListRef={flatListRef}
          onMomentumScrollEnd={onMomentumScrollEnd}
          getItemLayout={getItemLayout}
          onProductPress={handleProductPress}
        />
      )}
    </View>
  );
};

export default CollectionScreen;
