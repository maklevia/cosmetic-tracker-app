import React from "react";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";

export const ForgotPasswordHeader = () => (
  <Center className="mb-4">
    <Box className="w-20 h-20 rounded-3xl bg-brand-pink-900 items-center justify-center shadow-lg shadow-brand-pink-900/20">
      <Ionicons name="key-outline" size={40} color="white" />
    </Box>
    <Heading size="3xl" className="text-brand-pink-900 mt-6 text-center">
      Reset Password
    </Heading>
    <Text className="text-brand-pink-900/60 mt-2 text-center">
      Enter your email and a new password
    </Text>
  </Center>
);
