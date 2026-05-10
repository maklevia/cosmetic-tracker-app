import React from "react";
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { ProductImage } from "@/components/ItemDetails/components/ProductImage";
import { ProductInfo } from "@/components/ItemDetails/components/ProductInfo";
import { Product } from "@/api/services/productService";
import { Ionicons } from "@expo/vector-icons";
import { getFullImageUrl } from "@/api/apiClient";

interface ProductPreviewProps {
  product: Product;
  onAdd: (data: any) => void;
  isLoading?: boolean;
}

const GlobalStarRating = ({ rating }: { rating: number }) => {
  return (
    <View className="flex-row items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= Math.round(rating) ? "star" : "star-outline"}
          size={16}
          color="#831843"
        />
      ))}
      <Text className="ml-2 text-brand-pink-900 font-bold text-sm">
        {rating} / 5
      </Text>
    </View>
  );
};

export const ProductPreview = ({ product, onAdd, isLoading }: ProductPreviewProps) => {
  const imageUrl = getFullImageUrl(product.image?.url);

  return (
    <View className="flex-1">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 24 }}
      >
        <ProductImage imageUrl={imageUrl || ""} />
        <ProductInfo brand={product.brand} title={product.title} />
        
        {/* Main Action Button */}
        <TouchableOpacity 
          onPress={() => onAdd({})}
          disabled={isLoading}
          className={`mt-8 bg-brand-pink-900 py-4 rounded-2xl items-center shadow-lg shadow-brand-pink-900/20 ${isLoading ? 'opacity-70' : ''}`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Add to collection</Text>
          )}
        </TouchableOpacity>

        {/* Our users' ratings Section */}
        {product.averageScore > 0 && (
          <View className="mt-12 bg-brand-pink-100/20 p-4 rounded-2xl border border-brand-pink-100">
            <Text className="text-[10px] font-bold text-brand-pink-900/60 uppercase tracking-widest mb-2">
              Our users` ratings
            </Text>
            <GlobalStarRating rating={product.averageScore} />
          </View>
        )}

        {/* Global Reviews List (Showing User Names) */}
        {product.reviews && product.reviews.length > 0 && (
          <View className="mt-10">
            <Text className="text-lg font-bold text-brand-pink-900 mb-4">User Reviews</Text>
            {product.reviews.slice(0, 5).map((review) => (
              <View key={review.id} className="mb-4 bg-white p-4 rounded-2xl border border-brand-pink-100 shadow-sm">
                <View className="flex-row justify-between items-center mb-2">
                  <View className="flex-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons
                        key={star}
                        name={star <= review.scoreReview ? "star" : "star-outline"}
                        size={12}
                        color="#831843"
                      />
                    ))}
                  </View>
                  {/* USER NAME DISPLAYED HERE AS REQUESTED */}
                  <Text className="text-brand-pink-900/40 text-[10px] font-bold uppercase tracking-wider">
                    {(review as any).user?.name || "Anonymous"}
                  </Text>
                </View>
                <Text className="text-brand-pink-900/70 text-sm italic">
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
