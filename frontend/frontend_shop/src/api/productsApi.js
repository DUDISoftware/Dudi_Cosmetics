import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Hàm chung cho các yêu cầu API
const apiRequest = async (method, url, data = {}, token, params = {}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(data instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
      },
      params,
    };
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data: method === "get" ? undefined : data, // GET không có body
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi ${method} đến ${url}:`, error.message);
    throw error;
  }
};

// ✅ Lấy danh sách sản phẩm (có thể truyền brand_id, category_id qua params)
export const getProducts = (token, params = {}) =>
  apiRequest("get", "/Product/products-list", {}, token, params);

// ✅ Lấy chi tiết sản phẩm theo ID
export const getProductById = (id, token) =>
  apiRequest("get", `/Product/products-detail/${id}`, {}, token);

// ✅ Lấy chi tiết sản phẩm theo slug
export const getProductBySlug = (slug, token) =>
  apiRequest("get", `/Product/products-detail-by-slug/${slug}`, {}, token);

// ✅ Thêm sản phẩm mới
export const addProduct = (formData, token) =>
  apiRequest("post", "/Product/add-Product", formData, token);

// ✅ Cập nhật sản phẩm
export const updateProduct = (id, formData, token) =>
  apiRequest("put", `/Product/update-products/${id}`, formData, token);

// ✅ Xóa sản phẩm
export const deleteProduct = (id, token) =>
  apiRequest("delete", `/Product/delete-products/${id}`, {}, token);

// ✅ Lấy danh sách thương hiệu
export const getProductBrands = (token) =>
  apiRequest("get", "/ProductBrand/brands-list", {}, token);
