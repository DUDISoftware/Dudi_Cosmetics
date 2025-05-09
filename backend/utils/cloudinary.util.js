//cau hinh cloudinary
// Upload file (Hỗ trợ ảnh)
// Upload file (Hỗ trợ tài liệu)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });