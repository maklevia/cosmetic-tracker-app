import { useState, useCallback, useRef, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import collectionService, { CollectionItem } from "@/api/services/collectionService";
import productService, { Product } from "@/api/services/productService";
import { getToken } from "@/utils/storage";
import { getExpirationDateObject } from "@/utils/date";

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
      
      console.log("Fetching dashboard and trending data...");

      // Fetch separately to avoid one failing the other
      let dashboardItems: CollectionItem[] = [];
      let trending: Product[] = [];

      try {
        const dashResp = await collectionService.getDashboard();
        console.log("Dashboard Response:", dashResp);
        dashboardItems = dashResp.soonToExpire || [];
      } catch (e) {
        console.error("Dashboard fetch failed:", e);
      }

      try {
        trending = await productService.getTrending(5);
        console.log("Trending Response:", trending);
      } catch (e) {
        console.error("Trending fetch failed:", e);
      }
      
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      
      const oneMonthFromNow = new Date(now);
      oneMonthFromNow.setMonth(now.getMonth() + 1);

      const expiringSoon = dashboardItems
        .filter((item: CollectionItem) => {
          if (item.itemStatus === 'archived') return false;
          const expires = getExpirationDateObject(item.openedDate, item.pao);
          if (!expires) return false;
          
          // Show items that have already expired OR are expiring in the next month
          return expires <= oneMonthFromNow;
        })
        .sort((a: CollectionItem, b: CollectionItem) => {
          const expA = getExpirationDateObject(a.openedDate, a.pao);
          const expB = getExpirationDateObject(b.openedDate, b.pao);
          
          if (!expA) return 1;
          if (!expB) return -1;
          
          return expA.getTime() - expB.getTime();
        });

      console.log("Filtered Expiring Soon:", expiringSoon.length);
      setExpiringProducts(expiringSoon);
      setTrendingProducts(trending);
      hasInitialLoaded.current = true;
    } catch (error) {
      console.error("Critical error in useMainScreenData:", error);
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
