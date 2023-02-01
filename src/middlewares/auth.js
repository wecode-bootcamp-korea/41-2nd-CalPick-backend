const path = require("path");
require("dotenv").config({
	path: path.resolve(__dirname, "../../.env")
});

const jwt = require("jsonwebtoken");

const { detectError } = require('../utils/detectError');

const JSON_SECRET_KEY = process.env.JSON_SECRET_KEY;

const authHandler = async(req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (!token) detectError("NO TOKEN", 404);
	
		const decoded = await jwt.verify(token, JSON_SECRET_KEY);
		const userId = decoded.userId;
		const userEmail = decoded.userEmail;
		const userName = decoded.userName;
		
		req.userId = userId;
		req.userEmail = userEmail;
		req.userName = userName;

		next();
	} catch(err) {
		next(err);
	}
}


module.exports = {
	authHandler
}