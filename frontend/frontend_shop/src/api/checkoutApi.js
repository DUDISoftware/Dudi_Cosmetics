import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;

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

// Thanh toán qua ngân hàng
export const checkoutPayOSAPI = (orderData, token) => {
  orderData.redirectUrl = REDIRECT_URL || '';
  console.log('Checkout PayOS API:', orderData);
  console.log('Token:', token);
  return apiRequest("post", "/payments/payos", orderData, token);
}

export const paymentRedirect = (data) => {
  console.log('Payment Redirect API:', data);
  return apiRequest("post", "/payments/redirect", data);
}

// Thanh toán trực tiếp (COD)
export const checkoutCodAPI = (orderData, token) => {
  console.log('Checkout COD API:', orderData);
  return apiRequest("post", "/payments/cod", orderData, token);
}