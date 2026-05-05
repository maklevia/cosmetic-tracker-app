import React from "react";
import { ForgotPassword } from "@/components/ForgotPassword/ForgotPassword";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  return (
    <SafeAreaView className="flex-1 bg-brand-pink-50" edges={['top']}>
      <ForgotPassword />
    </SafeAreaView>
  );
}
