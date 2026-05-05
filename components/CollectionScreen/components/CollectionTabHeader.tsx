import React from "react";
import { View, Text, Pressable } from "react-native";

interface Tab {
  id: number;
  title: string;
  count: number;
}

interface CollectionTabHeaderProps {
  tabs: Tab[];
  activeTab: number;
  onTabPress: (index: number) => void;
}

export const CollectionTabHeader = ({ tabs, activeTab, onTabPress }: CollectionTabHeaderProps) => {
  return (
    <View className="flex-row justify-center border-b border-brand-pink-100 bg-brand-pink-50 pt-4">
      {tabs.map((tab, index) => (
        <Pressable 
          key={tab.id}
          onPress={() => onTabPress(index)}
          className={`pb-3 mx-4 border-b-2 ${activeTab === index ? 'border-brand-pink-900' : 'border-transparent'}`}
        >
          <Text className={`font-bold ${activeTab === index ? 'text-brand-pink-900' : 'text-brand-pink-900/40'}`}>
            {tab.title} ({tab.count})
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default CollectionTabHeader;
