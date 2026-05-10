import apiClient from '../apiClient';

export interface Review {
  id: number;
  productId: number;
  userId: number;
  scoreReview: number;
  textReview?: string;
  createdAt: string;
}

const reviewService = {
  getByProduct: async (productId: number): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>(`/reviews/product/${productId}`);
    return response.data;
  },

  create: async (data: { productId: number; rating: number; comment?: string }): Promise<Review> => {
    const response = await apiClient.post<Review>('/reviews', {
      productId: data.productId,
      scoreReview: data.rating,
      textReview: data.comment
    });
    return response.data;
  },

  update: async (id: number, data: { rating: number; comment?: string }): Promise<Review> => {
    const response = await apiClient.put<Review>(`/reviews/${id}`, {
      scoreReview: data.rating,
      textReview: data.comment
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/reviews/${id}`);
  },
};

export default reviewService;
