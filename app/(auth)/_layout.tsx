import { Stack } from 'expo-router';
import { useAuthStore } from '../../store/auth';
import { useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function AuthLayout() {
  const token = useAuthStore((state) => state.token);

  // If user is authenticated, redirect to main app
  if (token) {
    return <Redirect href="/(app)/chats" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}