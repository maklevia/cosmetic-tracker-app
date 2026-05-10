import React from "react";
import { 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
} from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { ChangePasswordHeader } from "./components/Header";
import { ChangePasswordForm } from "./components/ChangePasswordForm/ChangePasswordForm";
import { useChangePassword } from "./hooks/useChangePassword";

export const ChangePassword = () => {
  const {
    formData,
    setFormData,
    showOld,
    setShowOld,
    showNew,
    setShowNew,
    showConfirm,
    setShowConfirm,
    isLoading,
    errors,
    handleChangePassword
  } = useChangePassword();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-brand-pink-50"
    >
      <ChangePasswordHeader />
      
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ChangePasswordForm 
          formData={formData}
          setFormData={setFormData}
          showOld={showOld}
          setShowOld={setShowOld}
          showNew={showNew}
          setShowNew={setShowNew}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          errors={errors}
        />

        <Button 
          onPress={handleChangePassword}
          isDisabled={isLoading}
          className={`bg-brand-pink-900 h-14 rounded-2xl shadow-lg shadow-brand-pink-900/20 mt-2 mx-6 mb-10 ${isLoading ? 'opacity-70' : ''}`}
        >
          <ButtonText className="text-white font-bold text-lg">
            {isLoading ? "Changing..." : "Change Password"}
          </ButtonText>
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
