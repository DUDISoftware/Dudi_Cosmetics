// cartsApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Hàm chung cho các yêu cầu API
const apiRequest = async (method, url, data = {}, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    console.log('Request:', { method, url: `${API_URL}${url}`, data, config });
    const response = await axios({ method, url: `${API_URL}${url}`, data, ...config });
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi ${method} đến ${url}:`, error.message);
    throw error;
  }
};

export const updateCartItem = (data, token) => {
  const { userId, cartItemId, cartItemData } = data;
  return apiRequest("post", `/carts/${userId}/items/${cartItemId}`, cartItemData, token);
}



export const removeCartItem = (data, token) => {
  const { userId, cartItemId } = data;
  return apiRequest("delete", `/carts/${userId}/items/${cartItemId}`, {}, token);
};


export const payOSRedirectAPI = (data) => {
  console.log('PayOS Redirect API:', data);
  return apiRequest("post", "/payments/payos/redirect", data);
}

export const addToCart = (userId, cartItemData, config) => {
  return axios.post(`${API_URL}/carts/${userId}/items`, cartItemData, config);
};