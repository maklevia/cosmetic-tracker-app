import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Review {
  stars: number;
  text: string;
  userName?: string;
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
          size={18}
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
        <View className="mt-4 bg-white p-5 rounded-3xl border border-brand-pink-100 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <StarRating rating={review.stars} />
            {review.userName && (
              <Text className="text-brand-pink-900/40 text-xs font-medium uppercase tracking-widest">
                {review.userName}
              </Text>
            )}
          </View>
          <Text className="text-brand-pink-900/80 text-base leading-6 italic">
            "{review.text}"
          </Text>
        </View>
      ) : (
        <View className="mt-4 bg-brand-pink-100/10 p-5 rounded-3xl border border-dashed border-brand-pink-100 items-center">
          <Text className="text-brand-pink-900/40 text-sm text-center">
            No review yet. Add one to remember your experience!
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductReview;
