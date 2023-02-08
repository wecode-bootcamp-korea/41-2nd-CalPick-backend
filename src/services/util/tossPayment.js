const path = require("path");

require("dotenv").config({
	path: path.resolve(__dirname, "../../../.env")
});

const axios = require("axios").default;

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY;
const encodedData = Buffer.from(TOSS_SECRET_KEY + ':').toString('base64');
const AUTHORIZATION_HEADER_STRING = 'Basic ' + encodedData;

const confirmPayment = async(paymentKey, orderId, amount) => {
	try {	
		const options = {
			method: 'POST',
			url: 'https://api.tosspayments.com/v1/payments/confirm',
			headers: {
				Authorization: AUTHORIZATION_HEADER_STRING,
				'Content-Type': 'application/json'
			},
			data: {
				paymentKey: paymentKey,
				amount: amount,
				orderId: orderId
			}
		};
	
		const res = await axios.request(options);
		return res;
	} catch(err) {
		throw err;
	}
}

const cancelPayment = async(paymentKey, cancelReason) => {
	const options = {
		method: 'POST',
		url: `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`,
		headers: {
			Authorization: AUTHORIZATION_HEADER_STRING,
			'Content-Type': 'application/json'
		},
		data: {cancelReason: cancelReason}
	};
	
	axios.request(options).then(function (response) {
		console.log(response.data);
	}).catch(function (error) {
		console.error(error);
		throw err;
	});
}


module.exports = {
	confirmPayment,
	cancelPayment
}