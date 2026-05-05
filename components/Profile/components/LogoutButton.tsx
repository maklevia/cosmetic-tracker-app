import React from "react";
import { TouchableOpacity, Text, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: () => router.replace("/login") },
      ]
    );
  };

  return (
    <View className="px-6 mt-12 mb-10">
      <TouchableOpacity 
        onPress={handleLogout}
        className="bg-white border border-red-100 py-4 rounded-2xl items-center flex-row justify-center shadow-sm"
      >
        <Ionicons name="log-out-outline" size={20} color="#ef4444" style={{ marginRight: 8 }} />
        <Text className="text-red-500 font-bold text-lg">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutButton;
