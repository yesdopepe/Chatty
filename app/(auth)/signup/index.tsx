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
import { Button, ButtonText } from "@/components/ui/button";
import { Icon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { AlertTriangle } from "lucide-react-native";

export default function SignUpScreen() {
  const router = useRouter();
  const toast = useToast();
  const signUp = useAuthStore((state) => state.signUp);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await signUp(formData.email, formData.password, formData.username);
      router.replace("/(app)/chats");
    } catch (error: any) {
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast nativeID={id} action="error" variant="solid">
            <ToastTitle>Registration failed: {error.message}</ToastTitle>
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
          <Heading size="xl">Create Account</Heading>
          <Text size="sm" className="text-gray-500">
            Sign up to get started
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
                value={formData.email}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, email: text }))
                }
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

          <FormControl isInvalid={!!errors.username}>
            <FormControlLabel>
              <FormControlLabelText>Username</FormControlLabelText>
            </FormControlLabel>
            <Input size="md" className="h-12">
              <InputField
                placeholder="Choose a username"
                placeholderTextColor="$textLight500"
                value={formData.username}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, username: text }))
                }
                autoCapitalize="none"
                className="text-base px-3 py-2 leading-6"
              />
            </Input>
            {errors.username && (
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} />
                <FormControlErrorText>{errors.username}</FormControlErrorText>
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
                placeholder="Create a password"
                placeholderTextColor="$textLight500"
                value={formData.password}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, password: text }))
                }
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

          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormControlLabel>
              <FormControlLabelText>Confirm Password</FormControlLabelText>
            </FormControlLabel>
            <Input size="md" className="h-12">
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                placeholderTextColor="$textLight500"
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, confirmPassword: text }))
                }
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
            {errors.confirmPassword && (
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} />
                <FormControlErrorText>
                  {errors.confirmPassword}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        </VStack>

        <VStack space="md">
          <Button onPress={handleSignUp} disabled={loading}>
            <ButtonText>
              {loading ? "Creating Account..." : "Sign Up"}
            </ButtonText>
          </Button>

          <HStack className="justify-center" space="sm">
            <Text>Already have an account?</Text>
            <Link href="/(auth)/login">
              <LinkText>Sign In</LinkText>
            </Link>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
