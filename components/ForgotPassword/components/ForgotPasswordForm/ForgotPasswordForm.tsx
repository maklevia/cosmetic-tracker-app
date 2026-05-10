import React from "react";
import { VStack } from "@/components/ui/vstack";
import { EmailInput } from "./components/EmailInput";
import { NewPasswordInput } from "./components/NewPasswordInput";
import { ForgotPasswordFormData } from "../../typedefs";

interface ForgotPasswordFormProps {
  formData: ForgotPasswordFormData;
  setFormData: React.Dispatch<React.SetStateAction<ForgotPasswordFormData>>;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export const ForgotPasswordForm = ({
  formData,
  setFormData,
  showPassword,
  onTogglePassword,
}: ForgotPasswordFormProps) => {
  return (
    <VStack space="lg">
      <EmailInput 
        value={formData.email}
        onChange={(val) => setFormData(prev => ({ ...prev, email: val }))}
      />

      <NewPasswordInput 
        value={formData.newPassword}
        onChange={(val) => setFormData(prev => ({ ...prev, newPassword: val }))}
        showPassword={showPassword}
        onToggleShow={onTogglePassword}
      />
    </VStack>
  );
};
