const { catchAsync } = require("../middlewares/errorHandler");
const userService = require("../services/userService");

const signup = catchAsync(async (req, res) => {
  const { email, password, name} = req.body;

  if (!password || !email || !name) throw new Error("KEY_ERROR"); 

  await userService.signUp(email, password, name);

  res.status(201).json({ message: "SIGNUP_SUCCESS" });
});

module.exports = {
    signup,
}