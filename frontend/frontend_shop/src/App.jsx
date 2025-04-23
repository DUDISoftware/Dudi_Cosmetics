import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Form from "./pages/modules/Authorization/Form";
import AdminPage from "./pages/Admin/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import Profile from "./pages/Profile/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Form isSignInPage={true} />} />
        <Route path="/register" element={<Form isSignInPage={false} />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
