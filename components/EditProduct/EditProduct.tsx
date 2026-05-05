import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { CosmeticCard } from "../MainScreen/typedefs";
import Header from "./components/Header";
import PhotoEditor from "./components/PhotoEditor";
import InputField from "./components/InputField";
import DatePickerField from "./components/DatePickerField";
import PAOSelector from "./components/PAOSelector";
import DoneButton from "./components/DoneButton";
import { Ionicons } from "@expo/vector-icons";

interface EditProductProps {
  product: CosmeticCard;
}

export const EditProduct = ({ product }: EditProductProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    imageUrl: product.imageUrl,
    brand: product.brand || "",
    title: product.title,
    description: product.description || "",
    openedDate: product.openedDate || "",
    pao: product.pao || "",
  });

  const handleSave = () => {
    console.log("Saving product data:", formData);
    router.back();
  };

  const handleAddReview = () => {
    router.push({
      pathname: "/add-review",
      params: { id: product.id }
    });
  };

  // 'parsed' products have read-only brand names
  const canEditBrand = product.status !== 'parsed';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-brand-pink-50"
    >
      <Header />
      
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
          editable={canEditBrand}
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
          placeholder="Add product description..."
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
        
        {/* Review Button */}
        <TouchableOpacity 
          className="mt-8 mx-6 bg-white border border-brand-pink-100 p-4 rounded-2xl flex-row items-center justify-between"
          onPress={handleAddReview}
        >
          <View className="flex-row items-center">
            <Ionicons name="star-outline" size={20} color="#831843" />
            <Text className="text-brand-pink-900 font-bold ml-2">
              {product.review ? "Edit Review" : "Add Review"}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#83184340" />
        </TouchableOpacity>

        <DoneButton onPress={handleSave} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProduct;
