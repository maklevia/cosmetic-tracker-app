import React from "react";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";

interface SaveButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

export const SaveButton = ({ onPress, isLoading }: SaveButtonProps) => {
  return (
    <View className="px-6 mt-12 mb-10">
      <TouchableOpacity 
        onPress={onPress}
        disabled={isLoading}
        className={`bg-brand-pink-900 py-4 rounded-2xl items-center shadow-md shadow-brand-pink-900/20 ${isLoading ? 'opacity-70' : ''}`}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">Save Review</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SaveButton;
