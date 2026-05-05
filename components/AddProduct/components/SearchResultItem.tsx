import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

interface SearchResultItemProps {
  item: {
    id: string;
    title: string;
    brand: string;
    imageUrl: string;
  };
  onPress: () => void;
}

export const SearchResultItem = ({ item, onPress }: SearchResultItemProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white border-b border-brand-pink-100 flex-row items-center p-4"
    >
      <Image
        source={{ uri: item.imageUrl }}
        contentFit="cover"
        style={{ width: 50, height: 50 }}
        className="rounded-xl"
      />
      <View className="ml-4 flex-1">
        <Text className="text-[10px] font-bold text-brand-pink-900/50 uppercase tracking-widest">
          {item.brand}
        </Text>
        <Text className="text-brand-pink-900 font-bold" numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultItem;
