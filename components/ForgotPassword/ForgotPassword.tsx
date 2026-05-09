import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import authService from "@/api/services/authService";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
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
            {/* Header */}
            <Center className="mb-4">
              <Box className="w-20 h-20 rounded-3xl bg-brand-pink-900 items-center justify-center shadow-lg shadow-brand-pink-900/20">
                <Ionicons name="key-outline" size={40} color="white" />
              </Box>
              <Heading size="3xl" className="text-brand-pink-900 mt-6 text-center">
                Reset Password
              </Heading>
              <Text className="text-brand-pink-900/60 mt-2 text-center">
                Enter your email and a new password
              </Text>
            </Center>

            {/* Form */}
            <VStack space="lg">
              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText className="text-brand-pink-900 font-bold">Email Address</FormControlLabelText>
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
                  <FormControlLabelText className="text-brand-pink-900 font-bold">New Password</FormControlLabelText>
                </FormControlLabel>
                <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
                  <InputField 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password" 
                    value={newPassword}
                    onChangeText={setNewPassword}
                    className="text-brand-pink-900"
                  />
                  <InputSlot className="pr-4" onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#831843" />
                  </InputSlot>
                </Input>
              </FormControl>
            </VStack>

            {/* Action Button */}
            <Button 
              onPress={handleReset}
              isDisabled={isLoading}
              className={`bg-brand-pink-900 h-14 rounded-2xl shadow-lg shadow-brand-pink-900/20 mt-4 ${isLoading ? 'opacity-70' : ''}`}
            >
              <ButtonText className="text-white font-bold text-lg">
                {isLoading ? "Resetting..." : "Reset Password"}
              </ButtonText>
            </Button>

            {/* Footer */}
            <Center className="mt-6">
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-brand-pink-900 font-bold underline">
                  Back to Log In
                </Text>
              </TouchableOpacity>
            </Center>
          </VStack>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
