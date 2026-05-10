import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { getUser, updateUserInStorage, clearAuth } from "@/utils/storage";
import userService from "@/api/services/userService";
import imageService from "@/api/services/imageService";
import { getFullImageUrl } from "@/api/apiClient";
import { ProfileUserData } from "../typedefs";

export const useProfileData = () => {
  const [userData, setUserData] = useState<ProfileUserData>({
    name: "",
    avatar: null,
  });
  const [initialName, setInitialName] = useState("");
  const [initialAvatar, setInitialAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (user) {
      const name = user.name || "";
      const avatarPath = user.avatar?.path || user.avatarUrl || null;
      const avatarUrl = getFullImageUrl(avatarPath);
      setUserData({ name, avatar: avatarUrl });
      setInitialName(name);
      setInitialAvatar(avatarUrl);
    }
  }, []);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Update Name if changed
      if (userData.name !== initialName) {
        const updatedUser = await userService.updateName(userData.name);
        await updateUserInStorage({ name: updatedUser.name });
        setInitialName(updatedUser.name);
      }

      // 2. Update Avatar if it has changed and is a local file
      const isLocalUri = userData.avatar && (
        userData.avatar.startsWith('file://') || 
        userData.avatar.startsWith('content://') ||
        userData.avatar.startsWith('ph://') ||
        !userData.avatar.startsWith('http')
      );

      if (isLocalUri && userData.avatar !== initialAvatar) {
        const uploadedImage = await imageService.upload(userData.avatar!, 'profile');
        const updatedUser = await userService.updateAvatar(uploadedImage.id);
        const newAvatarUrl = getFullImageUrl(updatedUser.avatar?.path);
        
        await updateUserInStorage({ 
          avatar: updatedUser.avatar, 
          avatarUrl: newAvatarUrl 
        });
        
        setUserData(prev => ({ ...prev, avatar: newAvatarUrl }));
        setInitialAvatar(newAvatarUrl);
      }

      Alert.alert("Success", "Profile updated successfully!");
    } catch (error: any) {
      console.log("Failed to update profile:", error);
      Alert.alert("Error", error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  }, [userData, initialName, initialAvatar]);

  const handleDeleteAccount = useCallback(() => {
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
              console.log("Failed to delete account:", error);
              Alert.alert("Error", "Failed to delete account. Please try again.");
            }
          } 
        },
      ]
    );
  }, [router]);

  return {
    userData,
    setUserData,
    isLoading,
    handleSave,
    handleDeleteAccount,
  };
};
