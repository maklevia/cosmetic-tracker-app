import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { ProductImage } from "@/components/ItemDetails/components/ProductImage";
import { ProductInfo } from "@/components/ItemDetails/components/ProductInfo";
import { CosmeticCard } from "@/components/MainScreen/typedefs";
import { Ionicons } from "@expo/vector-icons";

interface ProductPreviewProps {
  product: CosmeticCard;
  onAdd: () => void;
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
        {rating.toFixed(1)} / 5
      </Text>
    </View>
  );
};

export const ProductPreview = ({ product, onAdd }: ProductPreviewProps) => {
  return (
    <View className="flex-1">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 24 }}
      >
        <ProductImage imageUrl={product.imageUrl} />
        <ProductInfo brand={product.brand} title={product.title} />
        
        {/* Main Action Button moved up */}
        <TouchableOpacity 
          onPress={onAdd}
          className="mt-8 bg-brand-pink-900 py-4 rounded-2xl items-center shadow-lg shadow-brand-pink-900/20"
        >
          <Text className="text-white font-bold text-lg">Add to collection</Text>
        </TouchableOpacity>

        {/* Our users' ratings Section */}
        {product.averageRating && (
          <View className="mt-12 bg-brand-pink-100/20 p-4 rounded-2xl border border-brand-pink-100">
            <Text className="text-[10px] font-bold text-brand-pink-900/60 uppercase tracking-widest mb-2">
              Our users' ratings
            </Text>
            <GlobalStarRating rating={product.averageRating} />
          </View>
        )}

        {/* Global Reviews Section */}
        <View className="mt-8">
          <Text className="text-lg font-bold text-brand-pink-900 mb-4">
            User Reviews
          </Text>
          
          <View className="max-h-[300px] bg-white border border-brand-pink-100 rounded-3xl overflow-hidden shadow-sm">
            <ScrollView 
              nestedScrollEnabled={true}
              className="p-4"
              showsVerticalScrollIndicator={true}
            >
              {product.globalReviews && product.globalReviews.length > 0 ? (
                product.globalReviews.slice(-3).reverse().map((review, index, slicedArray) => (
                  <View key={review.id} className={`mb-4 ${index !== slicedArray.length - 1 ? 'border-b border-brand-pink-50 pb-4' : ''}`}>
                    <View className="flex-row justify-between items-center mb-1">
                      <Text className="font-bold text-brand-pink-900 text-sm">{review.userName}</Text>
                      <Text className="text-brand-pink-900/40 text-[10px]">{review.date}</Text>
                    </View>
                    <View className="flex-row mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Ionicons key={s} name={s <= review.stars ? "star" : "star-outline"} size={10} color="#831843" />
                      ))}
                    </View>
                    <Text className="text-brand-pink-900/70 text-xs leading-5">
                      "{review.text}"
                    </Text>
                  </View>
                ))
              ) : (
                <View className="py-10 items-center">
                  <Text className="text-brand-pink-900/40 italic text-sm">No reviews yet for this product.</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductPreview;
