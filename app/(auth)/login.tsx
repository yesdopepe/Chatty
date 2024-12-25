import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth';
import { Link } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const signIn = useAuthStore((state) => state.signIn);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn(email, password);
      // No need to navigate, auth layout will handle redirection
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
          Welcome Back
        </Text>
        
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
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          className="mb-4"
        >
          Login
        </Button>

        <View className="flex-row justify-center">
          <Text variant="bodyMedium">Don't have an account? </Text>
          <Link href="/register" asChild>
            <Text variant="bodyMedium" className="text-blue-500">
              Register
            </Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
