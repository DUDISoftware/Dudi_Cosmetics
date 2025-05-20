import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TrendingProducts from "../../components/TrendingProducts";
import { Link } from "react-router-dom";
import { ArrowRightIcon, SlidersHorizontal } from "lucide-react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { getProducts } from "../../../api/productsApi.js";  

const brandLogos = [
  { name: "Lifedoc", src: "/brands/lifedoc.png" },
  { name: "Biore", src: "/brands/biore.png" },
  { name: "Nivea", src: "/brands/nivea.png" },
  { name: "Vichy", src: "/brands/vichy.png" },
  { name: "Olay", src: "/brands/olay.png" },
  { name: "Chanel", src: "/brands/chanel.png" },
  { name: "Gucci", src: "/brands/gucci.png" },
];

const ProductCard = ({ product }) => (
  <div className="relative rounded-xl p-4 shadow hover:shadow-md transition-all">
    {product.is_hot && (
      <span
        className={`absolute top-2 left-2 text-xs px-2 py-1 rounded ${product.is_hot ? "bg-red-500 text-white" : "bg-orange-300 text-black"
          }`}
      >
        New
      </span>
    )}
    <Link to={`/product/${product._id}`}>


      <img
        src={product.image_url}
        alt={product.product_name}
        className="w-full h-40 object-contain mb-2"
      />
      <h3 className="text-sm font-medium line-clamp-2 overflow-hidden h-12">
        {product.product_name}
      </h3>
      <div className="flex justify-between items-center mt-2">
        <span className="text-red-500 font-bold">${product.base_price}</span>
        <div className="absolute bottom-4 right-4 flex gap-2 items-center">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-white transition">
            <FaShoppingCart className="text-gray-600 hover:text-red-500" />
          </button>
        </div>
      </div>
      <button className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-white transition">
        <FaHeart className="text-gray-600 hover:text-red-500" />
      </button>
    </Link>
  </div>
);


const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const productsPerPage = 12;
  const [loading, setLoading] = useState(true);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log(response.data); // Log the response to check if the data is correct
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = (products || []).slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil((products || []).length / productsPerPage);

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

      {/* Loading state */}
      {loading ? (
        <div className="text-center mt-10">Loading products...</div>
      ) : (
        <>
          {/* Brand filter */}
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

          {/* Product list */}
          <div className="w-full md:w-[70%] mx-auto px-4 md:px-0 mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p>Không có sản phẩm nào.</p>
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <div className="flex gap-2">
              {totalPages > 1 && Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded border ${loading || currentPage === index + 1
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <TrendingProducts />
      <Footer />
    </>
  );
};

export default Products;
