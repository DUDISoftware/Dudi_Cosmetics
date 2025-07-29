const OrderService = require('../services/Order.service');
const OrderItemService = require('../services/OrderItem.service');
const CartService = require('../services/carts.service');

exports.paymentRedirect = async (data) => {
  const { orderCode, status, paymentLinkId } = data;

  if (!orderCode || !status) {
    throw new Error('Missing required parameters');
  }

  try {
    // Update the order status based on the payment status
    const order = await OrderService.getOrderByOrderCode(orderCode);
    if (!order) {
      throw new Error('Order not found');
    }

    order.status = status
    order.order_payment_link_id = paymentLinkId || null;
    if (status === 'PAID' || status === 'PENDING') {
      const orderItems = await OrderItemService.getOrderItemsByOrderId(order._id);
      const productId = orderItems.map(item => item.product_id);
      await CartService.removeItemsFromCart(order.cart_id, productId);
    }

    return {
      status: true,
      message: 'Payment processed successfully',
      order: order
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    throw new Error('Payment processing failed');
  }
}
