import React, { useState, useMemo, useRef } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, Pressable, Keyboard, StyleSheet, Dimensions, LayoutChangeEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ALL_PRODUCTS } from "../../MainScreen/constants";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [xOffset, setXOffset] = useState(0); 
  const router = useRouter();
  const searchInputRef = useRef<View>(null);

  const results = useMemo(() => {
    if (!query) return [];
    const filtered = ALL_PRODUCTS.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.brand?.toLowerCase().includes(query.toLowerCase())
    );
    
    return [...filtered].sort((a, b) => {
      if (a.isArchived && !b.isArchived) return 1;
      if (!a.isArchived && b.isArchived) return -1;
      return 0;
    });
  }, [query]);

  const handleSelect = (id: string) => {
    handleDismiss();
    router.push({
      pathname: "/product-details",
      params: { id }
    });
  };

  const handleDismiss = () => {
    setIsActive(false);
    setQuery("");
    Keyboard.dismiss();
  };

  const onLayout = (event: LayoutChangeEvent) => {
    searchInputRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setXOffset(pageX);
    });
  };

  // Only show overlay when there is an active search query
  const showOverlay = isActive && query.length > 0;

  return (
    <View 
      className="flex-1 ml-4 z-50" 
      ref={searchInputRef}
      onLayout={onLayout}
    >
      {/* Search Input Container */}
      <View className="bg-white border border-brand-pink-100 rounded-2xl flex-row items-center px-4 h-10 z-[60]">
        <Ionicons name="search" size={18} color="#83184360" />
        <TextInput
          placeholder="Search collection..."
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            if (text.length > 0) setIsActive(true);
            else setIsActive(false);
          }}
          onFocus={() => {
            if (query.length > 0) setIsActive(true);
          }}
          placeholderTextColor="#83184340"
          className="flex-1 ml-2 text-brand-pink-900 font-medium h-full"
        />
        {(isActive || query !== "") && (
          <TouchableOpacity onPress={handleDismiss}>
            <Ionicons name="close-circle" size={18} color="#83184340" />
          </TouchableOpacity>
        )}
      </View>

      {/* Global Overlay & Dropdown Container */}
      {showOverlay && (
        <View 
            style={[
                styles.fullscreenContainer, 
                { 
                    left: -xOffset,
                    width: SCREEN_WIDTH 
                }
            ]}
        >
          <Pressable 
            style={styles.backdrop} 
            onPress={handleDismiss}
          />

          <View 
            style={[
                styles.dropdownList, 
                { 
                    width: SCREEN_WIDTH - 32,
                    marginLeft: 16
                }
            ]} 
            className="bg-white border-x border-b border-brand-pink-100 rounded-b-2xl shadow-2xl overflow-hidden"
          >
            <FlatList
              data={results}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => handleSelect(item.id)}
                  className="flex-row items-center p-4 border-b border-brand-pink-50"
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    contentFit="cover"
                    style={{ width: 40, height: 40 }}
                    className="rounded-lg"
                  />
                  <View className="ml-4 flex-1">
                    <View className="flex-row items-center">
                      <Text className="text-brand-pink-900 font-bold text-sm" numberOfLines={1}>
                        {item.title}
                      </Text>
                      {item.isArchived && (
                        <View className="bg-brand-pink-100 px-1.5 py-0.5 rounded ml-2">
                          <Text className="text-[7px] font-bold text-brand-pink-900 uppercase">Archived</Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-brand-pink-900/50 text-[10px]">
                      {item.brand}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={14} color="#83184320" />
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View className="p-8 items-center bg-white">
                  <Text className="text-brand-pink-900/40 text-sm">No results found</Text>
                </View>
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreenContainer: {
    position: "absolute",
    top: 40,
    height: SCREEN_HEIGHT,
    zIndex: 55,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  dropdownList: {
    maxHeight: 450,
    marginTop: 0,
    borderTopWidth: 0,
    elevation: 25,
  }
});

export default SearchBar;
