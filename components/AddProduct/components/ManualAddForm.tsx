import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import PhotoEditor from "@/components/EditProduct/components/PhotoEditor";
import InputField from "@/components/EditProduct/components/InputField";
import DatePickerField from "@/components/EditProduct/components/DatePickerField";
import PAOSelector from "@/components/EditProduct/components/PAOSelector";

interface ManualAddFormProps {
  onAdd: (data: any) => void;
}

export const ManualAddForm = ({ onAdd }: ManualAddFormProps) => {
  const [formData, setFormData] = useState({
    imageUrl: "https://picsum.photos/400/300?grayscale", // Default placeholder
    brand: "",
    title: "",
    openedDate: "",
    pao: "",
  });

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
            className="bg-brand-pink-900 py-4 rounded-2xl items-center shadow-lg shadow-brand-pink-900/20"
          >
            <Text className="text-white font-bold text-lg">Add to collection</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ManualAddForm;
