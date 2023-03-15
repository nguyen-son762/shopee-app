import { RouteItemDef, RoutesNameEnum } from "app/types/routes.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";

export const CartStack = createNativeStackNavigator();

export const CART_ROUTES: RouteItemDef[] = [
  {
    name: RoutesNameEnum.CART,
    component: CartScreen,
    isPrivate: false,
    presentation: "fullScreenModal"
  },
  
];
