import { products, ProductModel } from "./../../features/product/model/product.model";
import { auth, AuthModel } from "app/features/auth/auth";
import { toast, ToastModel } from "app/features/app/toast/toast.model";
import { cart, CartModel } from "app/features/cart/model/cart.model";

export interface StoreModel {
  auth: AuthModel;
  toast: ToastModel;
  products: ProductModel;
  cart: CartModel;
}

const model: StoreModel = {
  auth,
  toast,
  products,
  cart
};

export default model;
