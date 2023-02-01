const { appDataSource } = require("../databases/database");
const Test = require("./testQueryBuilderClass");

const getTests = async (testName, testDate, provinceName, districtName, testSiteId) => {
	const test = new Test(testName, testDate, provinceName, districtName, testSiteId);
	const { whereClause, selectClause, joinClause, groupByClause } = test.buildQuery();
	
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		const data = await queryRunner.query(`
			SELECT DISTINCT
				tc.name 																					AS testName,
				tc.price 																					AS price,
				DATE_FORMAT(t.test_date, '%Y-%m-%d')							AS testDate,
				DATE_FORMAT(t.date_register_by, '%Y-%m-%d')	  		AS registerDate,
				DATE_FORMAT(t.date_release_by, '%Y-%m-%d')				AS releaseDate
				${selectClause}
			FROM tests t
			INNER JOIN test_categories tc 											ON t.test_category_id = tc.id
				${joinClause}
				${whereClause}
				${groupByClause};
		`);

		if (testName && testDate && provinceName && !districtName && !testSiteId) {
			const districts = await queryRunner.query(`
				SELECT DISTINCT
					d.id  					AS district_id,
					d.name					AS districtName
				FROM tests t
				INNER JOIN test_categories tc ON t.test_category_id = tc.id
					${joinClause}
					${whereClause}
			`);

			data[0]["districts"] = districts;
		}

		else if (testName && testDate && provinceName && districtName && !testSiteId) {
			const testSites = await queryRunner.query(`
				SELECT DISTINCT
					ts.id 														AS id,
					ts.name 													AS name,
					ts.address												AS address,
					ts.lat														AS lat,
					ts.lng														AS lng,
					ts.seats_num											AS seatNo
				FROM tests t
				INNER JOIN test_categories tc 		ON t.test_category_id = tc.id
					${joinClause}
					${whereClause};
			`);

			data[0]["testSites"] = testSites;
		}

		await queryRunner.commitTransaction();

		return data;	
	} catch(err) {
		console.log(err);
		await queryRunner.rollbackTransaction();
	} finally {
		await queryRunner.release();
	}
}



module.exports = {
	getTests
}