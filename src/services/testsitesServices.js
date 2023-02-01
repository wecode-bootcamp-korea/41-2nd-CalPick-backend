const { detectError } = require("../utils/detectError");
const { seatMap } = require("./util/seatMaper");
const testSitesModels = require("../models/testsitesModels");


const getTests = async (userId, userEmail, queryParams) => {
	const { testName, testDate, provinceName, districtName, testSiteId } = queryParams;
	const data = await testSitesModels.getTests(testName, testDate, provinceName, districtName, testSiteId);

	if (data === undefined) detectError("ERROR", 404);
	if (!data.length) detectError("NO DATA", 404);


	if (testName && testDate && provinceName && districtName && testSiteId) await seatMap(userId, userEmail, data);

	return data;
}

module.exports = {
	getTests
}