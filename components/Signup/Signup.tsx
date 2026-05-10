import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { useSignup } from "./hooks/useSignup";
import SignupHeader from "./components/SignupHeader";
import SignupForm from "./components/SignupForm/SignupForm";

export const Signup = () => {
  const router = useRouter();
  const {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    handleSignup,
  } = useSignup();

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
            <SignupHeader />

            <SignupForm 
              formData={formData}
              setFormData={setFormData}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
            />

            {/* Action Button */}
            <Button 
              onPress={handleSignup}
              isDisabled={isLoading}
              className={`bg-brand-pink-900 h-14 rounded-2xl shadow-lg shadow-brand-pink-900/20 mt-4 ${isLoading ? 'opacity-70' : ''}`}
            >
              <ButtonText className="text-white font-bold text-lg">
                {isLoading ? "Creating Account..." : "Sign Up"}
              </ButtonText>
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
