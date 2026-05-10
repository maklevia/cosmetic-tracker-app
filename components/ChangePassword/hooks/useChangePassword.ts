import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import userService from "@/api/services/userService";
import { getUser } from "@/utils/storage";
import { ChangePasswordFormData, ChangePasswordErrors, ChangePasswordHookData } from "../typedefs";

export const useChangePassword = (): ChangePasswordHookData => {
  const [formData, setFormData] = useState<ChangePasswordFormData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ChangePasswordErrors>({});

  const router = useRouter();

  const handleChangePassword = useCallback(async () => {
    const { oldPassword, newPassword, confirmPassword } = formData;
    const newErrors: ChangePasswordErrors = {};
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
        await userService.changePassword(oldPassword, newPassword);
        
        Alert.alert(
          "Success", 
          "Your password has been changed successfully.",
          [{ text: "OK", onPress: () => router.back() }]
        );
      } catch (error: any) {
        console.log("Change component handled error:", error.message);
        
        if (error.response?.data?.message === "Incorrect current password") {
            setErrors({ old: "Current password is incorrect" });
        } else {
            Alert.alert("Error", error.response?.data?.message || "Failed to change password");
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [formData, router]);

  return {
    formData,
    setFormData,
    showOld,
    setShowOld,
    showNew,
    setShowNew,
    showConfirm,
    setShowConfirm,
    isLoading,
    errors,
    handleChangePassword
  };
};
