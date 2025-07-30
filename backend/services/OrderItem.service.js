const OrderItem = require('../models/OrderItem.model');

exports.createOrderItem = async (orderItemData) => {
  try {
    const order = new OrderItem(orderItemData);
    return await order.save();
  } catch (error) {
    // Kiểm tra lỗi unique
    if (error.name === "ValidationError") {
      throw new Error(Object.values(error.errors).map(err => err.message).join(", "));
    }
    throw new Error("Lỗi khi tạo đơn hàng: " + error.message);
  }
}

exports.createOrderItems = async (orderItemsData) => {
  try {
    const orderItems = orderItemsData.map(item => new OrderItem(item));
    return await OrderItem.insertMany(orderItems);
  } catch (error) {
    // Kiểm tra lỗi unique
    if (error.name === "ValidationError") {
      throw new Error(Object.values(error.errors).map(err => err.message).join(", "));
    }
    throw new Error("Lỗi khi tạo đơn hàng: " + error.message);
  }
}

exports.getOrderItemsByOrderId = async (orderId) => {
  try {
    const orderItems = await OrderItem.find({ order_id: orderId })
    return orderItems;
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách sản phẩm trong đơn hàng: " + error.message);
  }
}
