import React from "react";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";

interface NameInputProps {
  value: string;
  onChange: (val: string) => void;
}

export const NameInput = ({ value, onChange }: NameInputProps) => (
  <FormControl size="md">
    <FormControlLabel>
      <FormControlLabelText className="text-brand-pink-900 font-bold">Full Name</FormControlLabelText>
    </FormControlLabel>
    <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
      <InputField 
        placeholder="Enter your name" 
        value={value}
        onChangeText={onChange}
        className="text-brand-pink-900"
      />
    </Input>
  </FormControl>
);

export default NameInput;
