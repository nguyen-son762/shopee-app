import { FC } from "react";

export enum RoutesNameEnum {
  LOGIN = "Login",
  HOME = "Home",
  CART = "Cart"
}

export type RootStackParams = {
  [RoutesNameEnum.HOME]: undefined;
  [RoutesNameEnum.LOGIN]: undefined;
  [RoutesNameEnum.CART]: undefined;
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
