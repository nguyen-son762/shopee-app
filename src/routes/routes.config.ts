import { AUTH_ROUTES } from "app/features/auth/routes/auth.routes";
import HomeScreen from "app/features/home/screens/HomeScreen";
import { RouteItemDef, RoutesNameEnum } from "app/types/routes.types";
import Demo from "./Demo";

export const ROUTE_LIST: RouteItemDef[] = [
  {
    name: RoutesNameEnum.HOME,
    component: Demo,
    isPrivate: false
  },
  ...AUTH_ROUTES
];
