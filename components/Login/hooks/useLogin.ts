import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import authService from "@/api/services/authService";
import { setToken, setUser } from "@/utils/storage";
import { LoginFormData, LoginHookData } from "../typedefs";

export const useLogin = (): LoginHookData => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = useCallback(async () => {
    const { email, password } = formData;

    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    const trimmedEmail = email.trim().toLowerCase();
    console.log("Attempting login for:", trimmedEmail);
    
    try {
      const response = await authService.login({ email: trimmedEmail, password });
      console.log("Login response received, saving token...");
      await setToken(response.token);
      console.log("Token saved, saving user...");
      await setUser(response.user);
      
      console.log("User saved, navigating to tabs:", response.user.name);
      router.replace("/(tabs)");
    } catch (error: any) {
      console.log("Login component handled error:", error.message);
      Alert.alert(
        "Login Failed", 
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
    isLoading,
    handleLogin,
  };
};
