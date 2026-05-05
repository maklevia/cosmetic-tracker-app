import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";

interface ProductImageProps {
  imageUrl: string;
}

export const ProductImage = ({ imageUrl }: ProductImageProps) => {
  return (
    <View className="mt-6">
      <Image
        source={{ uri: imageUrl }}
        contentFit="cover"
        style={styles.image}
        className="rounded-3xl"
      />
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
