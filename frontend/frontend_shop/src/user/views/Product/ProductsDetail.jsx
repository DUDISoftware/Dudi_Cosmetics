import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
import { ArrowRightIcon, SlidersHorizontal } from "lucide-react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { getProductById } from "../../../api/productsApi";
import ProposalProduct from "../../components/ProposalProduct";

const brandLogos = [
  { name: "Lifedoc", src: "/brands/lifedoc.png" },
  { name: "Biore", src: "/brands/biore.png" },
  { name: "Nivea", src: "/brands/nivea.png" },
  { name: "Vichy", src: "/brands/vichy.png" },
  { name: "Olay", src: "/brands/olay.png" },
  { name: "Chanel", src: "/brands/chanel.png" },
  { name: "Gucci", src: "/brands/gucci.png" },
];

const ProductsDetails = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!_id) {
      setError("Thiếu mã sản phẩm.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await getProductById(_id);
        if (response?.status) {
          setProduct(response.data);
          setError(null);
        } else {
          setError("Không tìm thấy sản phẩm.");
        }
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
        setError("Có lỗi xảy ra khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [_id]);

  if (loading)
    return <div className="text-center mt-10">Đang tải thông tin sản phẩm...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!product)
    return <div className="text-center mt-10">Không có dữ liệu sản phẩm.</div>;

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

      {/* Brand Filter */}
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

      {/* Product Details */}
      <div className="w-[75%] mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 text-[#333] font-[Arial]">
        {/* Images */}
        <div className="flex flex-col items-center">
          <img
            src={product.image_url || "/default-image.jpg"}
            alt={product.product_name || "Sản phẩm"}
            className="w-full h-auto object-contain rounded-xl border mb-4"
          />
          <div className="grid grid-cols-4 gap-2">
            {product.sub_images_urls?.length ? (
              product.sub_images_urls.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className="w-full border-[2px] border-gray-300 p-1 rounded-md hover:border-red-500 cursor-pointer"
                />
              ))
            ) : (
              <p>Không có hình ảnh phụ</p>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="text-sm">
          <h2 className="text-xl font-semibold uppercase leading-snug mb-3">
            {product.product_name}
          </h2>
          <p className="text-[#d0021b] text-2xl font-bold mb-2">
            {product.base_price?.toLocaleString() || "0"}₫
          </p>
          <div className="flex items-center text-yellow-500 mb-2 text-base">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="mr-1" />
            ))}
            <span className="text-black ml-2 mr-2">121 Đánh Giá</span>|
            <span className="ml-2 text-black">140 Đã Bán</span>
          </div>
          <p className="text-gray-600 mt-4">{product.description}</p>
        </div>
      </div>

      {/* Related Products */}
      <ProposalProduct />
      <Footer />
    </>
  );
};

export default ProductsDetails;
