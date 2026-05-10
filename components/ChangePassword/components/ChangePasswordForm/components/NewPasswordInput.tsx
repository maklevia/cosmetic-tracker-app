import React from "react";
import { FormControl, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorIcon, FormControlErrorText } from "@/components/ui/form-control";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Ionicons } from "@expo/vector-icons";

interface NewPasswordInputProps {
  value: string;
  onChange: (val: string) => void;
  showNew: boolean;
  onToggleShow: () => void;
  error?: string;
}

export const NewPasswordInput = ({ value, onChange, showNew, onToggleShow, error }: NewPasswordInputProps) => (
  <FormControl isInvalid={!!error}>
    <FormControlLabel>
      <FormControlLabelText className="text-brand-pink-900 font-bold">New Password</FormControlLabelText>
    </FormControlLabel>
    <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
      <InputField 
        type={showNew ? "text" : "password"}
        placeholder="Enter new password" 
        value={value}
        onChangeText={onChange}
        className="text-brand-pink-900"
      />
      <InputSlot className="pr-4" onPress={onToggleShow}>
        <Ionicons name={showNew ? "eye-off-outline" : "eye-outline"} size={20} color="#831843" />
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

export default NewPasswordInput;
