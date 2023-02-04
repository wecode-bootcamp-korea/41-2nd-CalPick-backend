const { detectError } = require("../utils/detectError");
const { getDateTime } = require("./util/getDateTime");
const { sendSMS } = require("./util/naverSMS");
const { createRandomNumber } = require("./util/createRandomNumber");
const verificationModel = require("../models/verificationModel");

const createVerification = async (mobile) => {
	const verificationCode = await createRandomNumber(100000, 999999);
	const createdAt = getDateTime(0);
	const expiaryAt = getDateTime(5) ;

	await sendSMS(mobile, verificationCode);
	await verificationModel.createVerification(mobile, verificationCode, createdAt, expiaryAt);
}

const checkVerificationCode = async(mobile, verificationCode, sentDate, userId) => {
	const [ data ] = await verificationModel.checkVerificationCode(mobile, verificationCode);
	if (data === undefined || data.length === 0) detectError("다시 입력해주세요", 403);
	const { expiryAt, verificationId } = data;

	if (expiryAt < sentDate) detectError("인증코드를 다시 발급받아주세요", 401);
	await verificationModel.setVerificationCode(mobile, verificationId, userId);
}

module.exports = {
	createVerification,
	checkVerificationCode
}