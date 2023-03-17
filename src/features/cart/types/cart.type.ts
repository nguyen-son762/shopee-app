import { AuthDef } from "app/features/auth/types/auth.type";
import { ModelDef, ProductDef } from "app/features/product/types/product.type";
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
  user_id: string;
  product_id: string;
  model_id: string;
  promotion_code: string | null;
};
