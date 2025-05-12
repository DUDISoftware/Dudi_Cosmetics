const PostsService = require('../services/Posts.service');
const toSlug = require('../utils/slug.util'); // Import hàm toSlug

// Tạo bài viết mới
exports.createPost = async (req, res) => {
  try {
    const postData = req.body;
    const file = req.file; // Lấy file từ request (sử dụng Multer)

    // Kiểm tra dữ liệu đầu vào
    if (!postData || !postData.title || !file) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu bài viết không hợp lệ hoặc thiếu file ảnh",
      });
    }

    // Tạo slug từ title
    postData.slug = toSlug(postData.title);

    // Gọi service để tạo bài viết mới
    const result = await PostsService.createPostSv(postData, file);

    if (!result.status) {
      return res.status(400).json(result); // Trả về lỗi từ service
    }

    res.status(201).json({
      status: true,
      message: "Tạo bài viết thành công",
      data: result.data,
    });
  } catch (error) {
    console.error("Lỗi tạo bài viết:", error.message);
    res.status(500).json({
      status: false,
      message: `Lỗi tạo bài viết: ${error.message}`,
    });
  }
};

// Cập nhật bài viết
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const file = req.file; // Lấy file từ request (sử dụng Multer)

    if (!id || !updateData) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu cập nhật không hợp lệ",
      });
    }

    // Tạo slug từ title nếu có cập nhật title
    if (updateData.title) {
      updateData.slug = toSlug(updateData.title);
    }

    const updatedPost = await PostsService.updatePostSv(id, updateData, file);
    if (!updatedPost) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy bài viết",
      });
    }

    res.status(200).json({
      status: true,
      message: "Cập nhật bài viết thành công",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Lỗi cập nhật bài viết:", error.message);
    res.status(500).json({
      status: false,
      message: `Lỗi cập nhật bài viết: ${error.message}`,
    });
  }
};

// Lấy danh sách bài viết
exports.getAllPost = async (req, res) => {
  try {
    const filters = req.query || {};
    const posts = await PostsService.getAllPostSv(filters);
    res.status(200).json({
      status: true,
      data: posts,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách bài viết:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Lấy chi tiết bài viết
exports.getPostSById = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({
        status: false,
        message: "ID bài viết không hợp lệ",
      });
    }

    const post = await PostsService.getPostSByIdSv(postId);
    if (!post) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy bài viết",
      });
    }

    res.status(200).json({
      status: true,
      data: post,
    });
  } catch (error) {
    console.error("Lỗi lấy chi tiết bài viết:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};



// Xóa bài viết
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID bài viết không hợp lệ",
      });
    }

    const deletedPost = await PostsService.deletePostSv(id);
    if (!deletedPost) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy bài viết",
      });
    }

    res.status(200).json({
      status: true,
      message: "Xóa bài viết thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa bài viết:", error.message);
    res.status(500).json({
      status: false,
      message: `Lỗi xóa bài viết: ${error.message}`,
    });
  }
};