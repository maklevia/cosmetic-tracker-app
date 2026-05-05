import React from "react";
import { View, Text } from "react-native";

interface ProductDescriptionProps {
  description?: string;
}

export const ProductDescription = ({ description }: ProductDescriptionProps) => {
  if (!description) return null;

  return (
    <View className="mt-8">
      <Text className="text-lg font-bold text-brand-pink-900 mb-3">
        Description
      </Text>
      <View className="bg-white p-4 rounded-2xl border border-brand-pink-100 shadow-sm">
        <Text className="text-brand-pink-900/70 text-base leading-6">
          {description}
        </Text>
      </View>
    </View>
  );
};

export default ProductDescription;
