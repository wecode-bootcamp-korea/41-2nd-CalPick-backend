const testSitesServices = require("../services/testsitesServices");
const { catchAsync } = require("../middlewares/errorHandler")

const getTests = catchAsync(async (req, res) => {
	const queryParams = req.query;
	const userId = req.userId;
	const userEmail = req.userEmail;

	const data = await testSitesServices.getTests(userId, userEmail, queryParams);

	return res.status(200).json(data);
});


module.exports = {
	getTests
}