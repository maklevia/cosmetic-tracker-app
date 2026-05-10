import React from "react";
import { VStack } from "@/components/ui/vstack";
import { CurrentPasswordInput } from "./components/CurrentPasswordInput";
import { NewPasswordInput } from "./components/NewPasswordInput";
import { ConfirmPasswordInput } from "./components/ConfirmPasswordInput";
import { ChangePasswordFormData, ChangePasswordErrors } from "../../typedefs";

interface ChangePasswordFormProps {
  formData: ChangePasswordFormData;
  setFormData: React.Dispatch<React.SetStateAction<ChangePasswordFormData>>;
  showOld: boolean;
  setShowOld: (show: boolean) => void;
  showNew: boolean;
  setShowNew: (show: boolean) => void;
  showConfirm: boolean;
  setShowConfirm: (show: boolean) => void;
  errors: ChangePasswordErrors;
}

export const ChangePasswordForm = ({
  formData,
  setFormData,
  showOld,
  setShowOld,
  showNew,
  setShowNew,
  showConfirm,
  setShowConfirm,
  errors,
}: ChangePasswordFormProps) => {
  return (
    <VStack className="p-6" space="xl">
      <CurrentPasswordInput 
        value={formData.oldPassword}
        onChange={(val) => setFormData(prev => ({ ...prev, oldPassword: val }))}
        showOld={showOld}
        onToggleShow={() => setShowOld(!showOld)}
        error={errors.old}
      />

      <NewPasswordInput 
        value={formData.newPassword}
        onChange={(val) => setFormData(prev => ({ ...prev, newPassword: val }))}
        showNew={showNew}
        onToggleShow={() => setShowNew(!showNew)}
        error={errors.general}
      />

      <ConfirmPasswordInput 
        value={formData.confirmPassword}
        onChange={(val) => setFormData(prev => ({ ...prev, confirmPassword: val }))}
        showConfirm={showConfirm}
        onToggleShow={() => setShowConfirm(!showConfirm)}
        error={errors.mismatch}
      />
    </VStack>
  );
};

export default ChangePasswordForm;
