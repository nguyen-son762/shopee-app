import { RouteItemDef, RoutesNameEnum } from "app/types/routes.types";
import VerifyOTP from "../screens/VerifyOTP/VerifyOTP";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";

export const AUTH_ROUTES: RouteItemDef[] = [
  {
    name: RoutesNameEnum.LOGIN,
    component: LoginScreen,
    isPrivate: false,
    presentation: "fullScreenModal"
  },
  {
    name: RoutesNameEnum.SIGN_UP,
    component: SignUpScreen,
    isPrivate: false,
    presentation: "fullScreenModal"
  },
  {
    name: RoutesNameEnum.VERIFY_OTP,
    component: VerifyOTP,
    isPrivate: false,
    presentation: "fullScreenModal"
  }
];
