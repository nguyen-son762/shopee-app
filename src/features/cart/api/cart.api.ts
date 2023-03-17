import { api } from "app/api/api";
import { CartEndpointsEnum } from "../constants/cart.endpoints";
import { CreateOrderParams } from "../types/cart.type";

export const createOrder = (params: CreateOrderParams) => {
  return api.post(CartEndpointsEnum.CREATE, params);
};
