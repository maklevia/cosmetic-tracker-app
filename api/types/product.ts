export enum SourceStatus {
  PARSED = "parsed",
  ADDED_MANUALLY = "added_manually"
}

export interface Product {
  id: number;
  title: string;
  brand: string;
  description: string;
  sourceStatus: SourceStatus;
  averageScore: number;
  image?: {
    id: number;
    url: string;
  };
}

export interface CreateProductDto {
  title: string;
  brand: string;
  description: string;
  sourceStatus?: SourceStatus;
  imageId?: number;
}

export interface UpdateProductDto {
  title?: string;
  brand?: string;
  description?: string;
  imageId?: number;
}
