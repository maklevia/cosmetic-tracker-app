import React from "react";
import { VStack } from "@/components/ui/vstack";
import { SignupFormData } from "../../typedefs";
import { NameInput } from "./components/NameInput";
import { EmailInput } from "./components/EmailInput";
import { PasswordInput } from "./components/PasswordInput";
import { ConfirmPasswordInput } from "./components/ConfirmPasswordInput";

interface SignupFormProps {
  formData: SignupFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}

export const SignupForm = ({
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: SignupFormProps) => {
  return (
    <VStack space="lg">
      <NameInput 
        value={formData.name}
        onChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
      />

      <EmailInput 
        value={formData.email}
        onChange={(val) => setFormData(prev => ({ ...prev, email: val }))}
      />

      <PasswordInput 
        value={formData.password}
        onChange={(val) => setFormData(prev => ({ ...prev, password: val }))}
        showPassword={showPassword}
        onToggleShow={() => setShowPassword(!showPassword)}
      />

      <ConfirmPasswordInput 
        value={formData.confirmPassword}
        onChange={(val) => setFormData(prev => ({ ...prev, confirmPassword: val }))}
        showPassword={showConfirmPassword}
        onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
      />
    </VStack>
  );
};

export default SignupForm;
