import { CollectionItem } from "@/api/services/collectionService";
import { Product } from "@/api/services/productService";

export type DashboardItem = CollectionItem | Product;

export interface MainScreenData {
  expiringProducts: CollectionItem[];
  trendingProducts: Product[];
  isLoading: boolean;
  loadData: (showLoading?: boolean) => Promise<void>;
}
