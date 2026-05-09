import apiClient from '../apiClient';
import { LoginCredentials, SignupCredentials, AuthResponse, User } from '../types/auth';

export { LoginCredentials, SignupCredentials, AuthResponse, User };

const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/users/login', credentials);
    return response.data;
  },

  register: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/users/register', credentials);
    return response.data;
  },

  resetPassword: async (email: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/users/reset-password', { email, newPassword });
    return response.data;
  },
};

export default authService;
