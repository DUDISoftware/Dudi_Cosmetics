import React from "react";
import { Navigate } from "react-router-dom";
import Home from "../views/Home";
import Products from "../views/Products";
import Login from "../views/Authorization/login";
import Register from "../views/Authorization/register";

const RouterUser = [
  {
    path: "/",
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
];

export default RouterUser;