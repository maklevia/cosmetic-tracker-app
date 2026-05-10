import { useState, useEffect, useRef, useCallback } from "react";
import { Keyboard, LayoutChangeEvent } from "react-native";
import { useRouter } from "expo-router";
import collectionService, { CollectionItem } from "@/api/services/collectionService";
import { SearchBarHookData } from "../typedefs";

export const useSearchBar = (): SearchBarHookData => {
  const [query, setQuery] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState<CollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [xOffset, setXOffset] = useState(0); 
  const router = useRouter();
  const searchInputRef = useRef<any>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    try {
      setIsLoading(true);
      const data = await collectionService.search(searchQuery);
      setResults(data);
    } catch (error) {
      console.error("Collection search failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 1) {
        performSearch(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const handleDismiss = useCallback(() => {
    setIsActive(false);
    setQuery("");
    Keyboard.dismiss();
  }, []);

  const handleSelect = useCallback((item: CollectionItem) => {
    handleDismiss();
    router.push({
      pathname: "/product-details",
      params: { id: item.productId, collectionItemId: item.id }
    });
  }, [router, handleDismiss]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    searchInputRef.current?.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        setXOffset(pageX);
    });
  }, []);

  const showOverlay = isActive && query.length > 0;

  return {
    query,
    setQuery,
    isActive,
    setIsActive,
    results,
    isLoading,
    xOffset,
    searchInputRef,
    handleSelect,
    handleDismiss,
    onLayout,
    showOverlay
  };
};
