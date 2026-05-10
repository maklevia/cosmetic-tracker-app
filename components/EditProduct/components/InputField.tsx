import React from "react";
import { View, Text, TextInput } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
  multiline?: boolean;
}

export const InputField = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  editable = true,
  multiline = false 
}: InputFieldProps) => {
  return (
    <View className="mt-6 px-6">
      <Text className="text-xs font-bold text-brand-pink-900/60 uppercase tracking-widest mb-2">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        multiline={multiline}
        style={multiline ? { minHeight: 80, textAlignVertical: 'top' } : undefined}
        className={`bg-white border rounded-2xl px-4 py-3 font-medium ${
          editable ? "border-brand-pink-100 text-brand-pink-900" : "border-transparent bg-brand-pink-900/5 text-brand-pink-900/40"
        }`}
        placeholderTextColor="#83184340"
      />
    </View>
  );
};
