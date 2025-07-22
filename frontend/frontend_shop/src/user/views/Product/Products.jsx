import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { getProducts } from "../../../api/productsApi";
import { getProductBrands } from "../../../api/ProductBrandApi";
// import { getProductCategories } from "../../../api/ProductCategoryApi"; // Tạm chưa dùng

const Products = () => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách thương hiệu
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getProductBrands();
        setBrands(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Lỗi khi lấy brands:", err);
        setBrands([]);
      }
    };
    fetchBrands();
  }, []);

  // Lấy danh sách sản phẩm (lọc theo brand nếu có)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = selectedBrand ? { brand_id: selectedBrand } : {};
        const data = await getProducts(undefined, params);
        setProducts(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [selectedBrand]);

  return (
    <>
      <Header />
      <div className="w-full bg-[#f7f7f7] min-h-screen pb-10">
        <div className="w-[75%] mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 mb-6">
            <Link to="/" className="hover:text-red-600 text-xl">Trang chủ</Link>
            <ArrowRightIcon />
            <span className="text-red-600 text-xl">Sản phẩm</span>
          </nav>

          {/* Brand filter */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Lọc theo thương hiệu:</h2>
            <div className="flex gap-6 overflow-x-auto pb-2">
              <button
                className={`px-4 py-2 rounded border ${!selectedBrand ? "bg-red-600 text-white" : "bg-white text-gray-700 border-gray-300"}`}
                onClick={() => setSelectedBrand(null)}
              >
                Tất cả
              </button>
              {brands.map((brand) => (
                <button
                  key={brand._id}
                  className={`flex flex-col items-center px-4 py-2 rounded border min-w-[120px] ${
                    selectedBrand === brand._id.toString()
                      ? "bg-red-600 text-white"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedBrand(brand._id.toString())}
                >
                  <img
                    src={brand.image_url}
                    alt={brand.Brand_name}
                    className="w-16 h-10 object-contain mb-1"
                  />
                  <span className="text-xs">{brand.Brand_name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product list */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-10">Đang tải sản phẩm...</div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col">
                  <img src={product.image_url} alt={product.product_name} className="w-full h-40 object-contain mb-2" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1 line-clamp-2">{product.product_name}</h3>
                    <div className="text-sm text-gray-500 mb-1">{product.short_description}</div>
                    <div className="text-red-600 font-bold text-lg mb-2">
                      {product.base_price?.toLocaleString()}₫
                    </div>
                  </div>
                  <Link
                    to={`/products/${product.slug}`}
                    className="mt-auto block bg-red-600 text-white text-center py-1 rounded hover:bg-red-700 transition"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">Không có sản phẩm nào.</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
