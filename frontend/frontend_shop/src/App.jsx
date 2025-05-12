import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes, Navigate } from "react-router-dom";
import RouterAdmin from "./admin/routes/RouterAdmin";
import RouterUser from "./user/routes/RouterUser";

import { baselightTheme } from "./admin/theme/DefaultColors";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const routes = token
    ? role === "admin"
      ? RouterAdmin
      : RouterUser
    : [
      ...RouterUser,
      { path: "*", element: <Navigate to="/login" /> }, 
    ];

  const routing = useRoutes(routes);

  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

export default App;