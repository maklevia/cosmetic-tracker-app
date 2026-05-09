import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AddReview from "@/components/AddReview/AddReview";
import productService, { Product } from "@/api/services/productService";
import reviewService, { Review } from "@/api/services/reviewService";
import { getUser } from "@/utils/storage";

export default function AddReviewScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const productId = parseInt(id as string);
      const [productData, reviews] = await Promise.all([
        productService.getById(productId),
        reviewService.getByProduct(productId)
      ]);

      setProduct(productData);
      
      const currentUser = getUser();
      if (currentUser) {
        const found = reviews.find(r => r.userId === currentUser.id);
        setUserReview(found || null);
      }
    } catch (error) {
      console.error("Failed to load review data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-brand-pink-50 items-center justify-center">
        <ActivityIndicator size="large" color="#831843" />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 bg-brand-pink-50 items-center justify-center">
        <Text className="text-brand-pink-900">Product not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-brand-pink-900 font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <AddReview 
      productId={product.id}
      initialRating={userReview?.scoreReview || 0}
      initialText={userReview?.textReview || ""}
      reviewId={userReview?.id}
    />
  );
}
