import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CollectionItem } from "@/api/services/collectionService";
import { getFullImageUrl } from "@/api/apiClient";
import { calculateExpirationDate, formatDate } from "@/utils/date";
import { getDisplayData } from "@/utils/display";

export const CollectionCard = ({ item }: { item: CollectionItem }) => {
  const router = useRouter();
  const displayData = getDisplayData(item);
  const imageUrl = getFullImageUrl(displayData.imageUrl);
  
  const openedDate = formatDate(item.openedDate);
  const expirationDate = calculateExpirationDate(item.openedDate, item.pao);

  const handleEditPress = (e: any) => {
    e.stopPropagation(); // Prevent opening details modal
    router.push({
      pathname: "/edit-product",
      params: { id: item.productId, collectionItemId: item.id }
    });
  };

  const getArchiveStatus = () => {
    if (item.itemStatus !== 'archived') return null;
    
    if (item.archiveReason === 'ran_out') return "Ran out of product";
    
    if (item.archiveReason === 'expired') {
      switch (item.expiryRelation) {
        case 'before': return "Expired before date";
        case 'after': return "Expired after date";
        case 'in_time': return "Expired in time";
        default: return "Expired";
      }
    }
    return "Archived";
  };

  const archiveStatus = getArchiveStatus();

  return (
    <View className="mb-4 bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-pink-100 flex-row">
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          contentFit="cover"
          style={{ width: 100, height: 100 }}
        />
      ) : (
        <View 
          style={{ width: 100, height: 100 }} 
          className="bg-brand-pink-100/20 items-center justify-center border-r border-brand-pink-100"
        >
          <Ionicons name="camera-outline" size={32} color="#83184340" />
        </View>
      )}
      
      <View className="flex-1 p-3 justify-between">
        <View>
          <Text className="text-[10px] font-medium text-brand-pink-900/60 uppercase tracking-wider">
            {displayData.brand}
          </Text>
          <Text className="text-base font-bold text-brand-pink-900" numberOfLines={1}>
            {displayData.title}
          </Text>
          {openedDate && (
            <Text className="text-[10px] text-brand-pink-900/40 mt-1">
              Opened: {openedDate}
            </Text>
          )}
          {expirationDate && (
            <Text className="text-[10px] text-brand-pink-900/60 mt-0.5">
              Exp: {expirationDate}
            </Text>
          )}
          {archiveStatus && (
            <Text className="text-[10px] text-rose-500 font-bold mt-1">
              {archiveStatus}
            </Text>
          )}
        </View>
        
        <Pressable 
          className="absolute top-2 right-2 p-1"
          onPress={handleEditPress}
        >
          <Ionicons name="create-outline" size={18} color="#831843" />
        </Pressable>
      </View>
    </View>
  );
};

export default CollectionCard;
