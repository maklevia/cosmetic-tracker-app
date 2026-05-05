import React from "react";
import Login from "@/components/Login/Login";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-brand-pink-50" edges={['top']}>
      <Login />
    </SafeAreaView>
  );
}
