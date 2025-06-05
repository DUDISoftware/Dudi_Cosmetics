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

// Thêm mới banner
export const addBanner = async (formData, token) => {
  return apiRequest("post", "/Banners/add-Banners", formData, token);
};

// Lấy danh sách tất cả các banner
export const getBanners = (token) =>
  apiRequest("get", "/Banners/Banners-list", {}, token);

// Lấy thông tin chi tiết của một banner theo ID
export const getBannerById = (id, token) =>
  apiRequest("get", `/Banners/Banners-detail/${id}`, {}, token);

// Cập nhật banner theo ID
export const updateBanner = (id, formData, token) => {
  return apiRequest("put", `/Banners/update-Banners/${id}`, formData, token);
};

// Xóa banner theo ID
export const deleteBanner = (id, token) =>
  apiRequest("delete", `/Banners/delete-Banners/${id}`, {}, token);
