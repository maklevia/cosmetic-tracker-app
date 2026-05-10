import React from "react";
import { useLocalSearchParams } from "expo-router";
import { EditProduct } from "@/components/EditProduct/EditProduct";

export default function EditProductScreen() {
  const { id, collectionItemId } = useLocalSearchParams();

  return (
    <EditProduct 
      id={id as string} 
      collectionItemId={collectionItemId as string} 
    />
  );
}
