import { api } from "app/api/api";
import { PurchaseProductParams } from "../types/payment.type";
import { CartEndpointsEnum } from "app/features/cart/constants/cart.endpoints";

export const purchaseCart = (params: PurchaseProductParams) => {
  return api.post(CartEndpointsEnum.PURCHASE, params);
};
