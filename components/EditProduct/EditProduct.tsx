import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import Header from "./components/Header";
import PhotoEditor from "./components/PhotoEditor";
import InputField from "./components/InputField";
import DatePickerField from "./components/DatePickerField";
import PAOSelector from "./components/PAOSelector";
import DoneButton from "./components/DoneButton";
import { Ionicons } from "@expo/vector-icons";
import { Product, SourceStatus } from "@/api/services/productService";
import collectionService, { CollectionItem } from "@/api/services/collectionService";
import productService from "@/api/services/productService";
import imageService from "@/api/services/imageService";
import { getFullImageUrl } from "@/api/apiClient";
import { getDisplayData } from "@/utils/display";

interface EditProductProps {
  product: Product;
  collectionItem?: CollectionItem | null;
}

export const EditProduct = ({ product, collectionItem }: EditProductProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const displayData = collectionItem ? getDisplayData(collectionItem) : {
    title: product.title,
    brand: product.brand,
    description: product.description,
    imageUrl: product.image?.path || product.image?.url || null
  };

  const [formData, setFormData] = useState({
    imageUrl: getFullImageUrl(displayData.imageUrl) || "",
    brand: displayData.brand || "",
    title: displayData.title,
    description: displayData.description || "",
    openedDate: collectionItem?.openedDate || "",
    pao: collectionItem?.pao?.toString() || "",
  });

  const handleSave = async () => {
    // 1. Mandatory Fields Validation
    if (!formData.title || !formData.brand || !formData.openedDate || !formData.pao) {
      Alert.alert("Required Fields", "Please fill in Product Name, Brand, Opened Date, and PAO.");
      return;
    }

    setIsLoading(true);
    try {
      let imageId = undefined;
      const isNewImage = formData.imageUrl && formData.imageUrl.startsWith('file://');
      
      if (isNewImage) {
        const uploaded = await imageService.upload(formData.imageUrl, 'product');
        imageId = uploaded.id;
      }

      // Logic based on Product Source Status
      if (product.sourceStatus === SourceStatus.ADDED_MANUALLY) {
        // Edit GLOBAL product record (as user owns it)
        await productService.update(product.id, {
          brand: formData.brand,
          title: formData.title,
          description: formData.description,
          imageId: imageId || undefined
        });

        // Also update collection-specific fields (dates)
        if (collectionItem) {
          await collectionService.update(collectionItem.id, {
            openedDate: formData.openedDate,
            pao: parseInt(formData.pao),
          });
        }
      } else {
        // Edit PARSED product record (using user_added overrides)
        if (collectionItem) {
          await collectionService.update(collectionItem.id, {
            userAddedTitle: formData.title !== product.title ? formData.title : null,
            userAddedDescription: formData.description !== product.description ? formData.description : null,
            userAddedImageId: imageId || null,
            openedDate: formData.openedDate,
            pao: parseInt(formData.pao),
          });
        }
      }

      Alert.alert("Success", "Product updated successfully!");
      router.back();
    } catch (error: any) {
      console.error("Failed to save product:", error);
      Alert.alert("Error", error.response?.data?.message || "Failed to save changes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddReview = () => {
    router.push({
      pathname: "/add-review",
      params: { id: product.id }
    });
  };

  const canEditProduct = product.sourceStatus === SourceStatus.ADDED_MANUALLY;

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
          editable={canEditProduct}
          onChangeText={(text) => setFormData(prev => ({ ...prev, brand: text }))}
          placeholder="e.g. CeraVe"
        />
        
        <InputField 
          label="Product Name" 
          value={formData.title} 
          editable={canEditProduct}
          onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
          placeholder="e.g. Moisturizing Cream"
        />

        <InputField 
          label="Description" 
          value={formData.description} 
          editable={canEditProduct}
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
        
        <TouchableOpacity 
          className="mt-8 mx-6 bg-white border border-brand-pink-100 p-4 rounded-2xl flex-row items-center justify-between"
          onPress={handleAddReview}
        >
          <View className="flex-row items-center">
            <Ionicons name="star-outline" size={20} color="#831843" />
            <Text className="text-brand-pink-900 font-bold ml-2">
              Add Review
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
