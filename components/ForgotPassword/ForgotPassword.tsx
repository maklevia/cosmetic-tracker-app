import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleReset = () => {
    console.log("Resetting password for:", email);
    // Show success message or navigate
    router.back();
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
                Forgot Password
              </Heading>
              <Text className="text-brand-pink-900/60 mt-2 text-center">
                Enter your email to receive a reset link
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
            </VStack>

            {/* Action Button */}
            <Button 
              onPress={handleReset}
              className="bg-brand-pink-900 h-14 rounded-2xl shadow-lg shadow-brand-pink-900/20 mt-4"
            >
              <ButtonText className="text-white font-bold text-lg">Send Reset Link</ButtonText>
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
