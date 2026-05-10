import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

interface ProductImageProps {
  imageUrl: string;
}

export const ProductImage = ({ imageUrl }: ProductImageProps) => {
  const isPlaceholder = !imageUrl || imageUrl.includes('placeholder.com');

  return (
    <View className="mt-6 bg-white rounded-3xl overflow-hidden shadow-sm border border-brand-pink-100">
      {!isPlaceholder ? (
        <Image
          source={{ uri: imageUrl }}
          contentFit="contain"
          style={styles.image}
          className="bg-white"
        />
      ) : (
        <View style={styles.image} className="bg-brand-pink-100/10 items-center justify-center">
          <Ionicons name="camera-outline" size={80} color="#83184320" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
});

export default ProductImage;
