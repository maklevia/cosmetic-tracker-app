import axios from 'axios';
import { getToken } from '@/utils/storage';

// 1. For iOS Simulator: http://localhost:3000
// 2. For Android Emulator: http://10.0.2.2:3000
// 3. For Physical Device: http://YOUR_COMPUTER_IP:3000 (e.g., http://192.168.1.5:3000)

export const BASE_URL = 'http://192.168.1.102:3000/api';
export const FILE_BASE_URL = 'http://192.168.1.102:3000';

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
