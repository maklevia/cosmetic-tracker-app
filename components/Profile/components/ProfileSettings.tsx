import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { SettingsItem } from "./SettingsItem";

interface ProfileSettingsProps {
  onDeleteAccount: () => void;
}

export const ProfileSettings = ({ onDeleteAccount }: ProfileSettingsProps) => {
  const router = useRouter();

  return (
    <View className="mt-10 px-6">
      <Text className="text-xs font-bold text-brand-pink-900/60 uppercase tracking-widest mb-4">
        Settings
      </Text>
      
      <SettingsItem 
        icon="moon-outline" 
        label="Appearance" 
        value="Light"
        onPress={() => console.log("Theme toggle - Not implemented")}
      />

      <SettingsItem 
        icon="globe-outline" 
        label="Language" 
        value="English"
        onPress={() => console.log("Language selector - Not implemented")}
      />

      <SettingsItem 
        icon="lock-closed-outline" 
        label="Change Password" 
        onPress={() => router.push("/change-password")}
      />

      <SettingsItem 
        icon="person-remove-outline" 
        label="Delete Account" 
        isDestructive={true}
        onPress={onDeleteAccount}
      />
    </View>
  );
};

export default ProfileSettings;
