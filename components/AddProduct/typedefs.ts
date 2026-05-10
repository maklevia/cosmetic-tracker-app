import { Product } from "@/api/services/productService";

export enum Step {
  SEARCH,
  GLOBAL_PREVIEW,
  COLLECTION_DETAILS_FORM,
  MANUAL_FORM
}

export interface AddProductHookData {
  step: Step;
  setStep: (step: Step) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectProduct: (product: Product) => Promise<void>;
  isLoading: boolean;
  handleBack: () => void;
  handleAddToCollection: (data: any) => Promise<void>;
  getTitle: () => string;
}
