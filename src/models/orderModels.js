const { appDataSource } = require("../databases/database");


const submitOrder = async(userId, orderName, totalAmount, testId, seatInfo, orderCode, ordersStatus) => {
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		await queryRunner.query(`
			INSERT INTO orders (
				order_name, 
				user_id, 
				order_code, 
				total_amount, 
				test_id, 
				order_status_id, 
				seat_info
			) VALUES (
				"${orderName}", 
				${userId}, 
				"${orderCode}", 
				${totalAmount}, 
				${testId}, 
				${ordersStatus},
				"${seatInfo}"
			);
	`);

	await queryRunner.query(`
		UPDATE tests SET is_booked = 1
		WHERE id = ${testId};
	`);

	await queryRunner.commitTransaction();
	} catch(err) {
		await queryRunner.rollbackTransaction();
		throw err;
	} finally {
		await queryRunner.release();
	}
}

const placeOrder = async(orderId, ordersStatusId, paymentKey, currency, paymentTypeId, paymentStatusId) => {
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		await queryRunner.query(`
			UPDATE orders 
				SET order_status_id = ${ordersStatusId}
			WHERE order_code = "${orderId}";
		`);

		const [order] = await queryRunner.query(`
			SELECT id FROM orders WHERE order_code = "${orderId}";
		`);

		const ordersId = order.id;

		await queryRunner.query(`
			INSERT INTO payments
				(payment_status_id, payment_type_id, order_id, payment_key, currency)
			VALUES
			(${paymentStatusId}, ${paymentTypeId}, ${ordersId}, "${paymentKey}", "${currency}");
		`);

		await queryRunner.commitTransaction();
	} catch(err) {
		await queryRunner.rollbackTransaction();
		throw err;
	} finally {
		await queryRunner.release();
	}
}

const retractOrder = async (ordersStatusId, orderId) => {
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		await queryRunner.query(`
			UPDATE orders SET order_status = ${ordersStatusId}
			WHERE order_code = "${orderId}";
		`);

		const [ tests ] = await queryRunner.query(`
			SELECT test_id FROM orders
			WHERE order_code = "${orderId}";
		`);

		const { test_id } = tests;

		await queryRunner.query(`
			UPDATE tests SET is_booked = 0;
			WHERE = ${test_id};
		`);
		
		await queryRunner.commitTransaction();
	} catch(err) {
		await queryRunner.rollbackTransaction();
		return "FAIL";
	} finally {
		await queryRunner.release();
	}
}

const cancelOrder = async(userId, orderId) => {
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		const orderData = await queryRunner.query(`
			SELECT * FROM orders WHERE order_code = "${orderId}";
		`);

		const { id, test_id } = orderData;

		const paymentsData = await queryRunner.query(`
			SELECT
				payment_key 				AS paymentKey
			FROM payments
				WHERE order_id = ${id} AND user_id = ${userId};
		`);

		await queryRunner.query(`
			UPDATE tests SET is_booked = 0
			WHERE ${test_id};
		`);

		await queryRunner.query(`
			UPDATE payments SET payment_status_id = 5;
		`);

		const { payment_key } = paymentsData;

		await queryRunner.commitTransaction();
		return payment_key;
	} catch(err) {
		await queryRunner.rollbackTransaction();
		throw err;
	} finally {
		await queryRunner.release();
	}
}

const getOrderInfo = async (orderId) => {
	return await appDataSource.query(`
		SELECT * FROM orders
		WHERE order_code = ${orderId};
	`);
}


module.exports = {
	submitOrder,
	placeOrder,
	retractOrder,
	cancelOrder,
	getOrderInfo
}