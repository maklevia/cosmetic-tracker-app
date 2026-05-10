import React from "react";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";

export const SignupHeader = () => (
  <Center className="mb-4">
    <Heading size="3xl" className="text-brand-pink-900 mt-6 text-center">
      Create Account
    </Heading>
  </Center>
);

export default SignupHeader;
