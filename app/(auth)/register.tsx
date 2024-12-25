import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth';
import { Link, router } from 'expo-router';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const signUp = useAuthStore((state) => state.signUp);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await signUp(email, password, username);
      router.replace('/(app)/chats');
    } catch (error) {
      console.error(error);
      // TODO: Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-4">
        <Text variant="headlineMedium" className="text-center mb-6">
          Create Account
        </Text>
        
        <TextInput
          mode="outlined"
          label="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          className="mb-4"
        />

        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="mb-4"
        />
        
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="mb-6"
        />

        <Button
          mode="contained"
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
          className="mb-4"
        >
          Register
        </Button>

        <View className="flex-row justify-center">
          <Text variant="bodyMedium">Already have an account? </Text>
          <Link href="/login" asChild>
            <Text variant="bodyMedium" className="text-blue-500">
              Login
            </Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
