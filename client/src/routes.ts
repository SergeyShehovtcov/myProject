import { FC } from "react";

import Admin from "src/pages/Admin";
import Basket from "src/pages/Basket";
import Shop from "src/pages/Shop";
import Auth from "src/pages/Auth";
import Profile from "src/pages/Profile";
import Product from "src/pages/Product";
import Order from "src/pages/Order";

import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  ORDER_ROUTE
} from "src/utils/constants";

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
    path: PROFILE_ROUTE,
    Component: Profile
  },
  {
    path: ORDER_ROUTE,
    Component: Order
  }
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: Product,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
];
