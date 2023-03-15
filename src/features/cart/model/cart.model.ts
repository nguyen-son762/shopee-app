import { ProductDef } from "app/features/product/types/product.type";
import { Action, action } from "easy-peasy";

export interface CartModel {
  cart: {
    item: ProductDef;
    amount: number;
    selected: boolean;
  }[];
  add: Action<
    CartModel,
    {
      item: ProductDef;
      amount: number;
    }
  >;
  remove: Action<
  CartModel,
  {
    _id: string
  }
>;
}

const initialState = {
  cart: []
};

export const auth: CartModel = {
  ...initialState,
  add: action((state, payload) => {
    const { item, amount } = payload;
    state.cart.push({
      item,
      amount,
      selected: false
    });
  }),
  remove: action((state, payload) => {
    const index = state.cart.findIndex(c => c.item._id === payload._id)
    state.cart.splice(index, 1)
  })
};
