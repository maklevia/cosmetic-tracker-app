import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Review {
  stars: number;
  text: string;
}

interface ProductReviewProps {
  review?: Review;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <View className="flex-row">
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? "star" : star - 0.5 <= rating ? "star-half" : "star-outline"}
          size={20}
          color="#831843"
        />
      ))}
    </View>
  );
};

export const ProductReview = ({ review }: ProductReviewProps) => {
  return (
    <View className="mt-8">
      <Text className="text-lg font-bold text-brand-pink-900">Your Review</Text>
      {review ? (
        <View className="mt-4 bg-white p-5 rounded-2xl border border-brand-pink-100 shadow-sm">
          <StarRating rating={review.stars} />
          <Text className="text-brand-pink-900/80 mt-4 text-base leading-6">
            "{review.text}"
          </Text>
        </View>
      ) : (
        <Text className="text-brand-pink-900/40 mt-3 text-base italic">
          No review yet. Add one to remember your experience!
        </Text>
      )}
    </View>
  );
};

export default ProductReview;
