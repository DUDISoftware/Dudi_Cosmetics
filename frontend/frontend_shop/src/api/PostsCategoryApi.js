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

// Lấy danh sách PostsCategory
export const getPostsCategories = (token) => apiRequest("get", "/PostsCategory/PostsCategory-list", {}, token);

// Lấy chi tiết PostsCategory theo ID
export const getPostsCategoryById = (id, token) => apiRequest("get", `/PostsCategory/PostsCategory-detail/${id}`, {}, token);

// Thêm PostsCategory mới
export const addPostsCategory = (postsCategory, token) => apiRequest("post", "/PostsCategory/add-PostsCategory", postsCategory, token);

// Cập nhật PostsCategory
export const updatePostsCategory = (id, postsCategory, token) => apiRequest("put", `/PostsCategory/update-PostsCategory/${id}`, postsCategory, token);

// Xóa PostsCategory
export const deletePostsCategory = (id, token) => apiRequest("delete", `/PostsCategory/delete-PostsCategory/${id}`, {}, token);