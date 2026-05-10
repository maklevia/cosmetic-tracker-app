import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress: () => void;
  isDestructive?: boolean;
}

export const SettingsItem = ({ icon, label, value, onPress, isDestructive }: SettingsItemProps) => {
  return (
    <TouchableOpacity 
      className={`bg-white border p-4 rounded-2xl flex-row items-center justify-between mb-4 ${
        isDestructive ? 'border-red-100' : 'border-brand-pink-100'
      }`}
      onPress={onPress}
    >
      <View className="flex-row items-center">
        <Ionicons 
          name={icon} 
          size={20} 
          color={isDestructive ? "#ef4444" : "#831843"} 
        />
        <Text className={`font-bold ml-3 ${isDestructive ? 'text-red-500' : 'text-brand-pink-900'}`}>
          {label}
        </Text>
      </View>
      <View className="flex-row items-center">
        {value && (
          <Text className="text-brand-pink-900/40 text-sm mr-2">{value}</Text>
        )}
        <Ionicons 
          name="chevron-forward" 
          size={18} 
          color={isDestructive ? "#ef444420" : "#83184320"} 
        />
      </View>
    </TouchableOpacity>
  );
};
