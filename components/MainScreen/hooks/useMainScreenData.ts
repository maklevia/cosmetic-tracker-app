import { useState, useCallback, useRef, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import collectionService, { CollectionItem } from "@/api/services/collectionService";
import productService, { Product } from "@/api/services/productService";
import { getToken } from "@/utils/storage";

export const useMainScreenData = () => {
  const [expiringProducts, setExpiringProducts] = useState<CollectionItem[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFetching = useRef(false);

  const hasInitialLoaded = useRef(false);

  const loadData = useCallback(async (showLoading = true) => {
    if (isFetching.current) return;
    
    try {
      isFetching.current = true;
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
      hasInitialLoaded.current = true;
    } catch (error) {
      console.log("useMainScreenData Error:", error);
    } finally {
      setIsLoading(false);
      isFetching.current = false;
    }
  }, []);

  // Use focus effect to handle both initial and background refreshes
  useFocusEffect(
    useCallback(() => {
      const token = getToken();
      if (token) {
        // Show loading spinner only if we haven't loaded anything yet
        loadData(!hasInitialLoaded.current); 
      } else {
        setIsLoading(false);
      }
    }, [loadData])
  );

  return {
    expiringProducts,
    trendingProducts,
    isLoading,
    loadData
  };
};
