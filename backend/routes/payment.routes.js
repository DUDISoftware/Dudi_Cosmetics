const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { checkoutMomo, checkoutPayOS, paymentRedirect, checkoutCod } = require("../controllers/checkout.controller");

// router.post('/momo', verifyToken, checkoutMomo);
router.post('/cod', checkoutCod)
router.post('/payos', checkoutPayOS)
router.post('/redirect', paymentRedirect)
router.post('/payos/webhook', async (req, res) => {
  console.log("Webhook received:", req.body);
  res.status(200).json({
    status: true,
    message: "Webhook received successfully",
  });
});

module.exports = router;
