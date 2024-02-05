import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "src/App";
import UserStore from "src/store/UserStore";
import ProductStore from "src/store/ProductStore";
import BasketStore from "src/store/BasketStore";
import { Product } from "src/serverTypes";

export const Context = createContext(null);
const products: Product[] = JSON.parse(localStorage.getItem("basket")) ?? [];
const basket = new BasketStore();
basket.setProducts(products);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      product: new ProductStore(),
      basket,
    }}
  >
    <App />
  </Context.Provider>,
);
