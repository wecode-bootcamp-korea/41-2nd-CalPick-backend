const { appDataSource } = require("../databases/database");

const createVerification = async (mobile, verificationCode, createdAt, expiaryAt) => {
	try {
		await appDataSource.query(`
		INSERT INTO verification_codes
			(mobile_number, verification_code, created_at, expiry_at)
		VALUES
			("${mobile}", "${verificationCode}", "${createdAt}", "${expiaryAt}");
	`);
	} catch(err) {
		throw err;
	}
}

const checkVerificationCode = async (mobile, verificationCode) => {
	try {
		return await appDataSource.query(`
		SELECT 
			id 																													AS verificationId,
			date_format(expiry_at, '%Y-%m-%d %H:%i:%s')									AS expiryAt
		FROM verification_codes
		WHERE mobile_number = ${mobile}
			AND verification_code = ${verificationCode}
			AND is_verified = 0;
	`);
	} catch (err) {
		throw err;
	}

}

const setVerificationCode = async (verificationId, userId) => {
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		await queryRunner.query(`
			UPDATE verification_codes SET is_verified = 1
			WHERE id = ${verificationId} 
	`);

		await querRunner.query(`
			UPDATE users SET mobile_number = ${mobile}
			WHERE id = ${userId};
		`);

		await queryRunner.commitTransaction();
	} catch(err) {
		await queryRunner.rollbackTransaction();
	} finally {
		await queryRunner.release();
	}
}

module.exports = {
	createVerification,
	checkVerificationCode,
	setVerificationCode
}