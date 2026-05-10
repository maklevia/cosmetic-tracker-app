import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Image } from "expo-image";
import { ProductImage } from "@/components/ItemDetails/components/ProductImage";
import { ProductInfo } from "@/components/ItemDetails/components/ProductInfo";
import { Product } from "@/api/services/productService";
import { Ionicons } from "@expo/vector-icons";
import { getFullImageUrl } from "@/api/apiClient";

interface ProductPreviewProps {
  product: Product;
  onContinue: () => void;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <View className="flex-row">
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= Math.round(rating) ? "star" : "star-outline"}
          size={12}
          color="#831843"
        />
      ))}
    </View>
  );
};

export const ProductPreview = ({ product, onContinue }: ProductPreviewProps) => {
  const imageUrl = getFullImageUrl(product.image?.path);

  return (
    <View className="flex-1">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 24 }}
      >
        <ProductImage imageUrl={imageUrl || ""} />
        <ProductInfo brand={product.brand} title={product.title} />
        
        {/* Action Button */}
        <TouchableOpacity 
          onPress={onContinue}
          className="mt-8 bg-brand-pink-900 py-4 rounded-2xl items-center shadow-lg shadow-brand-pink-900/20"
        >
          <Text className="text-white font-bold text-lg">Add to collection</Text>
        </TouchableOpacity>

        {/* User Reviews (Last 3) */}
        {product.reviews && product.reviews.length > 0 && (
          <View className="mt-10">
            <Text className="text-lg font-bold text-brand-pink-900 mb-4">User Reviews</Text>
            {[...product.reviews]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 3)
              .map((review) => (
                <View key={review.id} className="mb-4 bg-white p-4 rounded-2xl border border-brand-pink-100 shadow-sm">
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center flex-1">
                      <View className="w-6 h-6 rounded-full bg-brand-pink-100/50 mr-2 overflow-hidden border border-brand-pink-100/50">
                        {getFullImageUrl((review as any).user?.avatar?.path) ? (
                          <Image 
                            source={{ uri: getFullImageUrl((review as any).user?.avatar?.path)! }} 
                            style={{ width: "100%", height: "100%" }}
                            contentFit="cover"
                          />
                        ) : (
                          <View className="flex-1 items-center justify-center">
                            <Ionicons name="person" size={12} color="#83184320" />
                          </View>
                        )}
                      </View>
                      <Text className="text-brand-pink-900/40 text-[10px] font-bold uppercase tracking-wider" numberOfLines={1}>
                        {(review as any).user?.name || "Anonymous"}
                      </Text>
                    </View>
                    <StarRating rating={review.scoreReview} />
                  </View>
                  <Text className="text-brand-pink-900/70 text-sm italic ml-8">
                    {"\""}{review.textReview}{"\""}
                  </Text>
                </View>
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ProductPreview;
