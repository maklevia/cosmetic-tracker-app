import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

interface PhotoEditorProps {
  image: string | null;
  onImageChange: (uri: string) => void;
}

export const PhotoEditor = ({ image, onImageChange }: PhotoEditorProps) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onImageChange(result.assets[0].uri);
    }
  };

  return (
    <View className="items-center mt-6">
      <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.container}>
        {image ? (
          <Image
            source={{ uri: image }}
            contentFit="contain"
            style={styles.image}
            className="rounded-3xl bg-white"
          />
        ) : (
          <View style={styles.image} className="bg-brand-pink-100/10 rounded-3xl items-center justify-center border border-brand-pink-100/20" />
        )}
        <View style={styles.overlay} className="rounded-3xl">
          <Ionicons name="camera" size={32} color="white" />
          <Text className="text-white font-bold mt-2">
            {image ? "Change Photo" : "Add Photo"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
