export enum RoutesNameEnum {
  LOGIN = "Login",
  HOME = "Home"
}

export type RootStackParams = {
  [RoutesNameEnum.HOME]: undefined;
  [RoutesNameEnum.LOGIN]: undefined;
};
