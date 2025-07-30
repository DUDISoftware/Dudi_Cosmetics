import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom";
import { updateCartItem, removeCartItem } from "../../../api/cartsApi"; // Import the API functions
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const handleClick = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
      return;
    }
    navigate("/checkout", { state: { data: items.filter(item => selectedItems.includes(item._id)) } });
  }

  const handleSelectItem = (item) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(item._id)) {
        return prevSelected.filter(id => id !== item._id);
      } else {
        return [...prevSelected, item._id];
      }
    });
  }

  const handleIncrease = (currentItem) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item._id === currentItem._id) {
          const newQuantity = item.quantity + 1;
          const newPrice = item.price + item?.product_id.base_price;
          updateCartItem({userId, cartItemId: currentItem._id, cartItemData: { quantity: newQuantity, price: newPrice }}, token)
          return { ...item, quantity: newQuantity, price: newPrice };
        }
        return item;
      }
      )
    );
  }

  const handleDecrease = (currentItem) => {
    if (currentItem.quantity <= 1) {
      const confirmDelete = confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")
      if (confirmDelete) {
        setItems(prevItems => prevItems.filter(item => item._id !== currentItem._id));
        setSelectedItems(prevSelected => prevSelected.filter(id => id !== currentItem._id));
        removeCartItem({userId, cartItemId: currentItem._id}, token)
      }
    } else {
      setItems(prevItems =>
        prevItems.map(item => {
          if (item._id === currentItem._id) {
            const newQuantity = item.quantity - 1;
            const newPrice = item.price - item?.product_id.base_price;
            updateCartItem({userId, cartItemId: currentItem._id, cartItemData: { quantity: newQuantity, price: newPrice }}, token)
            
            return { ...item, quantity: newQuantity, price: newPrice };
          }
          return item;
        }
        )
      );
    }
  }

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart-items/${userId}/items`, {
  headers: { Authorization: `Bearer ${token}` },
});

        setItems(res.data.data || []);
        console.log("Giỏ hàng:", res.data.data);
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
            <FormControlLabel
              label="Chọn tất cả"
              control={
                <Checkbox
                  checked={selectedItems.length === items.length}
                  onChange={() => {
                    if (selectedItems.length === items.length) {
                      setSelectedItems([]);
                    } else {
                      setSelectedItems(items.map(item => item._id));
                    }
                  }}
                  aria-label="Select all items"
                />
              }
            />
            {items.map((item) => (
              <div key={item._id} className="flex flex-cols items-center bg-gray-100 p-4 rounded-lg shadow-md">
                <Checkbox
                  checked={selectedItems.includes(item._id)}
                  onChange={() => handleSelectItem(item)}
                />

                <div
                className="flex items-center w-full justify-between p-4 border rounded bg-white shadow"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.product_image} alt={item.product_name} className="w-20 h-20 object-contain" />
                    <div>
                      <div className="font-semibold text-lg">{item.product_name}</div>
                      <div className="text-gray-600">
                      <div className="flex items-center text-sm ml-8 bg-grey">
                        Số lượng: <br/>
                        <RemoveIcon onClick={() => handleDecrease(item)}  className="cursor-pointer"/>
                        <span className="border-x-1 px-2 border-[#D0D0D0]">{item.quantity}</span>
                        <AddIcon onClick={() => handleIncrease(item)} className="cursor-pointer"/>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-red-600 font-bold">{item.price.toLocaleString()}₫</div>
                </div>
              </div>
            ))}
            <div className="flex flex-col text-right text-xl font-bold text-red-600">
              Tổng tiền: {totalAmount.toLocaleString()}₫
              <Button onClick={handleClick} variant="contained">Thanh toán</Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
