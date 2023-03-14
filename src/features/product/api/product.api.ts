import { GetProductsResponse } from "./../types/product.type";
import { api } from "app/api/api";
import { ProductEndpointsEnum } from "../constants/product.endpoints";
import { GetProductsParams } from "../types/product.type";

export const getProducts = async (params: GetProductsParams): Promise<GetProductsResponse> => {
  const result = await api.get(ProductEndpointsEnum.GET_LIST, {
    params
  });
  return result.data as GetProductsResponse;
};
