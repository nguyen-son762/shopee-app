import { ProductDef } from "app/features/product/types/product.type";
import { FC } from "react";

export enum RoutesNameEnum {
  LOGIN = "Login",
  SIGN_UP = "SignUp",
  HOME = "Home",
  CART = "Cart",
  VERIFY_OTP = "VerifyOTP",
  PRODUCT_DETAIL = "ProductDetail",
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
