import { products, ProductModel } from "./../../features/product/model/product.model";
import { auth, AuthModel } from "app/features/auth/auth";
import { toast, ToastModel } from "app/features/app/toast/toast.model";

export interface StoreModel {
  auth: AuthModel;
  toast: ToastModel;
  products: ProductModel;
}

const model: StoreModel = {
  auth,
  toast,
  products
};

export default model;
