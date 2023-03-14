type ModelDef = {
  _id?: string;
  name: string;
  price: number;
  promotion: number;
  images: string;
};

type TierVariation = {
  name: string;
  options: string[];
  images: string[] | null;
};

type ItemRating = {
  rating_count: number[];
  rating_star: number;
};

export type ProductDef = {
  _id?: string;
  category_id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  thumb_url: string;
  models: ModelDef[];
  price_before_discount: number;
  price_max: number;
  price_max_before_discount: number;
  price_min: number;
  price_min_before_discount: number;
  raw_discount: number;
  tier_variations: TierVariation[];
  item_rating: ItemRating;
};

export type GetProductsParams = {
  keyword?: string;
  limit?: number;
  type?: string;
};

export type GetProductsResponse = {
  data: ProductDef[];
  page: number;
  limit: number;
  totalPage: number;
};
