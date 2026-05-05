export interface CosmeticCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  expirationDate?: string;
  brand?: string;
  openedDate?: string;
  isArchived?: boolean;
  pao?: string;
  status?: 'parsed' | 'added_manually';
  averageRating?: number;
  globalReviews?: Array<{
    id: string;
    userName: string;
    stars: number;
    text: string;
    date: string;
  }>;
  review?: {
    stars: number;
    text: string;
  };
}
