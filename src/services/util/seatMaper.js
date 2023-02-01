const seatMap = (userId, userEmail, data) => {
	const seatInfo = data[0]["seatInfo"];
	const map = [];
	let mapRow = [];
	let count = 0;

	while (count < seatInfo.length) {		
		mapRow.push(seatInfo[count]);
		if (count === seatInfo.length - 1) {
			map.push(mapRow);
			break;
		}
		if (
			seatInfo[count]["seatInfo"].startsWith(seatInfo[count]["seatInfo"][0]) !== 
			seatInfo[count + 1]["seatInfo"].startsWith(seatInfo[count]["seatInfo"][0])) {
				map.push(mapRow);
				mapRow = [];
		}

		count++;
	}

	data[0]["userId"] = userId;
	data[0]["userEmail"] = userEmail;
	data[0]["seatInfo"] = map;
}


module.exports = {
	seatMap
}