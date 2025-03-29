export interface Product {
  id: number;
  name: string;
  category: "men" | "women";
  subcategory: string;
  price: number;
  discountPrice?: number;
  image: string;
  description: string;
  detailedDescription?: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  material?: string;
  dimensions?: string;
  careInstructions?: string;
}
