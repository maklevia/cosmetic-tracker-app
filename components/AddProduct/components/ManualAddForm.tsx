import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import PhotoEditor from "@/components/EditProduct/components/PhotoEditor";
import InputField from "@/components/EditProduct/components/InputField";
import DatePickerField from "@/components/EditProduct/components/DatePickerField";
import PAOSelector from "@/components/EditProduct/components/PAOSelector";
import { getFullImageUrl } from "@/api/apiClient";

interface ManualAddFormProps {
  onAdd: (data: any) => void;
  isLoading?: boolean;
  initialData?: {
    brand: string;
    title: string;
    description: string;
    imageUrl: string | null;
  };
}

export const ManualAddForm = ({ onAdd, isLoading, initialData }: ManualAddFormProps) => {
  const [formData, setFormData] = useState({
    imageUrl: initialData?.imageUrl || null,
    brand: initialData?.brand || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    openedDate: "",
    pao: "",
  });

  const imageUrl = formData.imageUrl?.startsWith('http') 
    ? formData.imageUrl 
    : formData.imageUrl; // local URI is fine as is for PhotoEditor/Image

  return (
    <View className="flex-1">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <PhotoEditor 
          image={formData.imageUrl} 
          onImageChange={(uri) => setFormData(prev => ({ ...prev, imageUrl: uri }))} 
        />
        
        <InputField 
          label="Brand" 
          value={formData.brand} 
          onChangeText={(text) => setFormData(prev => ({ ...prev, brand: text }))}
          placeholder="e.g. CeraVe"
        />
        
        <InputField 
          label="Product Name" 
          value={formData.title} 
          onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
          placeholder="e.g. Moisturizing Cream"
        />

        <InputField 
          label="Description" 
          value={formData.description} 
          onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
          placeholder="Short description or notes..."
          multiline={true}
        />
        
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
              <Text className="text-white font-bold text-lg">Add to collection</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ManualAddForm;
