const Order = require('../models/Order.model');

exports.createOrder = async (orderData) => {
  try {
    const order = new Order(orderData);
    return await order.save();
  } catch (error) {
    // Kiểm tra lỗi unique
    if (error.name === "ValidationError") {
      throw new Error(Object.values(error.errors).map(err => err.message).join(", "));
    }
    throw new Error("Lỗi khi tạo đơn hàng: " + error.message);
  }
}


exports.getOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate('user_id', 'fullName phone email');
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error) {
    throw new Error("Lỗi khi lấy đơn hàng: " + error.message);
  }
}

exports.getOrderByOrderCode = async (orderCode) => {
  try {
    const order = await Order.find({ order_code: orderCode }).populate('user_id', 'fullName phone email');
    if (!order || order.length === 0) {
      throw new Error("Order not found");
    }
    return order.length > 0 ? order[0] : null; // Assuming order_code is unique, return the first match
  } catch (error) {
    throw new Error("Lỗi khi lấy đơn hàng theo mã: " + error.message);
  }
}