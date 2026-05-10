import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import authService from "@/api/services/authService";
import { setToken, setUser } from "@/utils/storage";
import { SignupFormData, SignupHookData } from "../typedefs";

export const useSignup = (): SignupHookData => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = useCallback(async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const response = await authService.register({ name, email: normalizedEmail, password });
      await setToken(response.token);
      await setUser(response.user);
      
      console.log("Registered successfully:", response.user.name);
      router.replace("/(tabs)");
    } catch (error: any) {
      console.log("Signup component handled error:", error.response?.data || error.message);
      Alert.alert(
        "Signup Failed", 
        error.response?.data?.message || "Something went wrong. Please check your connection."
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
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    handleSignup,
  };
};
