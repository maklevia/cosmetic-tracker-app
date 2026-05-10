import React from "react";
import { View, ActivityIndicator } from "react-native";
import { CollectionTabHeader } from "./components/CollectionTabHeader";
import { CollectionTabs } from "./components/CollectionTabs";
import { GlobalHeader } from "../GlobalHeader/GlobalHeader";
import { useCollectionData } from "./hooks/useCollectionData";

export const CollectionScreen = () => {
  const {
    isLoading,
    activeTab,
    flatListRef,
    tabs,
    handleProductPress,
    handleTabPress,
    onMomentumScrollEnd,
    getItemLayout
  } = useCollectionData();

  return (
    <View className="flex-1 bg-brand-pink-50">
      <GlobalHeader />
      
      <CollectionTabHeader 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabPress={handleTabPress} 
      />
      
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#831843" />
        </View>
      ) : (
        <CollectionTabs 
          tabs={tabs}
          flatListRef={flatListRef}
          onMomentumScrollEnd={onMomentumScrollEnd}
          getItemLayout={getItemLayout}
          onProductPress={handleProductPress}
        />
      )}
    </View>
  );
};

export default CollectionScreen;
