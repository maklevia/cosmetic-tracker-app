import { Product } from "@/api/services/productService";
import { CollectionItem } from "@/api/services/collectionService";
import { ArchiveReason, ExpiryRelation } from "./components/ProductActions";

export interface ItemDetailsProps {
  id?: string;
  collectionItemId?: string;
  initialProduct?: Product;
  initialCollectionItem?: CollectionItem | null;
}

export interface ItemDetailsHookData {
  product: Product | null;
  collectionItem: CollectionItem | null;
  isLoading: boolean;
  isArchived: boolean;
  isExpired: boolean;
  userReview: { stars: number; text: string } | undefined;
  displayData: {
    title: string;
    brand: string;
    description: string;
    imageUrl: string | null;
  } | null;
  imageUrl: string | null;
  archiveText: string | null;
  handleEditPress: () => void;
  handleArchive: (reason: ArchiveReason, relation?: ExpiryRelation) => Promise<void>;
  handleUnarchive: () => Promise<void>;
  handleDelete: () => Promise<void>;
  loadData: () => Promise<void>;
}
