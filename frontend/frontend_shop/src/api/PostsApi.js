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

// Lấy danh sách Posts
export const getPosts = (token) =>
  apiRequest("get", "/Posts/Posts-list", {}, token);

// Lấy chi tiết Posts theo ID
export const getPostById = (id, token) =>
  apiRequest("get", `/Posts/Posts-detail/${id}`, {}, token);

// Thêm Posts mới
export const addPost = async (formData, token) => {
  return apiRequest("post", "/Posts/add-Posts", formData, token);
};

// Cập nhật Posts
export const updatePost = async (id, formData, token) => {
  return apiRequest("put", `/Posts/update-Posts/${id}`, formData, token);
};

// Xóa Posts
export const deletePost = (id, token) =>
  apiRequest("delete", `/Posts/delete-Posts/${id}`, {}, token);
