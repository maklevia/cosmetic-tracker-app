import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const ProfileButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      onPress={() => router.push("/profile")}
      className="w-10 h-10 rounded-full bg-brand-pink-100 items-center justify-center"
    >
      <Ionicons name="person" size={20} color="#831843" />
    </TouchableOpacity>
  );
};

export default ProfileButton;
