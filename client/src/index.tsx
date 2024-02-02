import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "src/App";
import UserStore from "src/store/UserStore";
import ProductStore from "src/store/ProductStore";
import BasketStore from "src/store/BasketStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      product: new ProductStore(),
      basket: new BasketStore(),
    }}
  >
    <App />
  </Context.Provider>,
);
