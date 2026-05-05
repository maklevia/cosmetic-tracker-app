import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import ProfileHeader from "./components/ProfileHeader";
import AvatarEditor from "./components/AvatarEditor";
import InputField from "../EditProduct/components/InputField";
import ProfileSettings from "./components/ProfileSettings";
import LogoutButton from "./components/LogoutButton";

export const Profile = () => {
  const [userData, setUserData] = useState({
    name: "Mariia Klevchuk",
    avatar: null, // Placeholder initially
  });

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-brand-pink-50"
    >
      <ProfileHeader />
      
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
