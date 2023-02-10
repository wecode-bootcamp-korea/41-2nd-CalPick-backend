const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "../../.env")
});

const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { kakaoOAuth, googleOAuth } = require("./util/oAuth");
const { emailValidationCheck, passwordValidationCheck } = require("../utils/validation-check");
const { detectError } = require("../utils/detectError");
const userDao = require("../models/userDao");

 
const JSON_SECRET_KEY = process.env.JSON_SECRET_KEY;


const handlerOAuthLogin = async (name, email, iss, socialId) => {
	const result = await userDao.createoAuthUser(name, email, iss, socialId);
	const userId = result.insertId;

	const accessToken = jwt.sign({ "userId": userId, "userName": name, "userEmail": email }, JSON_SECRET_KEY);
	
	return accessToken;
}

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

const oAuth = async (code, hostName) => {
	if (hostName === "accounts.google.com") {
		const { name, email, iss, socialId } = await googleOAuth(code);

		return await handlerOAuthLogin(name, email, iss, socialId);
	}

	if (hostName === "kauth.kakao.com") {
		const { name, email, iss, socialId } = await kakaoOAuth(code);

		return await handlerOAuthLogin(name, email, iss, socialId);
	}
}


module.exports = {
  signUp,
	signIn,
	oAuth,
}