const path = require("path");

require("dotenv").config({
	path: path.resolve(__dirname, "../../../.env")
});

const { detectError } = require("../../utils/detectError");

const axios = require("axios");
const CryptoJS = require("crypto-js");

const ACCESS_KEY = process.env.NCP_KEY;
const SECRET_KEY = process.env.NCP_SECRET_KEY;
const SERVICE_ID = process.env.SERVICE_ID;
const URL = `https://sens.apigw.ntruss.com/sms/v2/services/${SERVICE_ID}/messages`;  
const URL2 = `/sms/v2/services/${SERVICE_ID}/messages`;
const TIME_STAMP = new Date().getTime().toString();
const MOBILE_NUMBER = process.env.MOBILE_NUMBER;

const sendSMS = async (mobile, verificationCode) => {
	const space = " ";				
	const newLine = "\n";				
	const method = "POST";								

	const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, SECRET_KEY);
	hmac.update(method);
	hmac.update(space);
	hmac.update(URL2);
	hmac.update(newLine);
	hmac.update(TIME_STAMP);
	hmac.update(newLine);
	hmac.update(ACCESS_KEY);

	const hash = hmac.finalize();
	const signature = hash.toString(CryptoJS.enc.Base64);

	const res = await axios({
		method: method,
		url: URL,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"x-ncp-iam-access-key": ACCESS_KEY,
			"x-ncp-apigw-timestamp": TIME_STAMP,
			"x-ncp-apigw-signature-v2": signature
		},
		data: {
			type: "SMS",
			countryCode: "82",
			from: MOBILE_NUMBER,
			subject:"캘픽",
			content: "캘픽에서 보내드리는 인증번호입니다. 타인이 보지 않도록 유의해주세요.",
			messages:[
					{
						"to": mobile,
						"subject":"캘픽",
						"content": `캘픽에서 보내드리는 인증번호입니다. 타인이 보지 않도록 유의해주세요.\n인증번호: ${verificationCode}`,
					}
				]
			}
		}).then(res => {
			console.log(res.data);
			if (res.data.statusCode != 202) detectError("CODE CREATION FAILED", 401);
	}).catch(err => {
		console.log(err);
	});
}

module.exports = {
	sendSMS
}

