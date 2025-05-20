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
    const response = await axios({ method, url: `${API_URL}${url}`, data, ...config });
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi ${method} đến ${url}:`, error.message);
    throw error;
  }
};

// Đăng ký người dùng mới
export const registerUser = (userData) => apiRequest("post", "/users/register", userData);

// Đăng nhập người dùng
export const loginUser = (credentials) => apiRequest("post", "/users/login", credentials);

// Lấy danh sách người dùng
export const getUsers = (token) => apiRequest("get", "/users/users-list", {}, token);

// Lấy chi tiết người dùng theo ID
export const getUserById = (id, token) => apiRequest("get", `/users/user-detail/${id}`, {}, token);

// Cập nhật thông tin người dùng
export const updateUser = (id, userData, token) => apiRequest("put", `/users/update-user/${id}`, userData, token);

// Xóa người dùng
export const deleteUser = (id, token) => apiRequest("delete", `/users/delete-user/${id}`, {}, token);