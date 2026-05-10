import React from "react";
import { TouchableOpacity } from "react-native";
import { FormControl, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorIcon, FormControlErrorText } from "@/components/ui/form-control";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface CurrentPasswordInputProps {
  value: string;
  onChange: (val: string) => void;
  showOld: boolean;
  onToggleShow: () => void;
  error?: string;
}

export const CurrentPasswordInput = ({ value, onChange, showOld, onToggleShow, error }: CurrentPasswordInputProps) => {
  const router = useRouter();

  return (
    <FormControl isInvalid={!!error}>
      <FormControlLabel>
        <FormControlLabelText className="text-brand-pink-900 font-bold">Current Password</FormControlLabelText>
      </FormControlLabel>
      <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
        <InputField 
          type={showOld ? "text" : "password"}
          placeholder="Enter current password" 
          value={value}
          onChangeText={onChange}
          className="text-brand-pink-900"
        />
        <InputSlot className="pr-4" onPress={onToggleShow}>
          <Ionicons name={showOld ? "eye-off-outline" : "eye-outline"} size={20} color="#831843" />
        </InputSlot>
      </Input>
      {error && (
        <FormControlError>
          <FormControlErrorIcon as={() => <Ionicons name="alert-circle-outline" size={16} color="#ef4444" />} />
          <FormControlErrorText className="text-red-500 ml-1">{error}</FormControlErrorText>
        </FormControlError>
      )}
      <TouchableOpacity 
        className="mt-2 self-end"
        onPress={() => router.push("/forgot-password")}
      >
        <Text className="text-brand-pink-900 font-bold text-xs">Forgot Password?</Text>
      </TouchableOpacity>
    </FormControl>
  );
};
