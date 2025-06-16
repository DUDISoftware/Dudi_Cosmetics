// cartsApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const addToCart = (userId, cartItemData, config) => {
  return axios.post(`${API_URL}/carts/${userId}/items`, cartItemData, config);
};