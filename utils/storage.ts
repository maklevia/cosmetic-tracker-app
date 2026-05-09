import AsyncStorage from '@react-native-async-storage/async-storage';

let token: string | null = null;
let user: any | null = null;

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const initStorage = async () => {
  try {
    token = await AsyncStorage.getItem(TOKEN_KEY);
    const userJson = await AsyncStorage.getItem(USER_KEY);
    user = userJson ? JSON.parse(userJson) : null;
    console.log("Storage initialized. User logged in:", !!token);
  } catch (error) {
    console.error("Failed to initialize storage:", error);
  }
};

export const setToken = async (newToken: string | null) => {
  token = newToken;
  try {
    if (newToken) {
      await AsyncStorage.setItem(TOKEN_KEY, newToken);
    } else {
      await AsyncStorage.removeItem(TOKEN_KEY);
    }
  } catch (error) {
    console.error("Failed to save token:", error);
  }
};

export const getToken = () => {
  return token;
};

export const setUser = async (newUser: any | null) => {
  user = newUser;
  try {
    if (newUser) {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
    } else {
      await AsyncStorage.removeItem(USER_KEY);
    }
  } catch (error) {
    console.error("Failed to save user:", error);
  }
};

export const updateUserInStorage = async (updates: any) => {
  if (user) {
    user = { ...user, ...updates };
    await setUser(user);
  }
};

export const getUser = () => {
  return user;
};

export const clearAuth = async () => {
  token = null;
  user = null;
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  } catch (error) {
    console.error("Failed to clear storage:", error);
  }
};
