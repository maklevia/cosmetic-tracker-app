import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

interface DoneButtonProps {
  onPress: () => void;
}

export const DoneButton = ({ onPress }: DoneButtonProps) => {
  return (
    <View className="px-6 mt-12 mb-10">
      <TouchableOpacity 
        onPress={onPress}
        className="bg-brand-pink-900 py-4 rounded-2xl items-center shadow-md shadow-brand-pink-900/20"
      >
        <Text className="text-white font-bold text-lg">Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoneButton;
