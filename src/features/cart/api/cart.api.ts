import { api } from "app/api/api";
import { CartEndpointsEnum } from "../constants/cart.endpoints";
import { CreateOrderParams, GetCartResponse, UpdateStatusParams } from "../types/cart.type";
import { OrderStatusEnums } from "../constants/cart.constants";

export const getCart = async (user_id: string, status?: OrderStatusEnums) => {
  const result = await api.get(CartEndpointsEnum.GET.replace(":user_id", user_id), {
    params: {
      status
    }
  });
  return result.data as {
    data: GetCartResponse;
  };
};

export const createOrder = (params: CreateOrderParams) => {
  return api.post(CartEndpointsEnum.CREATE, params);
};

export const getStatus = async (user_id: string) => {
  const result = await api.get(CartEndpointsEnum.STATUS.replace(":user_id", user_id));
  return result.data
};

export const updateOrderStatus = async (params: UpdateStatusParams) => {
  const result = await api.post(CartEndpointsEnum.STATUS.replace(":user_id", params.user_id),{
    order_id: params.order_id,
    status: params.status
  });
  return result.data
};
