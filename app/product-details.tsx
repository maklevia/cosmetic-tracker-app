import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ItemDetails } from "@/components/ItemDetails/ItemDetails";

export default function ProductDetailsScreen() {
  const { id, collectionItemId } = useLocalSearchParams();

  return (
    <ItemDetails 
      id={id as string} 
      collectionItemId={collectionItemId as string} 
    />
  );
}
