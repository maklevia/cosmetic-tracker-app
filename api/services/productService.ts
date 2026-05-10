import apiClient from '../apiClient';
import { Product, CreateProductDto, UpdateProductDto, SourceStatus } from '../types/product';

export { Product, CreateProductDto, UpdateProductDto, SourceStatus };

const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  },

  getTrending: async (limit: number = 10): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products/trending', {
      params: { limit }
    });
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  search: async (query: string): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products/search', {
      params: { q: query },
    });
    return response.data;
  },

  create: async (productData: CreateProductDto): Promise<Product> => {
    const response = await apiClient.post<Product>('/products', productData);
    return response.data;
  },

  update: async (id: number, productData: UpdateProductDto): Promise<Product> => {
    const response = await apiClient.put<Product>(`/products/${id}`, productData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};

export default productService;
