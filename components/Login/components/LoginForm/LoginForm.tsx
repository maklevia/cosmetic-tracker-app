import React from "react";
import { VStack } from "@/components/ui/vstack";
import { LoginFormData } from "../../typedefs";
import { EmailInput } from "./components/EmailInput";
import { PasswordInput } from "./components/PasswordInput";

interface LoginFormProps {
  formData: LoginFormData;
  setFormData: React.Dispatch<React.SetStateAction<LoginFormData>>;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export const LoginForm = ({
  formData,
  setFormData,
  showPassword,
  onTogglePassword,
}: LoginFormProps) => {
  return (
    <VStack space="lg">
      <EmailInput 
        value={formData.email}
        onChange={(val) => setFormData(prev => ({ ...prev, email: val }))}
      />

      <PasswordInput 
        value={formData.password}
        onChange={(val) => setFormData(prev => ({ ...prev, password: val }))}
        showPassword={showPassword}
        onToggleShow={onTogglePassword}
      />
    </VStack>
  );
};

export default LoginForm;
