import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Hàm chung cho các yêu cầu API
const apiRequest = async (method, url, data = {}, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(data instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
      },
    };
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi ${method} đến ${url}:`, error.message);
    throw error;
  }
};

// Lấy danh sách sản phẩm
export const getProducts = (token) =>
  apiRequest("get", "/Product/products-list", {}, token);

// Lấy chi tiết sản phẩm theo ID
export const getProductById = (id, token) =>
  apiRequest("get", `/Product/products-detail/${id}`, {}, token);

// Thêm sản phẩm mới
export const addProduct = async (formData, token) => {
  return apiRequest("post", "/Product/add-Product", formData, token);
};

// Cập nhật sản phẩm
export const updateProduct = async (id, formData, token) => {
  return apiRequest("put", `/Product/update-products/${id}`, formData, token);
};

// Xóa sản phẩm
export const deleteProduct = (id, token) =>
  apiRequest("delete", `/Product/delete-products/${id}`, {}, token);

// Lấy chi tiết sản phẩm theo slug
export const getProductBySlug = (slug, token) =>
  apiRequest("get", `/Product/products-detail-by-slug/${slug}`, {}, token);
