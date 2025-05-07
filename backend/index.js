// Import các thư viện cần thiết
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require("cors");

// Khởi tạo ứng dụng Express
const app = express();

// Cấu hình môi trường
dotenv.config();

// Cấu hình middleware
app.use(cors()); // Cho phép CORS
app.use(express.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON requests

// Cấu hình view engine
app.set("view engine", "ejs");

// Cấu hình routes
app.use("/api", require("./routes/index.routes"));

// Kết nối MongoDB và khởi động server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Kết nối MongoDB thành công");

    // Khởi động server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại địa chỉ: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Lỗi kết nối MongoDB:", err.message);
  });