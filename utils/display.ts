import { CollectionItem } from "@/api/services/collectionService";
import { Product } from "@/api/services/productService";

export interface DisplayData {
  title: string;
  brand: string;
  description: string;
  imageUrl: string | null;
}

export const getDisplayData = (item: CollectionItem): DisplayData => {
  const product = item.product;
  
  return {
    title: item.userAddedTitle || product.title,
    brand: product.brand,
    description: item.userAddedDescription || product.description,
    imageUrl: item.customImage?.path || product.image?.path || product.image?.url || null,
  };
};

export const getGlobalDisplayData = (product: Product): DisplayData => {
  return {
    title: product.title,
    brand: product.brand,
    description: product.description,
    imageUrl: product.image?.path || product.image?.url || null,
  };
};
