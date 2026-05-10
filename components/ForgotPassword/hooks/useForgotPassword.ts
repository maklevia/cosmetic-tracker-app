import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import authService from "@/api/services/authService";
import { ForgotPasswordFormData, ForgotPasswordHookData } from "../typedefs";

export const useForgotPassword = (): ForgotPasswordHookData => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleReset = useCallback(async () => {
    const { email, newPassword } = formData;

    if (!email || !newPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword(email.trim().toLowerCase(), newPassword);
      Alert.alert(
        "Success", 
        "Your password has been reset. You can now log in with your new password.",
        [{ text: "OK", onPress: () => router.replace("/login") }]
      );
    } catch (error: any) {
      console.log("Reset component handled error:", error.message);
      Alert.alert(
        "Error", error.response?.data?.message || "Failed to reset password"
      );
    } finally {
      setIsLoading(false);
    }
  }, [formData, router]);

  return {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    isLoading,
    handleReset,
  };
};
