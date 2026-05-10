import apiClient from '../apiClient';

export interface CollectionItem {
  id: number;
  productId: number;
  userId: number;
  userAddedTitle?: string | null;
  userAddedDescription?: string | null;
  userAddedImageId?: number | null;
  openedDate?: string;
  actualExpirationDate?: string;
  pao?: number;
  itemStatus: 'active' | 'archived';
  archiveReason?: 'expired' | 'ran_out' | null;
  expiryRelation?: 'in_time' | 'before' | 'after' | null;
  notes?: string;
  product: {
    id: number;
    title: string;
    brand: string;
    description: string;
    sourceStatus: string;
    image?: {
      url: string;
      path: string;
    };
  };
  customImage?: {
    id: number;
    url: string;
    path: string;
  } | null;
}

const collectionService = {
  getByUser: async (status?: 'active' | 'archived'): Promise<CollectionItem[]> => {
    const response = await apiClient.get<CollectionItem[]>('/collection', {
      params: { status }
    });
    return response.data;
  },

  getDashboard: async (): Promise<{ soonToExpire: CollectionItem[] }> => {
    const response = await apiClient.get<{ soonToExpire: CollectionItem[] }>('/collection/dashboard');
    return response.data;
  },

  search: async (query: string): Promise<CollectionItem[]> => {
    const response = await apiClient.get<CollectionItem[]>('/collection/search', {
      params: { q: query },
    });
    return response.data;
  },

  add: async (data: { productId: number; openedDate?: string; actualExpirationDate?: string; pao?: number; userAddedTitle?: string; userAddedDescription?: string; userAddedImageId?: number }): Promise<CollectionItem> => {
    const response = await apiClient.post<CollectionItem>('/collection', data);
    return response.data;
  },

  update: async (id: number, data: Partial<CollectionItem>): Promise<CollectionItem> => {
    const response = await apiClient.put<CollectionItem>(`/collection/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/collection/${id}`);
  },
};

export default collectionService;
