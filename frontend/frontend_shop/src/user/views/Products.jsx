import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TrendingProducts from "../components/TrendingProducts";
import { Link } from "react-router-dom";
import {  ArrowRightIcon } from "lucide-react";

const Products = () => {
  return (
    <>
      <Header />
      <div className="w-[75%] mx-auto px-6 py-12 text-sm text-gray-700">
        <nav className="flex items-center space-x-2">
          <Link to="/" className="hover:text-red-600 text-xl">
            Trang chủ
          </Link>
          <ArrowRightIcon/>
          <span className="text-red-600 text-xl">Sản phẩm</span>
        </nav>
      </div>
      <TrendingProducts />
      <Footer />
    </>
  );
};

export default Products;
