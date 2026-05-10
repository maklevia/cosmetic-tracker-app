import React from "react";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Ionicons } from "@expo/vector-icons";

interface NewPasswordInputProps {
  value: string;
  onChange: (val: string) => void;
  showPassword: boolean;
  onToggleShow: () => void;
}

export const NewPasswordInput = ({ value, onChange, showPassword, onToggleShow }: NewPasswordInputProps) => (
  <FormControl size="md">
    <FormControlLabel>
      <FormControlLabelText className="text-brand-pink-900 font-bold">New Password</FormControlLabelText>
    </FormControlLabel>
    <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
      <InputField 
        type={showPassword ? "text" : "password"}
        placeholder="Enter new password" 
        value={value}
        onChangeText={onChange}
        className="text-brand-pink-900"
      />
      <InputSlot className="pr-4" onPress={onToggleShow}>
        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#831843" />
      </InputSlot>
    </Input>
  </FormControl>
);
