import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Header from "./components/Header";
import StarRatingPicker from "./components/StarRatingPicker";
import ReviewInput from "./components/ReviewInput";
import SaveButton from "./components/SaveButton";
import reviewService from "@/api/services/reviewService";

interface AddReviewProps {
  initialRating: number;
  initialText: string;
  productId: number;
  reviewId?: number;
}

export const AddReview = ({ initialRating, initialText, productId, reviewId }: AddReviewProps) => {
  const router = useRouter();
  const [rating, setRating] = useState(initialRating);
  const [text, setText] = useState(initialText);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (rating === 0 || !text.trim()) {
      Alert.alert("Required Fields", "Please provide both a star rating and a written review.");
      return;
    }

    setIsLoading(true);
    try {
      if (reviewId) {
        // Update existing review
        await reviewService.update(reviewId, { rating, comment: text });
      } else {
        // Create new review
        await reviewService.create({ productId, rating, comment: text });
      }
      
      Alert.alert("Success", "Review saved successfully!");
      router.back();
    } catch (error) {
      console.error("Failed to save review:", error);
      Alert.alert("Error", "Failed to save review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-brand-pink-50"
    >
      <Header />
      
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <StarRatingPicker 
          rating={rating} 
          onRatingChange={setRating} 
        />
        
        <ReviewInput 
          value={text} 
          onChangeText={setText} 
        />

        <View className="px-6 mb-10">
          <SaveButton onPress={handleSave} isLoading={isLoading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddReview;
