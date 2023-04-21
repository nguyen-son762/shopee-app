import { RouteItemDef, RoutesNameEnum } from "app/types/routes.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";

export const ProfileStack = createNativeStackNavigator();

export const PROFILE_ROUTES: RouteItemDef[] = [
  {
    name: RoutesNameEnum.PROFILE,
    component: ProfileScreen,
    isPrivate: false
  }
];
