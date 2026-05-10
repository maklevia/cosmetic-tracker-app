import React from "react";
import { View, Text, TextInput } from "react-native";

interface ReviewInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const ReviewInput = ({ value, onChangeText }: ReviewInputProps) => {
  return (
    <View className="mt-8 px-6">
      <Text className="text-xs font-bold text-brand-pink-900/60 uppercase tracking-widest mb-3">
        Your Experience
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="How do you feel about this product?"
        placeholderTextColor="#83184340"
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        className="bg-white border border-brand-pink-100 rounded-2xl px-4 py-4 text-brand-pink-900 font-medium min-h-[150px]"
      />
    </View>
  );
};
