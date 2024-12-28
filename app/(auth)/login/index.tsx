import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/auth";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { LinkText } from "@/components/ui/link";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Icon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { AlertTriangle } from "lucide-react-native";

export default function LoginScreen() {
  const router = useRouter();
  const toast = useToast();
  const signIn = useAuthStore((state) => state.signIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await signIn(email, password);
      router.replace("/(app)/chats");
    } catch (error) {
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast nativeID={id} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Login failed</ToastTitle>
              <Text size="sm" className="text-red-500">
                {error as string}
              </Text>
            </VStack>
          </Toast>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack className="flex-1 p-4 justify-center items-center" space="xl">
      <VStack className="w-full max-w-[400px]" space="xl">
        <VStack space="xs">
          <Heading size="xl">Welcome Back</Heading>
          <Text size="sm" className="text-gray-500">
            Sign in to continue
          </Text>
        </VStack>

        <VStack space="md">
          <FormControl isInvalid={!!errors.email}>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input size="md" className="h-12">
              <InputField
                placeholder="Enter your email"
                placeholderTextColor="$textLight500"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-base px-3 py-2 leading-6"
              />
            </Input>
            {errors.email && (
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} />
                <FormControlErrorText>{errors.email}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input size="md" className="h-12">
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                placeholderTextColor="$textLight500"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="text-base px-3 py-2 leading-6"
              />
              <InputSlot
                className="pr-3 h-full justify-center"
                onPress={() => setShowPassword(!showPassword)}
              >
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  size="lg"
                  className="text-gray-500"
                />
              </InputSlot>
            </Input>
            {errors.password && (
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} />
                <FormControlErrorText>{errors.password}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        </VStack>

        <VStack space="md">
          <Button onPress={handleLogin} disabled={loading}>
            <ButtonText>{loading ? "Signing in..." : "Sign In"}</ButtonText>
          </Button>

          <HStack className="justify-center" space="sm">
            <Text>Don't have an account?</Text>
            <Link href="/(auth)/signup">
              <LinkText>Sign Up</LinkText>
            </Link>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
