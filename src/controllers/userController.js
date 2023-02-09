const userService = require("../services/userService");
const { catchAsync } = require("../middlewares/errorHandler");
const { detectError } = require("../utils/detectError");


const signup = catchAsync(async (req, res) => {
  const { email, password, name} = req.body;

  if (!password || !email || !name) throw new Error("KEY_ERROR"); 

  await userService.signUp(email, password, name);

  res.status(201).json({ message: "SIGNUP_SUCCESS" });
});


const signin = catchAsync(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) detectError("NO INPUT", 404);

	const accessToken = await userService.signIn(email, password);

	res.status(201).json({ accessToken: accessToken });
});


const oAuth = catchAsync(async (req, res) => {
	const { code } = req.query;

	if (!code) detectError("NO AUTH CODE", 401);

	const accessToken = await userService.oAuth(code);

	res.status(201).json({ accessToken: accessToken });
});


module.exports = {
	signup,
	signin,
	oAuth,
}