import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSignup = () => {
    console.log("Signing up with:", { name, email, password });
    // Navigate to the main app flow
    router.replace("/(tabs)");
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
              
              <Heading size="3xl" className="text-brand-pink-900 mt-6 text-center">
                Create Account
              </Heading>
            </Center>

            {/* Form */}
            <VStack space="lg">
              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText className="text-brand-pink-900 font-bold">Full Name</FormControlLabelText>
                </FormControlLabel>
                <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
                  <InputField 
                    placeholder="Enter your name" 
                    value={name}
                    onChangeText={setName}
                    className="text-brand-pink-900"
                  />
                </Input>
              </FormControl>

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
                    placeholder="Create a password"
                    value={password}
                    onChangeText={setPassword}
                    className="text-brand-pink-900"
                  />
                  <InputSlot className="pr-4" onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#831843" 
                    />
                  </InputSlot>
                </Input>
              </FormControl>

              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText className="text-brand-pink-900 font-bold">Confirm Password</FormControlLabelText>
                </FormControlLabel>
                <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
                  <InputField 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    className="text-brand-pink-900"
                  />
                  <InputSlot className="pr-4" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons 
                      name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#831843" 
                    />
                  </InputSlot>
                </Input>
              </FormControl>
            </VStack>

            {/* Action Button */}
            <Button 
              onPress={handleSignup}
              className="bg-brand-pink-900 h-14 rounded-2xl shadow-lg shadow-brand-pink-900/20 mt-4"
            >
              <ButtonText className="text-white font-bold text-lg">Sign Up</ButtonText>
            </Button>

            {/* Footer */}
            <Center className="mt-6">
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text className="text-brand-pink-900/60">
                  Already have an account?{" "}
                  <Text className="text-brand-pink-900 font-bold underline">Log In</Text>
                </Text>
              </TouchableOpacity>
            </Center>
          </VStack>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
