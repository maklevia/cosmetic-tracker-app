import apiClient from '../apiClient';

export interface Image {
  id: number;
  url: string;
  type: 'profile' | 'product';
}

const imageService = {
  upload: async (fileUri: string, type: 'profile' | 'product'): Promise<Image> => {
    const formData = new FormData();
    const fileName = fileUri.split('/').pop() || 'image.jpg';
    
    // @ts-ignore - FormData expects a specific object for files in React Native
    formData.append('image', {
      uri: fileUri,
      name: fileName,
      type: 'image/jpeg',
    });
    formData.append('type', type);

    const response = await apiClient.post<Image>(`/images/upload?type=${type}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default imageService;
