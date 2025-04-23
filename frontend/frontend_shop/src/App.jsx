import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; 
import Products from './pages/Products'; 
import Form from './pages/modules/Authorization/Form';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Form isSignInPage={true} />} />
        <Route path="/register" element={<Form isSignInPage={false} />} />
      </Routes>
    </Router>
  );
}

export default App;
