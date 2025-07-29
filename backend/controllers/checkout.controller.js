const { createPayment } = require("../config/payment_momo.config");
const payOS = require("../config/payos.config");
const Order = require("../services/Order.service")
const OrderItem = require("../services/OrderItem.service");
const CheckoutService = require("../services/checkout.service");

exports.checkoutMomo = async (req, res) => {
  try {
    const { amount, orderInfo } = req.body;

    if (!amount) {
      return res.status(400).json({
        status: false,
        message: "Thiếu thông tin thanh toán",
      });
    }

    const paymentResponse = await createPayment(amount)
    
    if (!paymentResponse || paymentResponse.resultCode !== 0) {
      res.status(500).json({
        status: false,
        message: "Lỗi khi tạo thanh toán",
        error: paymentResponse,
      });
    }

    res.redirect(paymentResponse.payUrl);
  } catch (error) {
    console.error("Lỗi khi xử lý thanh toán:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
}

exports.checkoutPayOS = async (req, res) => {
  const redirectUrl = req.body.redirectUrl || '/';
  const amount = req.body.amount || 2000; // Default amount if not provided
  const discount_amount = req.body.discount_amount || 0; // Default discount amount if not provided
  const final_amount = amount - discount_amount;
  const { user_id, fullName, phoneNumber, address, paymentMethod, products, cart_id } = req.body;
  const ordercode = Number(String(Date.now()).slice(-6))
  const orderData = {
    user_id,
    cart_id,
    order_code: ordercode,
    full_name: fullName,
    phone: phoneNumber,
    city: address,
    district: address,
    ward: address,
    address: address,
    note: '',
    payment_method: paymentMethod,
    total_amount: amount,
    discount_amount,
    final_amount,
    voucher_code: 'NONE',
  }
  console.log('Order Data:', orderData);
  if (!redirectUrl) {
      return res.status(400).json({
          status: false,
          message: 'Missing Redirect URL'
      });
  }
  if (Number.isNaN(amount) || amount <= 2000 || amount > 10000000) {
      // Validate amount: must be a number, greater than 2000, and less than or equal to 10,000,000
      return res.status(400).json({
          status: false,
          message: 'Invalid amount'
      });
  }
  const body = {
    orderCode: ordercode,
    amount: final_amount,
    description: 'Thanh toan don hang',
    returnUrl: redirectUrl,
    cancelUrl: redirectUrl
  };

  try {
      const newOrder = await Order.createOrder(orderData);
      const orderItems = products.map(product => ({
          order_id: newOrder._id,
          product_id: product.product_id,
          variant_id: 1,
          product_name: product.product_name,
          quantity: product.quantity,
          price: product.price,
          total_price: product.quantity * product.price
      }));
      await OrderItem.createOrderItems(orderItems);
      const paymentLinkResponse = await payOS.createPaymentLink(body);
      res.json({
          status: true,
          message: 'Payment link created successfully',
          checkoutUrl: paymentLinkResponse.checkoutUrl
      });
  } catch (error) {
      console.error(error);
      res.send('Something went error');
  }
}

exports.checkoutCod = async (req, res) => {
  const { user_id, fullName, phoneNumber, address, products, cart_id } = req.body;
  const ordercode = Number(String(Date.now()).slice(-6));
  const orderData = {
    user_id,
    cart_id,
    order_code: ordercode,
    full_name: fullName,
    phone: phoneNumber,
    city: address,
    district: address,
    ward: address,
    address: address,
    note: '',
    payment_method: 'cod',
    total_amount: products.reduce((total, product) => total + (product.price * product.quantity), 0),
    discount_amount: 0,
    final_amount: products.reduce((total, product) => total + (product.price * product.quantity), 0),
    voucher_code: 'NONE',
  };

  try {
    const newOrder = await Order.createOrder(orderData);
    const orderItems = products.map(product => ({
      order_id: newOrder._id,
      product_id: product.product_id,
      variant_id: 1,
      product_name: product.product_name,
      quantity: product.quantity,
      price: product.price,
      total_price: product.quantity * product.price
    }));
    
    await OrderItem.createOrderItems(orderItems);
    // orderCode: response.orderCode, status: response.status, paymentLinkId: response.paymentLinkId
    res.status(200).json({
      status: true,
      message: 'Checkout successful',
      orderCode: ordercode,
      status: 'PENDING',
      paymentLinkId: null // No payment link for COD
    });
  } catch (error) {
    console.error('Checkout failed:', error);
    res.status(500).json({
      status: false,
      message: 'Server error',
      error: error.message
    });
  }
}

exports.paymentRedirect = async (req, res) => {
  const { orderCode, status, paymentLinkId } = req.body;

  if (!orderCode || !status) {
    return res.status(400).json({
      status: false,
      message: 'Missing order code or status'
    });
  }

  try {
    await CheckoutService.paymentRedirect({orderCode, status, paymentLinkId});
    return res.status(200).json({
      status: true,
      message: 'Checkout redirect successful'
    });
    
  } catch (error) {
    console.error('Error during checkout redirect:', error);
    return res.status(500).json({
      status: false,
      message: 'Server error',
      error: error.message
    });
  }
}