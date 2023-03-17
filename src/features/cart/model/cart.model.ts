import { ModelDef, ProductDef } from "app/features/product/types/product.type";
import { Action, action } from "easy-peasy";

export type CartDef = {
  item: ProductDef;
  amount: number;
  selected: boolean;
  model: ModelDef;
};

export interface CartModel {
  cart: CartDef[];
  add: Action<
    CartModel,
    {
      item: ProductDef;
      amount: number;
      model: ModelDef;
    }
  >;
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
  add: action((state, payload) => {
    const { item, amount, model } = payload;
    const checkCartItemExisted = state.cart.findIndex((item) => item.model._id === model._id);
    if (checkCartItemExisted > -1) {
      state.cart[checkCartItemExisted].amount += 1;
    } else {
      state.cart.push({
        item,
        amount,
        selected: false,
        model
      });
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
