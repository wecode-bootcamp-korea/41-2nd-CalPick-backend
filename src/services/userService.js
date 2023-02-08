const { emailValidationCheck, passwordValidationCheck } = require("../utils/validation-check");
const { detectError } = require("../utils/detectError");

const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "../../.env")
})

const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");

const GOOGLE_CLIENT_KEY = process.env.GOOGLE_CLIENT_KEY;
const GOOGLE_SECRET_KEY = process.env.GOOGLE_SECRET_KEY;
const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URI;
const JSON_SECRET_KEY = process.env.JSON_SECRET_KEY;


const signUp = async (email, password, name) => {
  await emailValidationCheck(email);
  await passwordValidationCheck(password);

  const saltRounds = 12;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return userDao.createUser(email, hashedPassword, name);
};

const signIn = async (enteredEmail, enteredPassword) => {
	const [ user ] = await userDao.getUserData(enteredEmail);
	if (!user) detectError("NO USER DATA", 404);

	const { id, email, password, name } = user;
	const passwordsAreEqual = await bcrypt.compare(enteredPassword, password);

	if (!passwordsAreEqual) detectError("PASSWORDS ARE NOT EQUAL", 404);
	const accessToken = jwt.sign({ "userId": id, "userName": name, "userEmail": email }, JSON_SECRET_KEY);

	return accessToken;
}

const googleLogin = async (code) => {
	const res = await axios({
		url: "https://oauth2.googleapis.com/token",
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		params: {
			"client_id": GOOGLE_CLIENT_KEY,
			"client_secret": GOOGLE_SECRET_KEY,
			"code": code,
			"grant_type": "authorization_code",
			"redirect_uri": REDIRECT_URL
		}
	}).then((res) => {
		return res.data;
	}).catch((err) => {
		detectError("NOT CONNECTED", 404);
	})

	if (!res || !res.id_token) detectError("NO AUTH TOKEN", 403);
	
	const ID_TOKEN = res.id_token;
	const { email, email_verified, name} = jwt.decode(ID_TOKEN);
	
	if (!email_verified) detectError("NOT VERIFED EMAIL", 401);

	const result = await userDao.createoAuthUser(name, email);
	const userId = result.insertId;

	const accessToken = jwt.sign({ "userId": userId, "userName": name, "userEmail": email }, JSON_SECRET_KEY);
	
	return accessToken;
}

module.exports = {
  signUp,
	signIn,
	googleLogin,
}