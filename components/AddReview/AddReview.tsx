import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { AddReviewHeader } from "./components/Header";
import { StarRatingPicker } from "./components/StarRatingPicker";
import { ReviewInput } from "./components/ReviewInput";
import { SaveButton } from "./components/SaveButton";
import { useAddReview } from "./hooks/useAddReview";
import { AddReviewProps } from "./typedefs";

export const AddReview = (props: AddReviewProps) => {
  const {
    rating,
    setRating,
    text,
    setText,
    isLoading,
    productLoading,
    handleSave
  } = useAddReview(props);

  if (productLoading) {
    return (
      <View className="flex-1 bg-brand-pink-50 items-center justify-center">
        <ActivityIndicator size="large" color="#831843" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-brand-pink-50"
    >
      <AddReviewHeader />
      
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
