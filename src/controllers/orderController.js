const { catchAsync } = require("../middlewares/errorHandler");
const { detectError } = require("../utils/detectError");
const ordersServices = require("../services/orderService");

const submitOrder = catchAsync(async (req, res) => {
	const userId = req.userId;
	const userName = req.userName;
	const { orderName, totalAmount, testId, seatInfo } = req.body;
	
	if (!userId || !orderName || !totalAmount || !testId || !seatInfo) detectError("INPUT ERROR", 404);

	const paymentObject = await ordersServices.submitOrder(userId, userName, orderName, totalAmount, testId, seatInfo);

	res.status(201).json(paymentObject);
});

const placeOrder = catchAsync(async (req, res) => {
	const { paymentKey, orderId, amount } = req.query;

	if (!paymentKey || !orderId || !amount) detectError("PAYMENT FAILED", 404);

	await ordersServices.placeOrder(paymentKey, orderId, amount);

	res.status(201).redirect("http://localhost:3000");
});

const retractOrder = catchAsync(async (req, res) => {
	const { code, message, orderId } = req.query;

	await ordersServices.retractOrder(code, orderId);

	res.status(201).json({ message: message });
});

const cancelOrder = catchAsync(async (req, res) => {
	const userId = req.userId;
	const { orderId, cancelReason } = req.body;

	await ordersServices.cancelOrder(userId, orderId, cancelReason);

	res.status(201).json({ message: "PAYMENT_CANCELLATION_SUCCESSFUL" });
});

module.exports = {
	submitOrder,
	placeOrder,
	retractOrder,
	cancelOrder
}