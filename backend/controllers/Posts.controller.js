const PostsService = require('../services/Posts.service');

// Tạo bài viết mới
exports.createPost = async (req, res) => {
  try {
    const postData = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!postData || !postData.title || !postData.slug) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu bài viết không hợp lệ",
      });
    }

    // Gọi service để tạo bài viết mới
    const result = await PostsService.createPostSv(postData);

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

// Lấy danh sách bài viết
exports.getAllPost = async (req, res) => {
  try {
    const filters = req.query || {};
    const newCategory = await PostsService.getAllPostSv(filters);
    res.status(200).json({
      status: true,
      data: newCategory,
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

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !updateData) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu cập nhật không hợp lệ",
      });
    }

    const updatedposts = await PostsService.updatePostSv(id, updateData);
    if (!updatedposts) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy bài viết",
      });
    }

    res.status(200).json({
      status: true,
      message: "Cập nhật bài viết thành công",
      data: updatedposts,
    });
  } catch (error) {
    console.error("Lỗi cập nhật bài viết:", error.message);
    res.status(400).json({
      status: false,
      message: error.message, // Trả về lỗi chi tiết
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

    const deletedPos = await PostsService.deletePostSv(id);
    if (!deletedPos) {
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
      message: "Lỗi server",
    });
  }
};