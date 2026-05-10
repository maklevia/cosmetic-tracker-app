export interface AddReviewProps {
  id?: string;
  initialRating?: number;
  initialText?: string;
  productId?: number;
  reviewId?: number;
}

export interface AddReviewHookData {
  rating: number;
  setRating: (rating: number) => void;
  text: string;
  setText: (text: string) => void;
  isLoading: boolean;
  productLoading: boolean;
  productTitle: string;
  handleSave: () => Promise<void>;
}
