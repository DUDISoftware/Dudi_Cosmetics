import React from "react";
import { Navigate } from "react-router-dom";
import Home from "../views/Home";
import Products from "../views/Product/Products";
import Login from "../views/Authorization/login";
import Register from "../views/Authorization/register";
import ProductsDetails from "../views/Product/ProductsDetail";

const RouterUser = [
  {
    path: "/",
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path:"/products_details" ,element:<ProductsDetails />} 
    ],
  },
];

export default RouterUser;