import { RouteItemDef, RoutesNameEnum } from "app/types/routes.types";
import LoginScreen from "../screens/LoginScreen";

export const AUTH_ROUTES: RouteItemDef[] = [
  {
    name: RoutesNameEnum.LOGIN,
    component: LoginScreen,
    isPrivate: false,
    presentation: "fullScreenModal"
  }
];
