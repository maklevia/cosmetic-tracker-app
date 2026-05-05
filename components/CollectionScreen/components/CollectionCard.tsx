import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { CosmeticCard } from "../../MainScreen/typedefs";
import { useRouter } from "expo-router";

export const CollectionCard = ({ item }: { item: CosmeticCard }) => {
  const router = useRouter();

  const handleEditPress = (e: any) => {
    e.stopPropagation(); // Prevent opening details modal
    router.push({
      pathname: "/edit-product",
      params: { id: item.id }
    });
  };

  return (
    <View className="mb-4 bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-pink-100 flex-row">
      <Image
        source={{ uri: item.imageUrl }}
        contentFit="cover"
        style={{ width: 100, height: 100 }}
      />
      
      <View className="flex-1 p-3 justify-between">
        <View>
          <Text className="text-[10px] font-medium text-brand-pink-900/60 uppercase tracking-wider">
            {item.brand}
          </Text>
          <Text className="text-base font-bold text-brand-pink-900" numberOfLines={1}>
            {item.title}
          </Text>
          {item.expirationDate && (
            <Text className="text-xs text-brand-pink-900/60 mt-1">
              Exp: {item.expirationDate}
            </Text>
          )}
        </View>
        
        <Pressable 
          className="absolute top-2 right-2 p-1"
          onPress={handleEditPress}
        >
          <Ionicons name="create-outline" size={18} color="#831843" />
        </Pressable>
      </View>
    </View>
  );
};
