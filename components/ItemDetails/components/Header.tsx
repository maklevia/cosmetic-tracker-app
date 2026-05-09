import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ItemDetailsHeaderProps {
  isArchived?: boolean;
  isExpired?: boolean;
}

export const ItemDetailsHeader = ({ isArchived, isExpired }: ItemDetailsHeaderProps) => {
  const router = useRouter();
  
  return (
    <View className="flex-row justify-between items-center px-6 py-4 border-b border-brand-pink-100 bg-brand-pink-50">
      <View className="flex-row items-center flex-1">
        <Text className="text-brand-pink-900 font-bold text-lg" numberOfLines={1}>
          Product Details
        </Text>
        {isArchived && (
          <View className="bg-brand-pink-900 px-2 py-0.5 rounded-md ml-3">
            <Text className="text-white text-[10px] font-bold uppercase">Archived</Text>
          </View>
        )}
        {isExpired && !isArchived && (
          <View className="bg-rose-500 px-2 py-0.5 rounded-md ml-3">
            <Text className="text-white text-[10px] font-bold uppercase">Expired</Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={() => router.back()} className="p-1">
        <Ionicons name="close" size={28} color="#831843" />
      </TouchableOpacity>
    </View>
  );
};

export default ItemDetailsHeader;
