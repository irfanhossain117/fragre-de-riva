export interface Variant {
  volume: string;
  price: number;
  stock: number;
}

export interface Product {
  _id: string;

  name: string;
  slug: string;

  brand: string;
  category: string;
  sku: string;

  description: string;

  topNotes: string;
  heartNotes: string;
  baseNotes: string;

  image: string;
  images: string[];

  variants: Variant[];

  totalStock: number;

  featured: boolean;
  bestSeller: boolean;
  isPublished: boolean;

  sortOrder: number;

  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];

  rating: number;
  reviews: number;

  createdBy?: string;

  createdAt?: string;
  updatedAt?: string;
}
  export interface ProductInput {
  name: string;
  slug: string;
  brand: string;
  category: string;
  sku?: string;

  description?: string;

  topNotes?: string;
  heartNotes?: string;
  baseNotes?: string;

  image?: string;
  images?: string[];

  variants: Variant[];

  featured?: boolean;
  bestSeller?: boolean;
 isPublished?: boolean;

  sortOrder?: number;

  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}
