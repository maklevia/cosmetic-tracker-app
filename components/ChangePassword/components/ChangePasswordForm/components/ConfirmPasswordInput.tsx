import React from "react";
import { FormControl, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorIcon, FormControlErrorText } from "@/components/ui/form-control";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Ionicons } from "@expo/vector-icons";

interface ConfirmPasswordInputProps {
  value: string;
  onChange: (val: string) => void;
  showConfirm: boolean;
  onToggleShow: () => void;
  error?: string;
}

export const ConfirmPasswordInput = ({ value, onChange, showConfirm, onToggleShow, error }: ConfirmPasswordInputProps) => (
  <FormControl isInvalid={!!error}>
    <FormControlLabel>
      <FormControlLabelText className="text-brand-pink-900 font-bold">Confirm New Password</FormControlLabelText>
    </FormControlLabel>
    <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
      <InputField 
        type={showConfirm ? "text" : "password"}
        placeholder="Repeat new password" 
        value={value}
        onChangeText={onChange}
        className="text-brand-pink-900"
      />
      <InputSlot className="pr-4" onPress={onToggleShow}>
        <Ionicons name={showConfirm ? "eye-off-outline" : "eye-outline"} size={20} color="#831843" />
      </InputSlot>
    </Input>
    {error && (
      <FormControlError>
        <FormControlErrorIcon as={() => <Ionicons name="alert-circle-outline" size={16} color="#ef4444" />} />
        <FormControlErrorText className="text-red-500 ml-1">{error}</FormControlErrorText>
      </FormControlError>
    )}
  </FormControl>
);

export default ConfirmPasswordInput;
