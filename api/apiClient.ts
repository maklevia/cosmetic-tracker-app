import axios from 'axios';
import { getToken } from '@/utils/storage';

// 1. For iOS Simulator: http://localhost:3000
// 2. For Android Emulator: http://10.0.2.2:3000
// 3. For Physical Device: http://YOUR_COMPUTER_IP:3000 (e.g., http://192.168.1.5:3000)

export const BASE_URL = 'http://192.168.1.102:3000/api';
export const FILE_BASE_URL = 'http://192.168.1.102:3000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFullImageUrl = (path: string | null | undefined) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  // If path is like 'uploads/profiles/xyz.jpg'
  return `${FILE_BASE_URL}/${path}`;
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
