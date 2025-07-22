import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../../api/productsApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ProductsByCategory = () => {
    const { childId } = useParams();
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProductsResponse = await getProducts(token);
                const allProducts = allProductsResponse.data || allProductsResponse; // <== thêm dòng này
                const filtered = allProducts.filter(
                    (p) => String(p.category_id) === childId
                );
                setProducts(filtered);
            } catch (err) {
                console.error("Lỗi khi lọc sản phẩm theo danh mục:", err);
            }
        };


        fetchProducts();
    }, [childId, token]);

    return (
        <>
        <Header/>
        <div className="p-6 w-[75%] mx-auto">
            <h2 className="text-xl font-semibold mb-4">Sản phẩm theo danh mục</h2>
            {products.length === 0 ? (
                <p>Không có sản phẩm nào.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="border p-3 rounded shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={product.image_url}
                                alt={product.product_name}
                                className="w-full h-40 object-cover"
                            />
                            <h3 className="text-sm font-medium mt-2 truncate">
                              {product.product_name}
                            </h3>
                            <p className="text-gray-500">{product.short_description}</p>
                            <p className="text-red-500 font-semibold">{product.base_price?.toLocaleString()}₫</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <Footer/>
        </>
    );
    
};

export default ProductsByCategory;
