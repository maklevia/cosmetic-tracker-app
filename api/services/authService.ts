import apiClient from '../apiClient';
import { LoginCredentials, SignupCredentials, AuthResponse, User } from '../types/auth';

export { LoginCredentials, SignupCredentials, AuthResponse, User };

const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<any>('/users/login', credentials);
      const { user, token } = response.data;
      return {
        user: {
          ...user,
          avatarUrl: user.avatarUrl || user.avatar_url,
          appTheme: user.appTheme || user.app_theme,
          appLang: user.appLang || user.app_lang,
          createdAt: user.createdAt || user.created_at,
        },
        token
      };
    } catch (error) {
      console.log("AuthService Login Handled Error:", error);
      throw error;
    }
  },

  register: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<any>('/users/register', credentials);
      const { user, token } = response.data;
      return {
        user: {
          ...user,
          avatarUrl: user.avatarUrl || user.avatar_url,
          appTheme: user.appTheme || user.app_theme,
          appLang: user.appLang || user.app_lang,
          createdAt: user.createdAt || user.created_at,
        },
        token
      };
    } catch (error) {
      console.log("AuthService Register Handled Error:", error);
      throw error;
    }
  },

  resetPassword: async (email: string, newPassword: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<{ message: string }>('/users/reset-password', { email, newPassword });
      return response.data;
    } catch (error) {
      console.log("AuthService Reset Handled Error:", error);
      throw error;
    }
  },
};

export default authService;
