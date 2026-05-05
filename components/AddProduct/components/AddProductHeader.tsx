import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface SearchHeaderProps {
  onBack?: () => void;
  title: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
}

export const AddProductHeader = ({ onBack, title, showSearch, searchValue, onSearchChange }: SearchHeaderProps) => {
  const router = useRouter();

  return (
    <View className="bg-brand-pink-50 border-b border-brand-pink-100 pb-4">
      <View className="flex-row justify-between items-center px-6 py-4">
        <TouchableOpacity onPress={onBack || (() => router.back())} className="p-1">
          <Ionicons name={onBack ? "chevron-back" : "close"} size={28} color="#831843" />
        </TouchableOpacity>
        <Text className="text-brand-pink-900 font-bold text-lg">
          {title}
        </Text>
        <View className="w-8" />
      </View>

      {showSearch && (
        <View className="px-6">
          <View className="bg-white border border-brand-pink-100 rounded-2xl flex-row items-center px-4 py-2">
            <Ionicons name="search" size={20} color="#83184360" />
            <TextInput
              placeholder="Search for a product..."
              value={searchValue}
              onChangeText={onSearchChange}
              placeholderTextColor="#83184340"
              className="flex-1 ml-3 h-10 text-brand-pink-900 font-medium"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AddProductHeader;
