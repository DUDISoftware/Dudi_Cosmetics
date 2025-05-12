import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TrendingProducts from "../../components/TrendingProducts";
import { Link } from "react-router-dom";
import { ArrowRightIcon, SlidersHorizontal } from "lucide-react";
import {
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { useState } from "react";

// Product Images
import SP1 from "../../assets/images/sp1.png";
import SP2 from "../../assets/images/sp2.png";
import SP3 from "../../assets/images/sp3.png";
import SP4 from "../../assets/images/sp4.png";

const brandLogos = [
  { name: "Lifedoc", src: "/brands/lifedoc.png" },
  { name: "Biore", src: "/brands/biore.png" },
  { name: "Nivea", src: "/brands/nivea.png" },
  { name: "Vichy", src: "/brands/vichy.png" },
  { name: "Olay", src: "/brands/olay.png" },
  { name: "Chanel", src: "/brands/chanel.png" },
  { name: "Gucci", src: "/brands/gucci.png" },
];

const products = [
  {
    id: 1,
    name: "CHANEL RED CAMELLIA SERUM DUO",
    price: 20,
    oldPrice: null,
    tag: "New",
    image: SP1,
  },
  {
    id: 2,
    name: "CHANEL SERUM DUO",
    price: 20,
    oldPrice: 30,
    tag: "Sales",
    image: SP2,
  },
  {
    id: 3,
    name: "REVITALIZING SERUM",
    price: 20,
    tag: null,
    image: SP3,
  },
  {
    id: 4,
    name: "Library Stool Chair",
    price: 20,
    tag: null,
    image: SP4,
  },
  {
    id: 5,
    name: "Chair Wooden Brown",
    price: 70,
    tag: null,
    image: SP1,
  },
  {
    id: 6,
    name: "Gucci Flora Perfume",
    price: 90,
    tag: "New",
    image: SP2,
  },
  {
    id: 7,
    name: "Vichy Night Cream",
    price: 45,
    tag: null,
    image: SP3,
  },
  {
    id: 8,
    name: "Olay Face Wash",
    price: 15,
    tag: "Sales",
    image: SP4,
  },
  {
    id: 9,
    name: "Biore Cleansing Foam",
    price: 10,
    tag: null,
    image: SP1,
  },
  {
    id: 10,
    name: "Nivea Lotion",
    price: 12,
    tag: null,
    image: SP2,
  },
  {
    id: 11,
    name: "Lifedoc Vitamin C Serum",
    price: 25,
    tag: "New",
    image: SP3,
  },
  {
    id: 12,
    name: "Lifedoc Face Mist",
    price: 18,
    tag: null,
    image: SP4,
  },
  {
    id: 13,
    name: "Anti-aging Cream",
    price: 60,
    tag: "Sales",
    image: SP1,
  },
  {
    id: 14,
    name: "Gucci Rush",
    price: 75,
    tag: null,
    image: SP2,
  },
  {
    id: 15,
    name: "Chanel No.5",
    price: 100,
    tag: "New",
    image: SP3,
  },
  {
    id: 16,
    name: "Vichy Hydration Serum",
    price: 40,
    tag: null,
    image: SP4,
  },
  // ... thêm đến id: 30 hoặc nhiều hơn nếu cần phân trang dài hơn
];


const ProductCard = ({ product }) => (
  <div className="relative rounded-xl p-4 shadow hover:shadow-md transition-all">
    {product.tag && (
      <span
        className={`absolute top-2 left-2 text-xs px-2 py-1 rounded ${product.tag === "New"
          ? "bg-red-500 text-white"
          : "bg-orange-300 text-black"
          }`}
      >
        {product.tag}
      </span>
    )}
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-40 object-contain mb-2"
    />
    <h3 className="text-sm font-medium line-clamp-2 overflow-hidden h-12">
      {product.name}
    </h3>
    <div className="flex justify-between items-center mt-2">
      <span className="text-red-500 font-bold">${product.price}</span>
      <div className="absolute bottom-4 right-4 flex gap-2 items-center">
        <button className="p-2 rounded-full bg-gray-100 hover:bg-white transition">
          <FaShoppingCart className="text-gray-600 hover:text-red-500" />
        </button>
      </div>
    </div>
    <button className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-white transition">
      <FaHeart className="text-gray-600 hover:text-red-500" />
    </button>
  </div>
);

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 12;

// Tính toán các sản phẩm cần hiển thị trên trang hiện tại
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

// Tính tổng số trang
const totalPages = Math.ceil(products.length / productsPerPage);

// Chuyển trang
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

  return (
    <>
      <Header />
      <div className="w-[75%] mx-auto px-6 py-12 text-sm text-gray-700">
        <nav className="flex items-center space-x-2">
          <Link to="/" className="hover:text-red-600 text-xl">Trang chủ</Link>
          <ArrowRightIcon />
          <span className="text-red-600 text-xl">Sản phẩm</span>
        </nav>
      </div>

      {/* Bộ lọc và thương hiệu */}
      <div className="w-[75%] mx-auto px-6 mb-4">
        <div className="flex items-center gap-2 mb-8">
          <SlidersHorizontal className="w-6 h-6 text-gray-600" />
          <span className="text-gray-700">Bộ lọc</span>
        </div>
        <div className="flex gap-16 items-center overflow-x-auto">
          {brandLogos.map((brand) => (
            <img
              key={brand.name}
              src={brand.src}
              alt={brand.name}
              className="w-40 h-20 object-contain hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>

      {/* Sắp xếp */}
      <div className="w-[75%] mx-auto px-6 mt-6">
        <div className="bg-gray-100 p-4 rounded">
          <div className="mb-2 font-semibold text-gray-700">Nước Hoa</div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="font-semibold">Sắp Xếp</span>
            <button className="bg-red-600 text-white px-3 py-1 rounded">Mới Nhất</button>
            <button className="bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-200">Bán Chạy</button>
            <button className="bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-200">
              Giá Thấp Nhất Đến Giá Cao Nhất
            </button>
            <button className="bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-200">
              Giá Cao Nhất Đến Giá Thấp Nhất
            </button>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="w-full md:w-[70%] mx-auto px-4 md:px-0 mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
         {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />

          ))}
        </div>
      </div>
<div className="flex justify-center mt-10">
  <div className="flex gap-2">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        className={`px-3 py-1 rounded border ${
          currentPage === index + 1
            ? "bg-red-600 text-white"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
        }`}
      >
        {index + 1}
      </button>
    ))}
  </div>
</div>

      <TrendingProducts />
      <Footer />
    </>
  );
};

export default Products;
