import React from "react";
import { useLocalSearchParams } from "expo-router";
import { AddReview } from "@/components/AddReview/AddReview";

export default function AddReviewScreen() {
  const { id } = useLocalSearchParams();

  return <AddReview id={id as string} />;
}
