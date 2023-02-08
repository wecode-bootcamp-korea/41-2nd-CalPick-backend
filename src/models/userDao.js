const { appDataSource } = require("../databases/database");

const createUser = async(email, password, name) => {
	await appDataSource.query(
		`INSERT INTO users
			(email, password, username)
		VALUES 
			(?,?,?)
		`,
		[email, password, name]
	);
};

const getUserData = async(email) => {
	console.log(email)
	return await appDataSource.query(`
		SELECT * FROM users
		WHERE email = ?
	`, [ email ]
	);
}

const createoAuthUser = async (name, email) => {
	return await appDataSource.query(
		`INSERT INTO users
			(email, username)
		VALUES 
			(?,?)
		`,
		[ email, name ]
	);
}

module.exports = {
  createUser,
  getUserData,
  createoAuthUser,
}