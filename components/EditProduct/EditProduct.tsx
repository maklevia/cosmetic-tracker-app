import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Header from "./components/Header";
import { PhotoEditor } from "./components/PhotoEditor";
import { InputField } from "./components/InputField";
import { DatePickerField } from "./components/DatePickerField";
import { PAOSelector } from "./components/PAOSelector";
import { DoneButton } from "./components/DoneButton";
import { Ionicons } from "@expo/vector-icons";
import { useEditProduct } from "./hooks/useEditProduct";
import { EditProductProps } from "./typedefs";

export const EditProduct = ({ id, collectionItemId, initialProduct, initialCollectionItem }: EditProductProps) => {
  const router = useRouter();
  const {
    product,
    formData,
    setFormData,
    isLoading,
    canEditGlobalInfo,
    canEditLocalInfo,
    userReviewExists,
    handleSave,
    handleAddReview
  } = useEditProduct(id, collectionItemId, initialProduct, initialCollectionItem);

  if (isLoading && !product) {
    return (
      <View className="flex-1 bg-brand-pink-50 items-center justify-center">
        <ActivityIndicator size="large" color="#831843" />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 bg-brand-pink-50 items-center justify-center">
        <Text className="text-brand-pink-900">Product not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-brand-pink-900 font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
          editable={canEditGlobalInfo}
          onChangeText={(text) => setFormData(prev => ({ ...prev, brand: text }))}
          placeholder="e.g. CeraVe"
        />
        
        <InputField 
          label="Product Name" 
          value={formData.title} 
          editable={canEditLocalInfo}
          onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
          placeholder="e.g. Moisturizing Cream"
        />

        <InputField 
          label="Description" 
          value={formData.description} 
          editable={canEditLocalInfo}
          onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
          placeholder="Add product description..."
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
        
        {/* Review Button */}
        <TouchableOpacity 
          className="mt-8 mx-6 bg-white border border-brand-pink-100 p-4 rounded-2xl flex-row items-center justify-between"
          onPress={handleAddReview}
        >
          <View className="flex-row items-center">
            <Ionicons name="star-outline" size={20} color="#831843" />
            <Text className="text-brand-pink-900 font-bold ml-2">
              {userReviewExists ? "Edit Review" : "Add Review"}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#83184340" />
        </TouchableOpacity>

        <DoneButton onPress={handleSave} isLoading={isLoading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProduct;
