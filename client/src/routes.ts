import Admin from "src/pages/Admin";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "src/utils/constants";
import Basket from "src/pages/Basket";
import Shop from "src/pages/Shop";
import Auth from "src/pages/Auth";
import Product from "src/pages/Product";
import { FC } from "react";

type Route = {
  path: string;
  Component: FC;
};

export const authRoutes: Route[] = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  ,
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: Product,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
];
