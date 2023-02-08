const express = require("express");

const router = express.Router();

const { authHandler } = require("../middlewares/auth");
const ordersController = require("../controllers/orderController");


router.post("", authHandler, ordersController.submitOrder);
router.get("/success", ordersController.placeOrder);
router.get("/fail", ordersController.retractOrder);
router.delete("/payments", authHandler, ordersController.cancelOrder);

module.exports = router;