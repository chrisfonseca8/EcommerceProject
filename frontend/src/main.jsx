import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import App from "./App.jsx";
import Layout from "./components/layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import AboutItem from "./components/AboutItem/AboutItem.jsx";
import Signup from "./components/auth/SignUp.jsx";
import LoginForm from "./components/auth/Login.jsx";
import Collection from "./components/AboutItem/Collection.jsx";

import Cart from "./components/cart/Cart.jsx";
import { CartContextProvider } from "./components/cart/Context.jsx";

import CreateItem from "./components/Items/CreateItem.jsx";
import UpdateItem from "./components/Items/UpdateItem.jsx";

import CustomerOrders from "./components/User/CustomerOrders.jsx";
import CheckOut from "./components/CheckOut/Checkout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/Home" />
      },

      {
        path: "/Home",
        element: <Home />
      },

      {
        path: "/Item/:ItemId",
        element: <AboutItem />
      },

      {
        path: "/User/Register",
        element: <Signup />
      },

      {
        path: "/User/Login",
        element: <LoginForm />
      },

      {
        path: "/cart",
        element: <Cart />
      },

      {
        path: "/collection",
        element: <Collection />
      },

      {
        path: "/items/createItem",
        element: <CreateItem />
      },

      {
        path: "/items/:itemId/update",
        element: <UpdateItem />
      },

      {
        path: "/orders/:cusId/CusOrders",
        element: <CustomerOrders />
      },

      {
        path: "/checkout",
        element: <CheckOut />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </StrictMode>
);