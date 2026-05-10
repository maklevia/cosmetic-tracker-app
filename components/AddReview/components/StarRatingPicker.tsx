import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StarRatingPickerProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export const StarRatingPicker = ({ rating, onRatingChange }: StarRatingPickerProps) => {
  return (
    <View className="mt-8 px-6 items-center">
      <Text className="text-xs font-bold text-brand-pink-900/60 uppercase tracking-widest mb-4">
        Your Rating
      </Text>
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onRatingChange(star)}
            className="mx-2"
          >
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={44}
              color="#831843"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
