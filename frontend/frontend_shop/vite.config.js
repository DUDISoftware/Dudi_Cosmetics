import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Thêm plugin React
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // Thêm plugin React vào đây
});