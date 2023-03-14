import { RouteItemDef, RoutesNameEnum } from "app/types/routes.types";
import ProductDetailScreen from "../screens/ProductDetailScreen";

export const PRODUCT_ROUTES: RouteItemDef[] = [
  {
    name: RoutesNameEnum.PRODUCT_DETAIL,
    component: ProductDetailScreen,
    isPrivate: false,
    presentation: "fullScreenModal"
  }
];
