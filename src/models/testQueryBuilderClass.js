const testNameMapper = Object.freeze({
	캘픽: 1,
	오캘픽: 2,
	캘픽스: 3,
	캘픽스피킹: 4,
});

const provincesMapper = Object.freeze({
	서울: 1,
	경기도: 2
});

const districtsMapper = Object.freeze({
	강남구: 1,
	강동구: 2,
	강북구: 3,
	강서구: 4,
	관악구: 5,
	광진구: 6,
	구로구: 7,
	금천구: 8,
	노원구: 9,
	도봉구: 10,
	동대문구: 11,
	동작구: 12,
	마포구: 13,
	서대문구: 14,
	서초구: 15,
	성동구: 16,
	성북구: 17,
	송파구: 18,
	양천구: 19,
	영등포구: 20,
	용산구: 21,
	은평구: 22,
	종로구: 23,
	중구: 24,
	중랑구: 25
});

class Test {
	constructor(testName, testDate, provinceName, districtName, testSiteId) {
		this.params = {
			...(testDate && { testDate }),
			...(testName && { testName }),
			...(provinceName && { provinceName }),
			...(districtName && { districtName }),
			...(testSiteId && { testSiteId })
		};

		this.whereMapper = {
			testDate: this.testDateWhereFilter,
			testName: this.testNameWhereFilter,
			provinceName: this.provinceNameFilter,
			districtName: this.districtWhereFilter,
			testSiteId: this.testSiteWhereFilter
		};

		this.selectMapper = {
			testDate: this.testDateSelectFilter,
			districtName: this.districtSelectFilter,
			testSiteId: this.testSiteSelectFilter
		}

		this.joinMapper = {
			testDate: this.testDateJoinFilter,
			testSiteId: this.testSiteIdJoinFilter
		}

		this.groupByMapper = {
			testSiteId: this.testSiteIdGroupByFilter
		}
	}

	iterator(params, selectMapper) {
		const iteratedResult = Object.entries(params)
		.filter((key) => {
			if (selectMapper.hasOwnProperty(key[0])) return key;
		})
		.map(([key, value]) => selectMapper[key](value));
	
		return iteratedResult;
	}

	createWhereClause() {
		const conditions = this.iterator(this.params, this.whereMapper);
		return conditions.length !== 0 ? `WHERE ${conditions.join(` AND `)}` : "";
	}

	createSelectClause() {
		const selections = this.iterator(this.params, this.selectMapper);
		return selections.length !== 0 && typeof(selections[0]) !== "undefined" 
		? `,\n${selections.join(",")}` 
		: "";
	}

	createJoinClause() {
		const joins = this.iterator(this.params, this.joinMapper);

		return joins.length !== 0 ? joins.join("") : "";
	}

	createGroupByClause() {
		const groups = this.iterator(this.params, this.groupByMapper);

		return groups ? groups : "";
	}

	testDateWhereFilter(date) {
		return `t.test_date = "${date}"`;
	}

	testNameWhereFilter(test) {
		return `tc.id = ${testNameMapper[test]}`;
	}

	provinceNameFilter (province) {
		return `p.id = ${provincesMapper[province]}`
	}

	districtWhereFilter(district) {
		return `d.id = ${districtsMapper[district]}`;
	}

	testSiteWhereFilter(testSiteId) {
		return `ts.id = ${testSiteId}`;
	}

	testDateSelectFilter() {
		return 'p.id AS provinceId, p.name AS province'
	}

	districtSelectFilter() {
		return `d.id AS districtId, d.name AS district`
	}

	testSiteSelectFilter() {
		return `
			JSON_ARRAYAGG(
				JSON_OBJECT(
					"id", 						t.id,
					"seatInfo", 			s.seat_info,
					"isBooked", 			t.is_booked
			)
		) AS seatInfo`
	}

	testDateJoinFilter() {
		return `
			INNER JOIN test_sites_seats tss         ON t.test_site_seat_id = tss.id
			INNER JOIN test_sites ts 								ON tss.test_site_id = ts.id
			INNER JOIN districts d                  ON ts.district_id = d.id
			INNER JOIN provinces p                  ON d.province_id = p.id
		`
	}

	testSiteIdJoinFilter() {
		return `INNER JOIN seats s ON tss.seat_id = s.id`
	}

	testSiteIdGroupByFilter() {
		return `GROUP BY d.id, t.date_release_by, t.date_register_by`
	}

	buildQuery() {
		const whereClause = this.createWhereClause();
		const selectClause =  this.createSelectClause();
		const joinClause = this.createJoinClause();
		const groupByClause = this.createGroupByClause();

		return { whereClause, selectClause, joinClause, groupByClause };
	}
}

module.exports = Test;