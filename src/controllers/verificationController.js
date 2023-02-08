const { catchAsync } = require("../middlewares/errorHandler");
const { detectError } = require("../utils/detectError");
const verificationService = require("../services/verificationService");

const createVerification = catchAsync(async (req, res) => {
	const userId = req.userId;
	const { mobile } = req.body;
	if (!mobile) detectError("INPUT REQUIRED", 404);

	await verificationService.createVerification(mobile, userId);

	res.status(201).json({mesasge: "codeCreated!!!"});
});

const checkVerificationCode = catchAsync(async (req, res) => {
	const userId = req.userId;
	const { mobile, code, sentDate } = req.body;

	if (!mobile || !code || !sentDate) detectError("INPUT REQUIRED", 404);

	await verificationService.checkVerificationCode(mobile, code, sentDate, userId);

	res.status(201).json({message: "인증완료"});
});

module.exports = {
	createVerification,
	checkVerificationCode
}