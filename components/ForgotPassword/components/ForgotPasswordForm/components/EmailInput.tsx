import React from "react";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";

interface EmailInputProps {
  value: string;
  onChange: (val: string) => void;
}

export const EmailInput = ({ value, onChange }: EmailInputProps) => (
  <FormControl size="md">
    <FormControlLabel>
      <FormControlLabelText className="text-brand-pink-900 font-bold">Email Address</FormControlLabelText>
    </FormControlLabel>
    <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
      <InputField 
        placeholder="Enter your email" 
        value={value}
        onChangeText={onChange}
        className="text-brand-pink-900"
      />
    </Input>
  </FormControl>
);
