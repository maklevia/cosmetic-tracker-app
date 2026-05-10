import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { useForgotPassword } from "./hooks/useForgotPassword";
import { ForgotPasswordHeader } from "./components/ForgotPasswordHeader";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm/ForgotPasswordForm";

export const ForgotPassword = () => {
  const router = useRouter();
  const {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    isLoading,
    handleReset,
  } = useForgotPassword();

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
            <ForgotPasswordHeader />

            <ForgotPasswordForm 
              formData={formData}
              setFormData={setFormData}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

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
