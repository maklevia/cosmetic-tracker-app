import apiClient from '../apiClient';
import { User } from '../types/auth';

const userService = {
  getProfile: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/profile/${id}`);
    return response.data;
  },

  updateName: async (name: string): Promise<User> => {
    const response = await apiClient.put<User>('/users/update-name', { name });
    return response.data;
  },

  updateAvatar: async (imageId: number): Promise<User> => {
    const response = await apiClient.put<User>('/users/update-avatar', { imageId });
    return response.data;
  },

  updateTheme: async (appTheme: string): Promise<User> => {
    const response = await apiClient.put<User>('/users/update-theme', { appTheme });
    return response.data;
  },

  updateLanguage: async (appLang: string): Promise<User> => {
    const response = await apiClient.put<User>('/users/update-language', { appLang });
    return response.data;
  },

  deleteAccount: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};

export default userService;
