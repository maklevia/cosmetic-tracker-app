import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

interface AvatarEditorProps {
  image: string | null;
  onImageChange: (uri: string) => void;
}

export const AvatarEditor = ({ image, onImageChange }: AvatarEditorProps) => {
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
    <View className="items-center mt-8">
      <View style={styles.outerContainer}>
        <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.avatarContainer}>
          {image ? (
            <Image
              source={{ uri: image }}
              contentFit="cover"
              style={styles.image}
            />
          ) : (
            <View style={styles.placeholder} className="bg-brand-pink-100">
              <Ionicons name="person" size={60} color="#83184330" />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={pickImage}
          activeOpacity={0.9}
          style={styles.editButton} 
          className="bg-brand-pink-900 border-2 border-white shadow-sm"
        >
          <Ionicons name="camera" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: 140,
    height: 140,
    position: "relative",
  },
  avatarContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FCE7F3", // brand-pink-100
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
});
