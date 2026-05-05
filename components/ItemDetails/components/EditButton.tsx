import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EditButtonProps {
  onPress: () => void;
}

export const EditButton = ({ onPress }: EditButtonProps) => {
  return (
    <TouchableOpacity 
      className="bg-brand-pink-900 py-4 rounded-2xl items-center flex-row justify-center mb-4"
      onPress={onPress}
    >
      <Ionicons name="create-outline" size={20} color="white" style={{ marginRight: 8 }} />
      <Text className="text-white font-bold text-lg">Edit Product</Text>
    </TouchableOpacity>
  );
};

export default EditButton;
