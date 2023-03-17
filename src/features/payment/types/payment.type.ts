import { CreateOrderParams } from "app/features/cart/types/cart.type";

export type PurchaseProductParams = {
  user_id: string;
  product_id: string;
  model_id: string;
  promotion_code: string | null;
  cart_id: string | null;
  amount: number
}[];
