import { Product } from "@/api/services/productService";
import { CollectionItem } from "@/api/services/collectionService";

export interface EditProductProps {
  id?: string;
  collectionItemId?: string;
  initialProduct?: Product;
  initialCollectionItem?: CollectionItem | null;
}

export interface EditProductFormData {
  imageUrl: string;
  brand: string;
  title: string;
  description: string;
  openedDate: string;
  pao: string;
}

export interface EditProductHookData {
  product: Product | null;
  collectionItem: CollectionItem | null;
  formData: EditProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<EditProductFormData>>;
  isLoading: boolean;
  canEditGlobalInfo: boolean;
  canEditLocalInfo: boolean;
  userReviewExists: boolean;
  handleSave: () => Promise<void>;
  handleAddReview: () => void;
}
