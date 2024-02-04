/** @jsxRuntime classic */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import { BacktraceClient, ErrorBoundary } from "@backtrace-labs/react";
import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";
import Cart from "./pages/Cart";
import CheckOutStepOne from "./pages/CheckOutStepOne";
import CheckOutStepTwo from "./pages/CheckOutStepTwo";
import Finish from "./pages/Finish";
import Inventory from "./pages/Inventory";
import InventoryItem from "./pages/InventoryItem";
import Login from "./pages/Login";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ROUTES } from "./utils/Constants";
import { currentUser } from "./utils/Credentials";
import { ShoppingCart } from "./utils/shopping-cart";

BacktraceClient.initialize({
  name: "Swag Store",
  version: "3.0.0",
  url: "https://submit.backtrace.io/UNIVERSE/TOKEN/json",
  userAttributes: () => ({
    user: currentUser(),
    shoppingCart: ShoppingCart.getCartContents(),
  }),
});

// Use createRoot instead of ReactDOM.render
const root = document.getElementById("root");
const rootContainer = createRoot(root);
const routing = (
  <ErrorBoundary>
    <Router>
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <PrivateRoute path={ROUTES.INVENTORY} component={Inventory} />
      <PrivateRoute path={ROUTES.INVENTORY_LIST} component={InventoryItem} />
      <PrivateRoute path={ROUTES.CART} component={Cart} />
      <PrivateRoute
        path={ROUTES.CHECKOUT_STEP_ONE}
        component={CheckOutStepOne}
      />
      <PrivateRoute
        path={ROUTES.CHECKOUT_STEP_TWO}
        component={CheckOutStepTwo}
      />
      <PrivateRoute path={ROUTES.CHECKOUT_COMPLETE} component={Finish} />
    </Router>
  </ErrorBoundary>
);

rootContainer.render(routing); // Use rootContainer instead of ReactDOM.render

serviceWorkerRegistration.register();
