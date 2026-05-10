import axios from 'axios';
import Constants from 'expo-constants';
import { getToken } from '@/utils/storage';

/**
 * Dynamically resolves the computer's IP address when running in Expo Go.
 */
const getBackendBaseUrl = () => {
  // Constants.expoConfig.hostUri is typically "192.168.1.102:8081"
  const debuggerHost = Constants.expoConfig?.hostUri;
  const address = debuggerHost?.split(':')[0];
  
  if (!address) {
    console.log("Could not detect debugger host, falling back to localhost");
    return 'http://localhost:3000';
  }

  return `http://${address}:3000`;
};

export const FILE_BASE_URL = getBackendBaseUrl();
export const BASE_URL = `${FILE_BASE_URL}/api`;

console.log("🚀 Resolved API Base URL:", BASE_URL);

// eslint-disable-next-line import/no-named-as-default-member
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFullImageUrl = (path: string | null | undefined) => {
  if (!path) {
    console.log("Image path is empty");
    return null;
  }
  
  if (path.startsWith('http')) {
    console.log("Using absolute URL:", path);
    return path;
  }
  
  const fullUrl = `${FILE_BASE_URL}/${path}`;
  console.log("Resolving Relative Image URL:", fullUrl);
  return fullUrl;
};

// Interceptor to add auth token to requests
apiClient.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
