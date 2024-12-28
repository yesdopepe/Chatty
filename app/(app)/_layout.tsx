import { Stack } from "expo-router";
import { useAuthStore } from "../../store/auth";
import { Redirect } from "expo-router";

export default function AppLayout() {
  const access_token = useAuthStore((state) => state.access_token);

  // If user is not authenticated, redirect to login
  if (!access_token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="chats"
        options={{
          title: "Chats",
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
