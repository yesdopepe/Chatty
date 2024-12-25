import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/auth';

export default function Index() {
  const token = useAuthStore((state) => state.token);
  
  // Redirect based on authentication status
  return <Redirect href={token ? "/(app)/chats" : "/(auth)/login"} />;
}
