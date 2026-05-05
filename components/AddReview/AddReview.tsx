import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import Header from "./components/Header";
import StarRatingPicker from "./components/StarRatingPicker";
import ReviewInput from "./components/ReviewInput";
import SaveButton from "./components/SaveButton";

interface AddReviewProps {
  initialRating: number;
  initialText: string;
  productId: string;
}

export const AddReview = ({ initialRating, initialText, productId }: AddReviewProps) => {
  const router = useRouter();
  const [rating, setRating] = useState(initialRating);
  const [text, setText] = useState(initialText);

  const handleSave = () => {
    console.log(`Saving review for product ${productId}:`, { rating, text });
    // In a real app, update state/database here
    router.back();
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

        <SaveButton onPress={handleSave} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddReview;
