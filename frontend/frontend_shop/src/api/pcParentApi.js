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

// Lấy danh sách PCParent
export const getPCParents = (token) => apiRequest("get", "/PCParent/PCParent-list", {}, token);

// Lấy chi tiết PCParent theo ID
export const getPCParentById = (id, token) => apiRequest("get", `/PCParent/PCParent-detail/${id}`, {}, token);

// Thêm PCParent mới
export const addPCParent = (pcParent, token) => apiRequest("post", "/PCParent/add-PCParent", pcParent, token);

// Cập nhật PCParent
export const updatePCParent = (id, pcParent, token) => apiRequest("put", `/PCParent/update-PCParent/${id}`, pcParent, token);

// Xóa PCParent
export const deletePCParent = (id, token) => apiRequest("delete", `/PCParent/delete-PCParent/${id}`, {}, token);