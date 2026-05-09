import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText, FormControlHelper, FormControlHelperText, FormControlError, FormControlErrorIcon, FormControlErrorText } from "@/components/ui/form-control";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import authService from "@/api/services/authService";
import { setToken, setUser } from "@/utils/storage";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
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
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-brand-pink-50"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Center className="flex-1 px-6 py-12">
          <VStack className="w-full max-w-[400px]" space="xl">
            {/* Logo/Icon Area */}
            <Center className="mb-4">
              <Box className="w-20 h-20 rounded-3xl bg-brand-pink-900 items-center justify-center shadow-lg shadow-brand-pink-900/20">
                <Ionicons name="color-filter" size={40} color="white" />
              </Box>
              <Heading size="3xl" className="text-brand-pink-900 mt-6 text-center">
                Welcome Back
              </Heading>
              <Text className="text-brand-pink-900/60 mt-2 text-center">
                Log in to track your cosmetics
              </Text>
            </Center>

            {/* Form */}
            <VStack space="lg">
              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText className="text-brand-pink-900 font-bold">Email</FormControlLabelText>
                </FormControlLabel>
                <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
                  <InputField 
                    placeholder="Enter your email" 
                    value={email}
                    onChangeText={setEmail}
                    className="text-brand-pink-900"
                  />
                </Input>
              </FormControl>

              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText className="text-brand-pink-900 font-bold">Password</FormControlLabelText>
                </FormControlLabel>
                <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
                  <InputField 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    className="text-brand-pink-900"
                  />
                  <InputSlot className="pr-4" onPress={togglePasswordVisibility}>
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#831843" 
                    />
                  </InputSlot>
                </Input>
                <TouchableOpacity 
                  className="mt-2 self-end"
                  onPress={() => router.push("/forgot-password")}
                >
                  <Text className="text-brand-pink-900 font-bold text-xs">Forgot Password?</Text>
                </TouchableOpacity>
              </FormControl>
            </VStack>

            {/* Action Button */}
            <Button 
              onPress={handleLogin}
              isDisabled={isLoading}
              className={`bg-brand-pink-900 h-14 rounded-2xl shadow-lg shadow-brand-pink-900/20 mt-4 ${isLoading ? 'opacity-70' : ''}`}
            >
              <ButtonText className="text-white font-bold text-lg">
                {isLoading ? "Logging in..." : "Log In"}
              </ButtonText>
            </Button>

            {/* Footer */}
            <Center className="mt-6">
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text className="text-brand-pink-900/60">
                  Don't have an account?{" "}
                  <Text className="text-brand-pink-900 font-bold underline">Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </Center>
          </VStack>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
