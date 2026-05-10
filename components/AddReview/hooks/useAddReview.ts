import { useState, useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import reviewService from "@/api/services/reviewService";
import productService from "@/api/services/productService";
import { getUser } from "@/utils/storage";
import { AddReviewHookData, AddReviewProps } from "../typedefs";

export const useAddReview = ({ id, initialRating, initialText, reviewId }: AddReviewProps): AddReviewHookData => {
  const router = useRouter();
  const [rating, setRating] = useState(initialRating || 0);
  const [text, setText] = useState(initialText || "");
  const [isLoading, setIsLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(!!id);
  const [productTitle, setProductTitle] = useState("");
  const [internalReviewId, setInternalReviewId] = useState(reviewId);
  const [productId, setProductId] = useState<number | undefined>(undefined);

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      setProductLoading(true);
      const pid = parseInt(id);
      setProductId(pid);
      
      const [productData, reviews] = await Promise.all([
        productService.getById(pid),
        reviewService.getByProduct(pid)
      ]);

      setProductTitle(productData.title);
      
      const currentUser = getUser();
      if (currentUser) {
        const found = reviews.find(r => r.userId === currentUser.id);
        if (found) {
          setInternalReviewId(found.id);
          setRating(found.scoreReview);
          setText(found.textReview || "");
        }
      }
    } catch (error) {
      console.error("Failed to load review data:", error);
    } finally {
      setProductLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = useCallback(async () => {
    const finalProductId = productId || parseInt(id || "0");
    if (!finalProductId) {
        Alert.alert("Error", "Product information missing");
        return;
    }

    if (rating === 0 || !text.trim()) {
      Alert.alert("Required Fields", "Please provide both a star rating and a written review.");
      return;
    }

    setIsLoading(true);
    try {
      if (internalReviewId) {
        await reviewService.update(internalReviewId, { rating, comment: text });
      } else {
        await reviewService.create({ productId: finalProductId, rating, comment: text });
      }
      
      Alert.alert("Success", "Review saved successfully!");
      router.back();
    } catch (error) {
      console.error("Failed to save review:", error);
      Alert.alert("Error", "Failed to save review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [rating, text, id, productId, internalReviewId, router]);

  return {
    rating,
    setRating,
    text,
    setText,
    isLoading,
    productLoading,
    productTitle,
    handleSave
  };
};
