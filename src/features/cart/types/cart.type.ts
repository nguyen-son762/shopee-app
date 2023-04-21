import { AuthDef } from "app/features/auth/types/auth.type";
import { ProductDef } from "app/features/product/types/product.type";
import { OrderStatusEnums } from "../constants/cart.constants";

export type CartItemDef = {
  _id: string;
  user: AuthDef;
  product: ProductDef;
  model: string;
  phonenumber: string;
  address: string;
  promotion_code: string | null;
  note: string;
  status: OrderStatusEnums;
};

export type CreateOrderParams = {
  user?: string;
  product: string;
  model: string;
  promotion_code?: string;
  amount: number;
};

export type CartResponseDef = {
  _id: string;
  address: string;
  amount: number;
  model: string;
  note: string;
  phonenumber: string;
  product: ProductDef;
  promotion_code: string;
  status: OrderStatusEnums;
  user: string;
};

export type GetCartResponse = CartResponseDef[];

export type UpdateStatusParams = {
  order_id: string
  status: OrderStatusEnums
  user_id: string
}

