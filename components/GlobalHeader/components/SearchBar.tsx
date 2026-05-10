import React from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, Pressable, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { getFullImageUrl } from "@/api/apiClient";
import { useSearchBar } from "../hooks/useSearchBar";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export const SearchBar = () => {
  const {
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
  } = useSearchBar();

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
            {isLoading && (
              <View className="p-4 items-center bg-white border-b border-brand-pink-50">
                <ActivityIndicator size="small" color="#831843" />
              </View>
            )}
            <FlatList
              data={results}
              keyExtractor={(item) => item.id.toString()}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const product = item.product;
                const imageUrl = getFullImageUrl(product.image?.url);
                
                return (
                  <TouchableOpacity 
                    onPress={() => handleSelect(item)}
                    className="flex-row items-center p-4 border-b border-brand-pink-50"
                  >
                    <Image
                      source={{ uri: imageUrl || "" }}
                      contentFit="cover"
                      style={{ width: 40, height: 40 }}
                      className="rounded-lg"
                    />
                    <View className="ml-4 flex-1">
                      <View className="flex-row items-center">
                        <Text className="text-brand-pink-900 font-bold text-sm" numberOfLines={1}>
                          {product.title}
                        </Text>
                        {item.itemStatus === 'archived' && (
                          <View className="bg-brand-pink-100 px-1.5 py-0.5 rounded ml-2">
                            <Text className="text-[7px] font-bold text-brand-pink-900 uppercase">Archived</Text>
                          </View>
                        )}
                      </View>
                      <Text className="text-brand-pink-900/50 text-[10px]">
                        {product.brand}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={14} color="#83184320" />
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                !isLoading ? (
                  <View className="p-8 items-center bg-white">
                    <Text className="text-brand-pink-900/40 text-sm">No results found</Text>
                  </View>
                ) : null
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
