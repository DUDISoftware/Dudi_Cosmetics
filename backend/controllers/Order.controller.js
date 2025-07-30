const Order = require("../services/Order.service");

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        status: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
}

exports.getOrderByOrderCode = async (req, res) => {
  try {
    const orderCode = req.body.orderCode
    const order = await Order.getOrderByOrderCode(orderCode);

    if (!order) {
      return res.status(404).json({
        status: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order by code:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
}
