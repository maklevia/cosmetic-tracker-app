import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

interface PAOSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const PREDEFINED_OPTIONS = ["3m", "6m", "12m", "24m"];

export const PAOSelector = ({ value, onValueChange }: PAOSelectorProps) => {
  const [customValue, setCustomValue] = useState("");
  const isCustom = !PREDEFINED_OPTIONS.includes(value) && value !== "";

  return (
    <View className="mt-6 px-6">
      <Text className="text-xs font-bold text-brand-pink-900/60 uppercase tracking-widest mb-3">
        Period After Opening (PAO)
      </Text>
      
      <View className="flex-row flex-wrap">
        {PREDEFINED_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => onValueChange(option)}
            className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
              value === option ? "bg-brand-pink-900 border-brand-pink-900" : "bg-white border-brand-pink-100"
            }`}
          >
            <Text className={`font-bold ${value === option ? "text-white" : "text-brand-pink-900"}`}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
        
        <View className={`flex-row items-center border rounded-full px-3 py-1 mb-2 ${
          isCustom ? "border-brand-pink-900 bg-brand-pink-900" : "border-brand-pink-100 bg-white"
        }`}>
          <TextInput
            value={isCustom ? value.replace("m", "") : customValue}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              setCustomValue(numericValue);
              if (numericValue) onValueChange(`${numericValue}m`);
              else onValueChange("");
            }}
            placeholder="Custom"
            keyboardType="numeric"
            className={`font-bold mr-1 ${isCustom ? "text-white" : "text-brand-pink-900"}`}
            placeholderTextColor={isCustom ? "#FFFFFF80" : "#83184340"}
            style={{ minWidth: 50 }}
          />
          <Text className={`font-bold ${isCustom ? "text-white" : "text-brand-pink-900"}`}>m</Text>
        </View>
      </View>
    </View>
  );
};

export default PAOSelector;
