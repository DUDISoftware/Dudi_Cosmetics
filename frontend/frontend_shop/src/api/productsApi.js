import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Adjust with the correct backend URL

// Function to fetch products
export const getProducts = async () => {
  try {
    // Correct API URL path
    const response = await axios.get(`${API_URL}/Product/products-list`);
    return response;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/Product/products-detail/${id}`);
    console.log("Fetched data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Fetch failed:", error.response?.data || error.message);
    throw error;
  }
};
