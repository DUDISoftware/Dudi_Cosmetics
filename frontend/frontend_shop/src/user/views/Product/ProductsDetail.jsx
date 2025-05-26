import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getProducts } from "../../../api/productsApi";
import { getProductBrands } from "../../../api/ProductBrandApi";
import { getPCChildById } from "../../../api/pcChildApi";
import { getPCParentById } from "../../../api/pcParentApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ArrowRightIcon } from "lucide-react";

const ProductsDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [childCategory, setChildCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Lấy danh sách brand
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getProductBrands();
        setBrands(Array.isArray(data.data) ? data.data : []);
      } catch {
        setBrands([]);
      }
    };
    fetchBrands();
  }, []);

  // Lấy chi tiết sản phẩm theo slug nhưng dùng getProductById
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const allProducts = await getProducts();
        const found = allProducts?.data?.find((p) => p.slug === slug);
        if (found && found._id) {
          const data = await getProductById(found._id);
          if (data && data.data) {
            setProduct(data.data);
            setSelectedImage(data.data.image_url || "");
            // Lấy thông tin danh mục con
            if (data.data.category_id) {
              const childRes = await getPCChildById(data.data.category_id);
              setChildCategory(childRes?.data || null);
              // Lấy thông tin danh mục cha
              if (childRes?.data?.parent_id) {
                const parentRes = await getPCParentById(childRes.data.parent_id);
                setParentCategory(parentRes?.data || null);
              } else {
                setParentCategory(null);
              }
            } else {
              setChildCategory(null);
              setParentCategory(null);
            }
          } else {
            setProduct(null);
            setChildCategory(null);
            setParentCategory(null);
          }
        } else {
          setProduct(null);
          setChildCategory(null);
          setParentCategory(null);
        }
      } catch (err) {
        setProduct(null);
        setChildCategory(null);
        setParentCategory(null);
      }
      setLoading(false);
    };
    if (slug) fetchProduct();
  }, [slug]);

  // Lấy sản phẩm liên quan
  useEffect(() => {
    const fetchRelated = async () => {
      if (product && product.category_id) {
        try {
          const allProducts = await getProducts();
          const related = allProducts?.data
            ?.filter(
              (p) =>
                p.category_id === product.category_id &&
                p._id !== product._id
            )
            .slice(0, 4);
          setRelatedProducts(related);
        } catch {
          setRelatedProducts([]);
        }
      } else {
        setRelatedProducts([]);
      }
    };
    fetchRelated();
  }, [product]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="w-full min-h-screen flex items-center justify-center bg-[#f7f7f7]">
          <div className="text-lg">Đang tải chi tiết sản phẩm...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="w-full min-h-screen flex items-center justify-center bg-[#f7f7f7]">
          <div className="text-lg text-red-600">Không tìm thấy sản phẩm.</div>
        </div>
        <Footer />
      </>
    );
  }

  // Lấy brand hiện tại
  const currentBrand = brands.find(
    (b) => b._id === (product.brand_id?._id || product.brand_id)
  );

  return (
    <>
      <Header />
      <div className="w-full bg-[#f7f7f7] min-h-screen pb-10">
        <div className="w-[75%] mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 mb-6">
            <Link to="/" className="hover:text-red-600 text-xl">
              Trang chủ
            </Link>
            <ArrowRightIcon />
            <Link to="/products" className="hover:text-red-600 text-xl">
              Sản phẩm
            </Link>
            <ArrowRightIcon />
            <span className="text-red-600 text-xl">{product.product_name}</span>
          </nav>

          {/* Chi tiết sản phẩm */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-8">
            {/* Ảnh sản phẩm */}
            <div className="flex flex-col gap-4 md:w-1/2">
              <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center border">
                <img
                  src={selectedImage}
                  alt={product.product_name}
                  className="max-h-[350px] object-contain"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[product.image_url, ...(product.sub_images_urls || [])].map(
                  (img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`sub-${idx}`}
                      className={`w-16 h-16 object-contain rounded border cursor-pointer ${selectedImage === img ? "ring-2 ring-red-500" : ""
                        }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  )
                )}
              </div>
            </div>

            {/* Thông tin sản phẩm */}
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-2xl font-bold mb-2">
                {product.product_name}
              </h1>
              <div className="flex items-center gap-4 mb-2">
                {currentBrand && (
                  <div className="flex items-center gap-2">
                    <img
                      src={currentBrand.image_url}
                      alt={currentBrand.Brand_name}
                      className="w-8 h-5 object-contain"
                    />
                    <span className="text-base font-medium">
                      {currentBrand.Brand_name}
                    </span>
                  </div>
                )}
                {product.is_hot && (
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">
                    HOT
                  </span>
                )}
                {product.is_most_viewed && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                    Xem nhiều
                  </span>
                )}
              </div>
              <div className="text-3xl text-red-600 font-bold mb-2">
                {product.base_price?.toLocaleString()}₫
              </div>
              <div className="text-gray-700 mb-2">
                {product.short_description}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Danh mục cha:</span>{" "}
                <span className="text-gray-600">
                  {parentCategory?.category_name || ""}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Danh mục con:</span>{" "}
                <span className="text-gray-600">
                  {childCategory?.category_name || ""}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Số lượng trong kho:</span>{" "}
                <span className="text-gray-600">
                  {product.store_quantity}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Ngày tạo:</span>{" "}
                <span className="text-gray-600">
                  {product.created_at
                    ? new Date(product.created_at).toLocaleDateString()
                    : ""}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Mô tả chi tiết:</span>
                <div className="text-gray-700 mt-1 whitespace-pre-line">
                  {product.long_description}
                </div>
              </div>
              <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition w-fit">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Sản phẩm liên quan */}
      <div className="w-[75%] mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sản Phẩm Liên Quan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.isArray(relatedProducts) && relatedProducts.length > 0 ? (
            relatedProducts.map((item) => (
              <Link
                to={`/products/${item.slug}`}
                key={item._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center"
              >
                <div className="w-full aspect-square bg-gray-50 rounded flex items-center justify-center mb-3 border">
                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    className="max-h-32 object-contain"
                  />
                </div>
                <div className="text-gray-500 text-xs mb-1">
                  {/* Hiển thị tên danh mục con của sản phẩm liên quan nếu có */}
                  {childCategory?.category_name || ""}
                </div>
                <div className="font-semibold text-base mb-1 text-center line-clamp-2">
                  {item.product_name}
                </div>
                <div className="text-red-600 font-bold mb-1">
                  {item.base_price?.toLocaleString()}₫
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500">
              Không có sản phẩm liên quan.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsDetail;