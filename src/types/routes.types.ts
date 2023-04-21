import { OrderStatusEnums } from "app/features/cart/constants/cart.constants";
import { ProductDef } from "app/features/product/types/product.type";
import { FC } from "react";

export enum RoutesNameEnum {
  LOGIN = "Login",
  SIGN_UP = "SignUp",
  HOME = "Home",
  CART = "Cart",
  VERIFY_OTP = "VerifyOTP",
  PRODUCT_DETAIL = "ProductDetail",
  PAYMENT = "Payment",
  SEARCH = "Search",
  PROFILE = "Profile",
  ORDER = "Order"
}

export type RootStackParams = {
  [RoutesNameEnum.HOME]: undefined;
  [RoutesNameEnum.LOGIN]: undefined;
  [RoutesNameEnum.SIGN_UP]: undefined;
  [RoutesNameEnum.CART]: undefined;
  [RoutesNameEnum.VERIFY_OTP]: undefined;
  [RoutesNameEnum.PRODUCT_DETAIL]: {
    item: ProductDef;
  };
  [RoutesNameEnum.PAYMENT]: undefined;
  [RoutesNameEnum.SEARCH]: {
    keyword: string;
  };
  [RoutesNameEnum.PROFILE]: undefined;
  [RoutesNameEnum.ORDER]: {
    status?: OrderStatusEnums;
  };
};

export type RouteItemDef = {
  name: keyof RootStackParams;
  component: FC<any>;
  isPrivate?: boolean;
  presentation?:
    | "card"
    | "modal"
    | "transparentModal"
    | "containedModal"
    | "containedTransparentModal"
    | "fullScreenModal"
    | "formSheet"
    | undefined;
};
