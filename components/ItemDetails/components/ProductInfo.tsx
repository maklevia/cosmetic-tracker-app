import React from "react";
import { View, Text } from "react-native";

interface ProductInfoProps {
  brand?: string;
  title: string;
}

export const ProductInfo = ({ brand, title }: ProductInfoProps) => {
  return (
    <View className="mt-6">
      <Text className="text-xs font-semibold text-brand-pink-900/50 uppercase tracking-widest">
        {brand}
      </Text>
      <Text className="text-2xl font-bold text-brand-pink-900 mt-1">
        {title}
      </Text>
    </View>
  );
};

export default ProductInfo;
