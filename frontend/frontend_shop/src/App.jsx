import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Make sure to import your Home component
import Products from './pages/Products';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' element={<Products/>}/>
      </Routes>
    </Router>
  );
}

export default App;
