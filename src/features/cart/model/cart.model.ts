import { AUTH_IN_ASYNC_STORAGE } from "./../../../constants/common.constants";
import { CreateOrderParams, GetCartResponse } from "app/features/cart/types/cart.type";
import { ModelDef, ProductDef } from "app/features/product/types/product.type";
import { Action, Thunk, action, thunk } from "easy-peasy";
import { createOrder, getCart } from "../api/cart.api";
import store from "app/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OrderStatusEnums } from "../constants/cart.constants";

export type CartDef = {
  _id?: string;
  item: ProductDef;
  amount: number;
  selected: boolean;
  model: ModelDef;
};

export interface CartModel {
  cart: CartDef[];
  set: Action<CartModel, CartDef[]>;
  get: Thunk<CartModel>;
  add: Thunk<CartModel, CreateOrderParams>;
  remove: Action<
    CartModel,
    {
      model_id: string;
    }
  >;
  update: Action<
    CartModel,
    {
      model_id: string;
      amount: number;
      selected: boolean;
    }[]
  >;
  increase: Action<
    CartModel,
    {
      model_id: string;
    }
  >;
  decrease: Action<
    CartModel,
    {
      model_id: string;
    }
  >;
}

const initialState = {
  cart: []
};

export const cart: CartModel = {
  ...initialState,
  get: thunk(async (actions) => {
    try {
      const userInAsyncStorage = await AsyncStorage.getItem(AUTH_IN_ASYNC_STORAGE);
      const parseUser = JSON.parse(userInAsyncStorage || "");
      const { user } = store.getState().auth;
      if (user?._id) {
        const data = await getCart(user._id || parseUser._id, OrderStatusEnums.INCART);
        const mappingData = ((data.data as GetCartResponse) || []).map((item) => {
          return {
            _id: item._id || "",
            item: item.product,
            amount: item.amount,
            selected: false,
            model: (item?.product?.models || []).find(
              (model: ModelDef) => model._id === item.model
            ) as ModelDef
          };
        });
        actions.set(mappingData);
      }
    } catch (err) {
      console.log("err", err);
    }
  }),
  set: action((state, payload) => {
    state.cart = [...payload];
  }),
  add: thunk(async (actions, payload) => {
    try {
      const result = await createOrder(payload);
    } catch (err) {
      console.log("err", err);
    }
  }),
  remove: action((state, payload) => {
    const index = state.cart.findIndex((c) => c.model._id === payload.model_id);
    state.cart.splice(index, 1);
  }),
  update: action((state, payload) => {
    payload.forEach((item) => {
      const index = state.cart.findIndex((c) => c.model._id === item.model_id);
      state.cart[index] = {
        ...state.cart[index],
        selected: item.selected,
        amount: item.amount
      };
    });
  }),
  increase: action((state, payload) => {
    const index = state.cart.findIndex((c) => c.model._id === payload.model_id);
    const { amount } = state.cart[index];
    state.cart[index] = {
      ...state.cart[index],
      amount: amount + 1
    };
    state.cart = [...state.cart];
  }),
  decrease: action((state, payload) => {
    const index = state.cart.findIndex((c) => c.model._id === payload.model_id);
    const { amount } = state.cart[index];
    state.cart[index] = {
      ...state.cart[index],
      amount: amount - 1
    };
  })
};
