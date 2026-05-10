import React from "react";
import { Profile } from "@/components/Profile/Profile";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-brand-pink-50" edges={['top']}>
      <Profile />
    </SafeAreaView>
  );
}
