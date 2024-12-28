import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import axios, { AxiosError } from "axios";
import Constants from "expo-constants";

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  access_token: string | null;
  isLoading: boolean;
  setToken: (token: string | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    username: string
  ) => Promise<{ user: User; access_token: string }>;
  signOut: () => Promise<void>;
}

const API_URL = Constants.expoConfig?.extra?.API_URL;

if (!API_URL) {
  console.error(
    "API_URL is not configured. Please check your environment variables."
  );
}

// Add base URL to axios
axios.defaults.baseURL = API_URL;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  access_token: null,
  isLoading: false,

  setToken: (access_token: string | null) => {
    set({ access_token });
    if (access_token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      // TODO: Fetch user data from API using token
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      const { user, access_token } = response.data;
      await SecureStore.setItemAsync("token", access_token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      set({ user, access_token });
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;
        throw typeof message === "string" ? message : "Failed to sign in";
      }
      throw "An unexpected error occurred";
    }
  },

  signUp: async (email: string, password: string, username: string) => {
    try {
      const response = await axios.post("/auth/register", {
        email,
        password,
        username,
      });

      const { user, access_token } = response.data;

      if (!access_token || !user) {
        throw new Error("Invalid response from server");
      }

      await SecureStore.setItemAsync("token", access_token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      set({ user, access_token });
      return { user, access_token };
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;
        throw typeof message === "string" ? message : "Failed to sign up";
      }
      throw "An unexpected error occurred";
    }
  },

  signOut: async () => {
    try {
      await axios.post("/auth/logout");
      await SecureStore.deleteItemAsync("token");
      delete axios.defaults.headers.common["Authorization"];
      set({ user: null, access_token: null });
    } catch (error) {
      // Even if logout fails on server, clear local state
      await SecureStore.deleteItemAsync("token");
      delete axios.defaults.headers.common["Authorization"];
      set({ user: null, access_token: null });
      throw "Failed to logout properly";
    }
  },
}));
