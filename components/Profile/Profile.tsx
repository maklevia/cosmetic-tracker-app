import React, { useState, useEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import ProfileHeader from "./components/ProfileHeader";
import AvatarEditor from "./components/AvatarEditor";
import InputField from "../EditProduct/components/InputField";
import ProfileSettings from "./components/ProfileSettings";
import LogoutButton from "./components/LogoutButton";
import { getUser, updateUserInStorage } from "@/utils/storage";
import userService from "@/api/services/userService";
import imageService from "@/api/services/imageService";
import { getFullImageUrl } from "@/api/apiClient";

export const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    avatar: null as string | null,
  });
  const [initialName, setInitialName] = useState("");
  const [initialAvatar, setInitialAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // 1. Update Name if changed
      if (userData.name !== initialName) {
        const updatedUser = await userService.updateName(userData.name);
        await updateUserInStorage({ name: updatedUser.name });
        setInitialName(updatedUser.name);
      }

      // 2. Update Avatar if it has changed from the initial one and is a local file
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
      console.error("Failed to update profile:", error);
      Alert.alert("Error", error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-brand-pink-50"
    >
      <ProfileHeader onSave={handleSave} isLoading={isLoading} />
      
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <AvatarEditor 
          image={userData.avatar} 
          onImageChange={(uri) => setUserData(prev => ({ ...prev, avatar: uri }))} 
        />
        
        <InputField 
          label="Your Name" 
          value={userData.name} 
          onChangeText={(text) => setUserData(prev => ({ ...prev, name: text }))}
          placeholder="Enter your name"
        />
        
        <ProfileSettings />
        
        <LogoutButton />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
