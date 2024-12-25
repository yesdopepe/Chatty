import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setToken: (token: string | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,

  setToken: (token: string | null) => {
    set({ token });
    if (token) {
      // TODO: Fetch user data from API using token
      set({ 
        user: { 
          id: '1', 
          email: 'user@example.com', 
          username: 'testuser' 
        } 
      });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      // TODO: Implement actual API call
      const mockResponse = {
        user: { id: '1', email, username: 'testuser' },
        token: 'mock-token'
      };

      await SecureStore.setItemAsync('token', mockResponse.token);
      set({ user: mockResponse.user, token: mockResponse.token });
    } catch (error) {
      throw error;
    }
  },

  signUp: async (email: string, password: string, username: string) => {
    try {
      // TODO: Implement actual API call
      const mockResponse = {
        user: { id: '1', email, username },
        token: 'mock-token'
      };

      await SecureStore.setItemAsync('token', mockResponse.token);
      set({ user: mockResponse.user, token: mockResponse.token });
    } catch (error) {
      throw error;
    }
  },

  signOut: async () => {
    await SecureStore.deleteItemAsync('token');
    set({ user: null, token: null });
  },
}));
