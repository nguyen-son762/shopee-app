import { api } from "app/api/api";
import { CartEndpointsEnum } from "../constants/cart.endpoints";
import { CreateOrderParams, GetCartResponse } from "../types/cart.type";

export const getCart = async (user_id: string) => {
  const result = await api.get(CartEndpointsEnum.GET.replace(":user_id", user_id));
  return result.data as {
    data: GetCartResponse;
  };
};

export const createOrder = (params: CreateOrderParams) => {
  return api.post(CartEndpointsEnum.CREATE, params);
};
