import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const ChangePasswordHeader = () => {
  const router = useRouter();
  
  return (
    <View className="flex-row justify-between items-center px-6 py-4 border-b border-brand-pink-100 bg-brand-pink-50">
      <TouchableOpacity onPress={() => router.back()} className="p-1">
        <Ionicons name="close" size={28} color="#831843" />
      </TouchableOpacity>
      <Text className="text-brand-pink-900 font-bold text-lg">
        Change Password
      </Text>
      <View className="w-8" />
    </View>
  );
};

export default ChangePasswordHeader;
