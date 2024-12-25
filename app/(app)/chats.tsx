import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAuthStore } from '../../store/auth';
import { router } from 'expo-router';

export default function ChatsScreen() {
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text variant="titleLarge" className="mb-4">
        Welcome, {user?.username}!
      </Text>
      
      <Text variant="bodyLarge" className="mb-4">
        Your chats will appear here.
      </Text>

      <Button mode="contained" onPress={handleSignOut}>
        Sign Out
      </Button>
    </View>
  );
}
