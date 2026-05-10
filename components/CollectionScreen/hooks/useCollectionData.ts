import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import collectionService, { CollectionItem } from "@/api/services/collectionService";
import { getToken } from "@/utils/storage";
import { CollectionHookData } from "../typedefs";

export const useCollectionData = (): CollectionHookData => {
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();
  const flatListRef = useRef<any>(null);
  const router = useRouter();

  const loadCollection = useCallback(async (showLoading = true) => {
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
  }, []);

  useEffect(() => {
    const token = getToken();
    if (token) {
      loadCollection();
    } else {
      setIsLoading(false);
    }
  }, [loadCollection]);

  useFocusEffect(
    useCallback(() => {
      const token = getToken();
      if (token) {
        loadCollection(false); 
      }
    }, [loadCollection])
  );

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

  return {
    items,
    isLoading,
    activeTab,
    setActiveTab,
    width,
    flatListRef,
    tabs,
    handleProductPress,
    handleTabPress,
    onMomentumScrollEnd,
    getItemLayout
  };
};
