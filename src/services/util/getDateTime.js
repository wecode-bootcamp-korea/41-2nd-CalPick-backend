const getDateTime = (min) => {
	const d = new Date();
	
	d.setMinutes(d.getMinutes() + min);

	const date = d.toISOString().split('T')[0];
	const time = d.toTimeString().split(' ')[0];

	return date + ' ' + time;
}


module.exports = {
	getDateTime
}