import { Action, Thunk, action, thunk } from "easy-peasy";
import { ProductDef, GetProductsParams, GetProductsResponse } from "./../types/product.type";
import { getProducts } from "../api/product.api";
export interface ProductModel {
  products: ProductDef[];
  set: Action<ProductModel, Partial<GetProductsResponse>>;
  getProducts: Thunk<ProductModel, GetProductsParams>;
}

const initialState = {
  products: []
};

export const products: ProductModel = {
  ...initialState,
  set: action((state, payload) => {
    if (payload.data) {
      state.products = payload.data;
    }
  }),
  getProducts: thunk(async (actions, payload) => {
    try {
      const result = await getProducts(payload);
      actions.set(result);
      return result;
    } catch (err) {
      console.log("err", err);
    }
  })
};
