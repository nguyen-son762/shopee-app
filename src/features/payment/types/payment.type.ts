import { OrderStatusEnums } from "./../../cart/constants/cart.constants";

export type PurchaseProductParams = {
  user?: string;
  product: string;
  model: string;
  promotion_code?: string;
  cart_id?: string;
  amount: number;
  note: string;
  status: OrderStatusEnums;
  phonenumber: string;
  address: string;
}[];
