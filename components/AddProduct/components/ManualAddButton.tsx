import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ManualAddButtonProps {
  onPress: () => void;
}

export const ManualAddButton = ({ onPress }: ManualAddButtonProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-brand-pink-900/10 border border-brand-pink-900/20 m-6 p-5 rounded-2xl flex-row items-center justify-between"
    >
      <View className="flex-row items-center">
        <View className="bg-brand-pink-900 w-10 h-10 rounded-full items-center justify-center">
          <Ionicons name="add" size={24} color="white" />
        </View>
        <View className="ml-4">
          <Text className="text-brand-pink-900 font-bold text-lg">Add manually</Text>
          <Text className="text-brand-pink-900/50 text-xs">Can`t find your product? Add it here.</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#83184340" />
    </TouchableOpacity>
  );
};
