import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import userService from "@/api/services/userService";
import { getUser, clearAuth } from "@/utils/storage";

export const ProfileSettings = () => {
  const router = useRouter();

  const handleDeleteAccount = () => {
    const user = getUser();
    if (!user) return;

    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? All your data will be permanently removed. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete Account", 
          style: "destructive", 
          onPress: async () => {
            try {
              await userService.deleteAccount(user.id);
              await clearAuth();
              router.replace("/login");
              Alert.alert("Account Deleted", "Your account has been successfully removed.");
            } catch (error) {
              console.error("Failed to delete account:", error);
              Alert.alert("Error", "Failed to delete account. Please try again.");
            }
          } 
        },
      ]
    );
  };

  return (
    <View className="mt-10 px-6">
      <Text className="text-xs font-bold text-brand-pink-900/60 uppercase tracking-widest mb-4">
        Settings
      </Text>
      
      {/* Theme Toggle Placeholder */}
      <TouchableOpacity 
        className="bg-white border border-brand-pink-100 p-4 rounded-2xl flex-row items-center justify-between mb-4"
        onPress={() => console.log("Theme toggle - Not implemented")}
      >
        <View className="flex-row items-center">
          <Ionicons name="moon-outline" size={20} color="#831843" />
          <Text className="text-brand-pink-900 font-bold ml-3">Appearance</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-brand-pink-900/40 text-sm mr-2">Light</Text>
          <Ionicons name="chevron-forward" size={18} color="#83184320" />
        </View>
      </TouchableOpacity>

      {/* Language Selector Placeholder */}
      <TouchableOpacity 
        className="bg-white border border-brand-pink-100 p-4 rounded-2xl flex-row items-center justify-between mb-4"
        onPress={() => console.log("Language selector - Not implemented")}
      >
        <View className="flex-row items-center">
          <Ionicons name="globe-outline" size={20} color="#831843" />
          <Text className="text-brand-pink-900 font-bold ml-3">Language</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-brand-pink-900/40 text-sm mr-2">English</Text>
          <Ionicons name="chevron-forward" size={18} color="#83184320" />
        </View>
      </TouchableOpacity>

      {/* Change Password */}
      <TouchableOpacity 
        className="bg-white border border-brand-pink-100 p-4 rounded-2xl flex-row items-center justify-between mb-4"
        onPress={() => router.push("/change-password")}
      >
        <View className="flex-row items-center">
          <Ionicons name="lock-closed-outline" size={20} color="#831843" />
          <Text className="text-brand-pink-900 font-bold ml-3">Change Password</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#83184320" />
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity 
        className="bg-white border border-red-100 p-4 rounded-2xl flex-row items-center justify-between"
        onPress={handleDeleteAccount}
      >
        <View className="flex-row items-center">
          <Ionicons name="person-remove-outline" size={20} color="#ef4444" />
          <Text className="text-red-500 font-bold ml-3">Delete Account</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#ef444420" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileSettings;
