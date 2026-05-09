import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type ArchiveReason = 'expired' | 'ran_out';
export type ExpiryRelation = 'in_time' | 'before' | 'after';

interface ProductActionsProps {
  onArchive: (reason: ArchiveReason, relation?: ExpiryRelation) => void;
  onUnarchive: () => void;
  onDelete: () => void;
  isArchived?: boolean;
}

enum ArchiveStep {
  MAIN,
  EXPIRED_OPTIONS
}

export const ProductActions = ({ onArchive, onUnarchive, onDelete, isArchived }: ProductActionsProps) => {
  const [showArchiveOptions, setShowArchiveOptions] = useState(false);
  const [step, setStep] = useState<ArchiveStep>(ArchiveStep.MAIN);

  const handleDeletePress = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ]
    );
  };

  const handleBack = () => {
    setStep(ArchiveStep.MAIN);
  };

  if (isArchived) {
    return (
      <View className="mt-2">
        <TouchableOpacity 
          onPress={onUnarchive}
          className="bg-white border border-brand-pink-900/20 py-4 rounded-2xl items-center flex-row justify-center mb-4"
        >
          <Ionicons name="refresh-outline" size={20} color="#831843" style={{ marginRight: 8 }} />
          <Text className="text-brand-pink-900 font-bold text-lg">Move out of archive</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleDeletePress}
          className="py-4 items-center flex-row justify-center mb-10"
        >
          <Ionicons name="trash-outline" size={20} color="#ef4444" style={{ marginRight: 8 }} />
          <Text className="text-red-500 font-bold text-lg">Delete product</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showArchiveOptions) {
    if (step === ArchiveStep.EXPIRED_OPTIONS) {
      return (
        <View className="mt-2">
          <Text className="text-brand-pink-900 font-bold mb-4 text-center">Did it expire...</Text>
          
          <TouchableOpacity 
            onPress={() => onArchive('expired', 'in_time')}
            className="bg-white border border-brand-pink-100 py-4 rounded-2xl items-center mb-3"
          >
            <Text className="text-brand-pink-900 font-bold">In time</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => onArchive('expired', 'before')}
            className="bg-white border border-brand-pink-100 py-4 rounded-2xl items-center mb-3"
          >
            <Text className="text-brand-pink-900 font-bold">Before estimated date</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => onArchive('expired', 'after')}
            className="bg-white border border-brand-pink-100 py-4 rounded-2xl items-center mb-3"
          >
            <Text className="text-brand-pink-900 font-bold">After estimated date</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleBack}
            className="py-3 items-center flex-row justify-center"
          >
            <Ionicons name="chevron-back" size={16} color="#831843" style={{ marginRight: 4 }} />
            <Text className="text-brand-pink-900/60 font-bold">Back</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View className="mt-2">
        <Text className="text-brand-pink-900 font-bold mb-4 text-center">Why are you archiving this?</Text>
        
        <TouchableOpacity 
          onPress={() => onArchive('ran_out')}
          className="bg-white border border-brand-pink-100 py-4 rounded-2xl items-center mb-3"
        >
          <Text className="text-brand-pink-900 font-bold">Ran out of product</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setStep(ArchiveStep.EXPIRED_OPTIONS)}
          className="bg-white border border-brand-pink-100 py-4 rounded-2xl items-center mb-3"
        >
          <Text className="text-brand-pink-900 font-bold">Product expired</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setShowArchiveOptions(false)}
          className="py-3 items-center"
        >
          <Text className="text-brand-pink-900/60 font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="mt-2">
      <TouchableOpacity 
        onPress={() => setShowArchiveOptions(true)}
        className="bg-white border border-brand-pink-900/20 py-4 rounded-2xl items-center flex-row justify-center mb-4"
      >
        <Ionicons name="archive-outline" size={20} color="#831843" style={{ marginRight: 8 }} />
        <Text className="text-brand-pink-900 font-bold text-lg">Move to Archive</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={handleDeletePress}
        className="py-4 items-center flex-row justify-center mb-10"
      >
        <Ionicons name="trash-outline" size={20} color="#ef4444" style={{ marginRight: 8 }} />
        <Text className="text-red-500 font-bold text-lg">Delete product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductActions;
