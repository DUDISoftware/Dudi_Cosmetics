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

// Lấy danh sách voucher
export const getVouchers = (token) => apiRequest('get', '/Vouchers/Vouchers-list', {}, token);

// Lấy chi tiết voucher theo ID
export const getVoucherById = (id, token) => apiRequest('get', `/Vouchers/Vouchers-detail/${id}`, {}, token);

// Thêm voucher mới
export const addVoucher = (voucher, token) => apiRequest('post', '/Vouchers/add-Vouchers', voucher, token);

// Cập nhật voucher
export const updateVoucher = (id, voucher, token) => apiRequest('put', `/Vouchers/update-Vouchers/${id}`, voucher, token);

// Xóa voucher
export const deleteVoucher = (id, token) => apiRequest('delete', `/Vouchers/delete-Vouchers/${id}`, {}, token);
