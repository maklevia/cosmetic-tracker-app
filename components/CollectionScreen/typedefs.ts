import { CollectionItem } from "@/api/services/collectionService";

export interface TabItem {
  id: number;
  title: string;
  count: number;
  data: CollectionItem[];
}

export interface CollectionHookData {
  items: CollectionItem[];
  isLoading: boolean;
  activeTab: number;
  setActiveTab: (index: number) => void;
  width: number;
  flatListRef: React.RefObject<any>;
  tabs: TabItem[];
  handleProductPress: (item: CollectionItem) => void;
  handleTabPress: (index: number) => void;
  onMomentumScrollEnd: (event: any) => void;
  getItemLayout: (data: any, index: number) => { length: number; offset: number; index: number };
}
