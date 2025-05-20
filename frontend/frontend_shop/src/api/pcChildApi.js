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

// Lấy danh sách PCChild
export const getPCChilds = (token) => apiRequest("get", "/PCChild/PCChild-list", {}, token);

// Lấy chi tiết PCChild theo ID
export const getPCChildById = (id, token) => apiRequest("get", `/PCChild/PCChild-detail/${id}`, {}, token);

// Thêm PCChild mới
export const addPCChild = (pcChild, token) => apiRequest("post", "/PCChild/add-PCChild", pcChild, token);

// Cập nhật PCChild
export const updatePCChild = (id, pcChild, token) => apiRequest("put", `/PCChild/update-PCChild/${id}`, pcChild, token);

// Xóa PCChild
export const deletePCChild = (id, token) => apiRequest("delete", `/PCChild/delete-PCChild/${id}`, {}, token);