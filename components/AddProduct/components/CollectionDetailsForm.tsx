import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { DatePickerField } from "@/components/EditProduct/components/DatePickerField";
import { PAOSelector } from "@/components/EditProduct/components/PAOSelector";

interface CollectionDetailsFormProps {
  onAdd: (data: any) => void;
  isLoading?: boolean;
}

export const CollectionDetailsForm = ({ onAdd, isLoading }: CollectionDetailsFormProps) => {
  const [formData, setFormData] = useState({
    openedDate: "",
    pao: "",
  });

  return (
    <View className="flex-1">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-10 px-6">
          <Text className="text-brand-pink-900/60 text-base mb-6 text-center">
            Almost there! Please set the opening details for your product.
          </Text>
        </View>

        <DatePickerField 
          label="Opened On" 
          value={formData.openedDate} 
          onChangeDate={(date) => setFormData(prev => ({ ...prev, openedDate: date }))}
        />
        
        <PAOSelector 
          value={formData.pao} 
          onValueChange={(val) => setFormData(prev => ({ ...prev, pao: val }))}
        />

        <View className="px-6 mt-12 mb-10">
          <TouchableOpacity 
            onPress={() => onAdd(formData)}
            disabled={isLoading}
            className={`bg-brand-pink-900 py-4 rounded-2xl items-center shadow-lg shadow-brand-pink-900/20 ${isLoading ? 'opacity-70' : ''}`}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">Finish & Add</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
