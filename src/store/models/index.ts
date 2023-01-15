import { auth, AuthModel } from "app/features/auth/auth";

export interface StoreModel {
  auth: AuthModel;
}

const model: StoreModel = {
  auth
};

export default model;
