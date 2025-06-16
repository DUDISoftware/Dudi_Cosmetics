import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart-items/${userId}/items`, {
  headers: { Authorization: `Bearer ${token}` },
});

        setItems(res.data.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy giỏ hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) fetchCartItems();
  }, [userId, token]);

  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Header />
      <div className="w-[80%] mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>

        {loading ? (
          <div>Đang tải...</div>
        ) : items.length === 0 ? (
          <div>Giỏ hàng trống.</div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 border rounded bg-white shadow"
              >
                <div className="flex items-center gap-4">
                  <img src={item.product_image} alt={item.product_name} className="w-20 h-20 object-contain" />
                  <div>
                    <div className="font-semibold text-lg">{item.product_name}</div>
                    <div className="text-gray-600">Số lượng: {item.quantity}</div>
                  </div>
                </div>
                <div className="text-red-600 font-bold">{item.price.toLocaleString()}₫</div>
              </div>
            ))}
            <div className="text-right text-xl font-bold text-red-600">
              Tổng tiền: {totalAmount.toLocaleString()}₫
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
