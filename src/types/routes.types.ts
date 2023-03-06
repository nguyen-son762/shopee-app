import { FC } from "react";

export enum RoutesNameEnum {
  LOGIN = "Login",
  SIGN_UP = "SignUp",
  HOME = "Home",
  CART = "Cart",
  VERIFY_OTP = "VerifyOTP"
}

export type RootStackParams = {
  [RoutesNameEnum.HOME]: undefined;
  [RoutesNameEnum.LOGIN]: undefined;
  [RoutesNameEnum.SIGN_UP]: undefined;
  [RoutesNameEnum.CART]: undefined;
  [RoutesNameEnum.VERIFY_OTP]: undefined;
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
