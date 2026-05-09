import React, { useState } from "react";
import { 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  View
} from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { 
  FormControl, 
  FormControlLabel, 
  FormControlLabelText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText
} from "@/components/ui/form-control";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "./components/Header";
import authService from "@/api/services/authService";
import { getUser } from "@/utils/storage";

export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [errors, setErrors] = useState<{
    old?: string;
    mismatch?: string;
    general?: string;
  }>({});

  const router = useRouter();

  const handleChangePassword = async () => {
    const newErrors: any = {};
    const user = getUser();

    if (!user) {
      Alert.alert("Error", "User not found");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      newErrors.mismatch = "Passwords do not match";
    }

    if (newPassword.length < 6) {
      newErrors.general = "New password must be at least 6 characters long";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        await authService.resetPassword(user.email, newPassword);
        
        Alert.alert(
          "Success", 
          "Your password has been changed successfully.",
          [{ text: "OK", onPress: () => router.back() }]
        );
      } catch (error: any) {
        console.error("Failed to change password:", error);
        Alert.alert("Error", error.response?.data?.message || "Failed to change password");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-brand-pink-50"
    >
      <Header />
      
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack className="p-6" space="xl">
          {/* Current Password */}
          <FormControl isInvalid={!!errors.old}>
            <FormControlLabel>
              <FormControlLabelText className="text-brand-pink-900 font-bold">Current Password</FormControlLabelText>
            </FormControlLabel>
            <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
              <InputField 
                type={showOld ? "text" : "password"}
                placeholder="Enter current password" 
                value={oldPassword}
                onChangeText={setOldPassword}
                className="text-brand-pink-900"
              />
              <InputSlot className="pr-4" onPress={() => setShowOld(!showOld)}>
                <Ionicons name={showOld ? "eye-off-outline" : "eye-outline"} size={20} color="#831843" />
              </InputSlot>
            </Input>
            {errors.old && (
              <FormControlError>
                <FormControlErrorIcon as={() => <Ionicons name="alert-circle-outline" size={16} color="#ef4444" />} />
                <FormControlErrorText className="text-red-500 ml-1">{errors.old}</FormControlErrorText>
              </FormControlError>
            )}
            <TouchableOpacity 
              className="mt-2 self-end"
              onPress={() => router.push("/forgot-password")}
            >
              <Text className="text-brand-pink-900 font-bold text-xs">Forgot Password?</Text>
            </TouchableOpacity>
          </FormControl>

          {/* New Password */}
          <FormControl isInvalid={!!errors.general || !!errors.mismatch}>
            <FormControlLabel>
              <FormControlLabelText className="text-brand-pink-900 font-bold">New Password</FormControlLabelText>
            </FormControlLabel>
            <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
              <InputField 
                type={showNew ? "text" : "password"}
                placeholder="Enter new password" 
                value={newPassword}
                onChangeText={setNewPassword}
                className="text-brand-pink-900"
              />
              <InputSlot className="pr-4" onPress={() => setShowNew(!showNew)}>
                <Ionicons name={showNew ? "eye-off-outline" : "eye-outline"} size={20} color="#831843" />
              </InputSlot>
            </Input>
            {errors.general && (
              <FormControlError>
                <FormControlErrorIcon as={() => <Ionicons name="alert-circle-outline" size={16} color="#ef4444" />} />
                <FormControlErrorText className="text-red-500 ml-1">{errors.general}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* Confirm Password */}
          <FormControl isInvalid={!!errors.mismatch}>
            <FormControlLabel>
              <FormControlLabelText className="text-brand-pink-900 font-bold">Confirm New Password</FormControlLabelText>
            </FormControlLabel>
            <Input className="bg-white border-brand-pink-100 rounded-2xl h-12">
              <InputField 
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat new password" 
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className="text-brand-pink-900"
              />
              <InputSlot className="pr-4" onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons name={showConfirm ? "eye-off-outline" : "eye-outline"} size={20} color="#831843" />
              </InputSlot>
            </Input>
            {errors.mismatch && (
              <FormControlError>
                <FormControlErrorIcon as={() => <Ionicons name="alert-circle-outline" size={16} color="#ef4444" />} />
                <FormControlErrorText className="text-red-500 ml-1">{errors.mismatch}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <Button 
            onPress={handleChangePassword}
            isDisabled={isLoading}
            className={`bg-brand-pink-900 h-14 rounded-2xl shadow-lg shadow-brand-pink-900/20 mt-6 ${isLoading ? 'opacity-70' : ''}`}
          >
            <ButtonText className="text-white font-bold text-lg">
              {isLoading ? "Changing..." : "Change Password"}
            </ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
