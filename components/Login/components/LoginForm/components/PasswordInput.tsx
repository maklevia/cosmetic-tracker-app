import React from "react";
import { TouchableOpacity } from "react-native";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface PasswordInputProps {
  value: string;
  onChange: (val: string) => void;
  showPassword: boolean;
  onToggleShow: () => void;
}

export const PasswordInput = ({ value, onChange, showPassword, onToggleShow }: PasswordInputProps) => {
  const router = useRouter();
  
  return (
    <FormControl size="md">
      <FormControlLabel>
        <FormControlLabelText className="text-brand-pink-900 font-bold">Password</FormControlLabelText>
      </FormControlLabel>
      <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
        <InputField 
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={value}
          onChangeText={onChange}
          className="text-brand-pink-900"
        />
        <InputSlot className="pr-4" onPress={onToggleShow}>
          <Ionicons 
            name={showPassword ? "eye-off-outline" : "eye-outline"} 
            size={20} 
            color="#831843" 
          />
        </InputSlot>
      </Input>
      <TouchableOpacity 
        className="mt-2 self-end"
        onPress={() => router.push("/forgot-password")}
      >
        <Text className="text-brand-pink-900 font-bold text-xs">Forgot Password?</Text>
      </TouchableOpacity>
    </FormControl>
  );
};

export default PasswordInput;
