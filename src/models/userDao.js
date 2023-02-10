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
	return await appDataSource.query(`
		SELECT * FROM users
		WHERE email = ?
	`, [ email ]
	);
}

const createoAuthUser = async (name, email, iss, socialId) => {
	return await appDataSource.query(
		`INSERT INTO users
			(username, email, social_id, social_type_id)
		VALUES 
			(?, ?, ?, ?)
		`,
		[ name, email, iss, socialId ]
	);
}

module.exports = {
  createUser,
  getUserData,
  createoAuthUser,
}