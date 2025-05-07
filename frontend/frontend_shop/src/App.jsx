import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Form from "./pages/modules/Authorization/Form";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import Profile from "./pages/Profile/Profile";
// Import các trang admin
import { CssBaseline, ThemeProvider } from '@mui/material';
import { baselightTheme } from "./theme/DefaultColors";
import FullLayout from './pages/Admin/layouts/FullLayout';
import Dashboard from "./pages/Admin/dashboard/Dashboard";
import SamplePage from "./pages/Admin/sample-page/SamplePage";
const App = () => {
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Form isSignInPage={true} />} />
          <Route path="/register" element={<Form isSignInPage={false} />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/admin" element={<FullLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
