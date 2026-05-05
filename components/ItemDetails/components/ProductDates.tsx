import React from "react";
import { View, Text } from "react-native";

interface ProductDatesProps {
  openedDate?: string;
  expirationDate?: string;
}

export const ProductDates = ({ openedDate, expirationDate }: ProductDatesProps) => {
  return (
    <View className="mt-8 flex-row justify-between py-5 border-y border-brand-pink-100">
      <View>
        <Text className="text-xs text-brand-pink-900/60 font-medium">Opened on</Text>
        <Text className="text-base font-bold text-brand-pink-900 mt-1">
          {openedDate || "Not recorded"}
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-xs text-brand-pink-900/60 font-medium">Expiring on</Text>
        <Text className="text-base font-bold text-rose-500 mt-1">
          {expirationDate || "N/A"}
        </Text>
      </View>
    </View>
  );
};

export default ProductDates;
