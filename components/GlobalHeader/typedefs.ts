import { CollectionItem } from "@/api/services/collectionService";
import { LayoutChangeEvent } from "react-native";

export interface SearchBarHookData {
  query: string;
  setQuery: (query: string) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  results: CollectionItem[];
  isLoading: boolean;
  xOffset: number;
  searchInputRef: React.RefObject<any>;
  handleSelect: (item: CollectionItem) => void;
  handleDismiss: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
  showOverlay: boolean;
}
