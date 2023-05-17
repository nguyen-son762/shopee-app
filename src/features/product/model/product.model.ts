import { Action, Thunk, action, thunk } from "easy-peasy";
import { ProductDef, GetProductsParams, GetProductsResponse } from "./../types/product.type";
import { getProducts } from "../api/product.api";
export interface ProductModel {
  products: ProductDef[];
  page: number;
  totalPage: number;
  set: Action<ProductModel, GetProductsResponse>;
  setProductsBySearch: Action<ProductModel, GetProductsResponse>;
  getProducts: Thunk<ProductModel, GetProductsParams>;
  getProductsBySearch: Thunk<ProductModel, GetProductsParams>;
  productsBySearch: ProductDef[];
  pageBySearch: number;
  totalPageBySearch: number;
  reset: Action<ProductModel>;
  resetBySearch: Action<ProductModel>;
}

const initialState = {
  products: [],
  page: 1,
  totalPage: 1,
  productsBySearch: [],
  pageBySearch: 1,
  totalPageBySearch: 1
};

export const products: ProductModel = {
  ...initialState,
  set: action((state, payload) => {
    if (payload) {
      if(state.page === 1 ){
        state.products= []
      }
      if (state.products.length > 0) {
        state.products = [...state.products, ...payload.data];
      } else {
        state.products = payload.data;
      }
      state.page = payload.page;
      state.totalPage = payload.totalPage;
    }
  }),
  setProductsBySearch: action((state, payload) => {
    if (payload) {
      if (state.productsBySearch.length > 0) {
        state.productsBySearch = [...state.productsBySearch, ...payload.data];
      } else {
        state.productsBySearch = payload.data;
      }
      state.pageBySearch = payload.page;
      state.totalPageBySearch = payload.totalPage;
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
  }),
  getProductsBySearch: thunk(async (actions, payload) => {
    try {
      const result = await getProducts(payload);
      actions.setProductsBySearch(result);
      return result;
    } catch (err) {
      console.log("err", err);
    }
  }),
  reset: action((state) => {
    state.products = [];
    state.page = 1;
    state.totalPage = 1;
  }),
  resetBySearch: action((state) => {
    state.productsBySearch = [];
    state.pageBySearch = 1;
    state.totalPageBySearch = 1;
  })
};
