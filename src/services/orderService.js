const { v4: uuidv4 } = require('uuid');

const { confirmPayment, cancelPayment } = require("./util/tossPayment");
const { detectError } = require("../utils/detectError");
const ordersModel = require("../models/orderModels");

const ORDERS_STATUS = Object.freeze({
	ORDER_SUBMIT: 1,
	ORDER_PLACED: 2,
	ORDER_FAIL: 3
});

const ORDERS_URL = Object.freeze({
	successUrl: "http://10.58.52.136:3000/order/success",
	failUrl: "http://10.58.52.136:3000/order/fail"
});

const PAYMENT_STATUS = Object.freeze({
	READY: 1,
	IN_PROGRESS: 2,
	WAITING_FOR_DEPOSIT: 3,
	DONE: 4,
	PAY_PROCESS_CANCELED: 5,
	REJECT_CARD_COMPANY: 6,
	PAY_PROCESS_ABORTED: 7,
	EXPIRED: 8
})

const PAYMENT_TYPE = Object.freeze({
	간편결제: 1,
	카드: 2,
	가상계좌: 3,
	계좌이체: 4,
	휴대폰: 5,
	상품권: 6
});

const submitOrder = async (userId, userName, orderName, totalAmount, testId, seatInfo) => {
	const orderCode = uuidv4().substring(2, 30);
	const ordersStatus = ORDERS_STATUS["ORDER_SUBMIT"];

	await ordersModel.submitOrder(userId, orderName, totalAmount, testId, seatInfo, orderCode, ordersStatus);

	const paymentObject = {
		amount: totalAmount,
		orderId: orderCode,
		orderName: orderName,
		customerName: userName, 
		successUrl: ORDERS_URL["successUrl"],
		failUrl: ORDERS_URL["failUrl"],
		flowMode: "DIRECT",
		easyPay: "토스페이",
		windowTarget: "iframe"
	};

	return paymentObject
}

const placeOrder = async (paymentKey, orderId, amount) => {
	const paymentObject = await confirmPayment(paymentKey, orderId, amount);
	const { currency, method, status } = paymentObject.data;

	const ordersStatusId = ORDERS_STATUS["ORDER_PLACED"];
	const paymentStatusId = PAYMENT_STATUS[status];
	const paymentTypeId = PAYMENT_TYPE[method];

	const result = await ordersModel.placeOrder(orderId, ordersStatusId, paymentKey, currency, paymentTypeId, paymentStatusId);

	if (result === "FAIL") {
		const cancelReason = "주문 실패"
		const [ orderInfo ] = await ordersModel.getOrderInfo(orderId);
		const { user_id } = orderInfo;
		await cancelOrder(user_id, orderId, cancelReason);
	}
}

const retractOrder = async (code, orderId) => {
	const ordersStatusId = ORDERS_STATUS["ORDER_FAIL"];

	await ordersModel.retractOrder(ordersStatusId, orderId);

	detectError(code, 404);
}

const cancelOrder = async(userId, orderId, cancelReason) => {
	const paymentKey = await ordersModels.cancelOrder(userId, orderId);
	
	if (!paymentKey) detectError("PAYMENT_CANCELLATION_FAILED", 401); 

	await cancelPayment(paymentKey, cancelReason);

	await ordersModel.placeOrder(orderId, userId);
}

module.exports = {
	submitOrder,
	placeOrder,
	retractOrder,
	cancelOrder
}
