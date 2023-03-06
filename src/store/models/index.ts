import { auth, AuthModel } from "app/features/auth/auth";
import { toast, ToastModel } from "app/features/app/toast/toast.model";

export interface StoreModel {
  auth: AuthModel;
  toast: ToastModel;
}

const model: StoreModel = {
  auth,
  toast
};

export default model;
