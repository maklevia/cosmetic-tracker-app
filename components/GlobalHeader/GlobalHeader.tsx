import React from "react";
import { View } from "react-native";
import { ProfileButton } from "./components/ProfileButton";
import { SearchBar } from "./components/SearchBar";

export const GlobalHeader = () => {
  return (
    <View className="flex-row items-center px-6 py-2 bg-brand-pink-50">
      <ProfileButton />
      <SearchBar />
    </View>
  );
};
