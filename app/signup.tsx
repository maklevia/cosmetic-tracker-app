import React from "react";
import { Signup } from "@/components/Signup/Signup";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  return (
    <SafeAreaView className="flex-1 bg-brand-pink-50" edges={['top']}>
      <Signup />
    </SafeAreaView>
  );
}
