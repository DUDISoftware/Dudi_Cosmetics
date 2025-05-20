import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

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
    console.error(`Lỗi khi ${method} đến ${url}:`, error);
    throw error;
  }
};

// Thêm ProductBrand mới
export const addProductBrand = async (formData, token) => {
  return apiRequest("post", "/ProductBrand/add-ProductBrand", formData, token);
};

// Lấy danh sách ProductBrand
export const getProductBrands = (token) =>
  apiRequest("get", "/ProductBrand/ProductBrand-list", {}, token);

// Lấy chi tiết ProductBrand theo ID
export const getProductBrandById = (id, token) =>
  apiRequest("get", `/ProductBrand/ProductBrand-detail/${id}`, {}, token);

// Cập nhật ProductBrand
export const updateProductBrand = (id, formData, token) => {
  return apiRequest(
    "put",
    `/ProductBrand/update-ProductBrand/${id}`,
    formData,
    token
  );
};

// Xóa ProductBrand
export const deleteProductBrand = (id, token) =>
  apiRequest("delete", `/ProductBrand/delete-ProductBrand/${id}`, {}, token);
