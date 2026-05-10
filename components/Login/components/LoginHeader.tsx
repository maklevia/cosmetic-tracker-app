import React from "react";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";

export const LoginHeader = () => (
  <Center className="mb-4">
    <Box className="w-20 h-20 rounded-3xl bg-brand-pink-900 items-center justify-center shadow-lg shadow-brand-pink-900/20">
      <Ionicons name="color-filter" size={40} color="white" />
    </Box>
    <Heading size="3xl" className="text-brand-pink-900 mt-6 text-center">
      Welcome Back
    </Heading>
    <Text className="text-brand-pink-900/60 mt-2 text-center">
      Log in to track your cosmetics
    </Text>
  </Center>
);

export default LoginHeader;
