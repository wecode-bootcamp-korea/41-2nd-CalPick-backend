const path = require("path");
require("dotenv").config({
	path: path.resolve(__dirname, "../../../.env")
});

const REDIRECT_URL = process.env.REDIRECT_URI;


const requestAccessToken = async(code, clientKey, secretKey) => {
	const res = await axios({
		url: "https://kauth.kakao.com/oauth/token",
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
		},
		params: {
			"client_id": clientKey,
			"client_secret": secretKey,
			"code": code,
			"grant_type": "authorization_code",
			"redirect_uri": REDIRECT_URL
		}
	}).then((res) => {
		console.log(res);
		return res.data;
	}).catch((err) => {
		detectError("NOT CONNECTED", 404);
	});

	return res;
}


const kakaoOAuth = async (code) => {
	try {
		const KAKAO_CLIENT_KEY = process.env.KAKAO_CLIENT_KEY;
		const KAKAO_SECRET_KEY = process.env.KAKAO_SECRET_KEY;
	
		const { id_token } = await requestAccessToken(code, KAKAO_CLIENT_KEY, KAKAO_SECRET_KEY);
	
		if (!id_token) detectError("NO AUTH TOKEN", 403);

		const { email, nickname, iss } = jwt.decode(id_token);
	
		const name = nickname;
		const socialId = 1;
	
		return { name, email, iss, socialId };
	} catch(err) {
		throw err;
	}
};

const googleOAuth = async (code) => {
	try {
		const GOOGLE_CLIENT_KEY = process.env.GOOGLE_CLIENT_KEY;
		const GOOGLE_SECRET_KEY = process.env.GOOGLE_SECRET_KEY;
	
		const { id_token } = await requestAccessToken(code, GOOGLE_CLIENT_KEY, GOOGLE_SECRET_KEY);
	
		if (!id_token) detectError("NO AUTH TOKEN", 403);
		
		const { email, name, iss } = jwt.decode(id_token);
		const socialId = 3;
	
		return { name, email, iss, socialId };
	} catch(err) {
		throw err;
	}
}

module.exports = {
	kakaoOAuth,
	googleOAuth
}