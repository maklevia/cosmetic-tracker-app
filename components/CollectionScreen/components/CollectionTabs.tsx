import React from "react";
import { View, FlatList, TouchableOpacity, useWindowDimensions } from "react-native";
import { CollectionCard } from "./CollectionCard";
import { CosmeticCard } from "../../MainScreen/typedefs";

interface TabItem {
  id: number;
  title: string;
  count: number;
  data: CosmeticCard[];
}

interface CollectionTabsProps {
  tabs: TabItem[];
  flatListRef: React.RefObject<any>; // Using any for the ref to avoid complex TS generic mismatches
  onMomentumScrollEnd: (event: any) => void;
  getItemLayout: (data: any, index: number) => { length: number; offset: number; index: number };
  onProductPress: (product: CosmeticCard) => void;
}

export const CollectionTabs = ({ 
  tabs, 
  flatListRef, 
  onMomentumScrollEnd, 
  getItemLayout, 
  onProductPress 
}: CollectionTabsProps) => {
  const { width } = useWindowDimensions();

  return (
    <FlatList
      ref={flatListRef}
      data={tabs}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={onMomentumScrollEnd}
      getItemLayout={getItemLayout}
      initialNumToRender={2}
      maxToRenderPerBatch={2}
      windowSize={3}
      removeClippedSubviews={false}
      renderItem={({ item }) => (
        <View style={{ width }}>
          <FlatList
            data={item.data}
            keyExtractor={(card) => card.id}
            renderItem={({ item: card }) => (
              <TouchableOpacity onPress={() => onProductPress(card)} activeOpacity={0.8}>
                <CollectionCard item={card} />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    />
  );
};

export default CollectionTabs;
