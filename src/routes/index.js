const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const verificationRouter = require("./verificationRouter");

router.use("/user",userRouter);
router.use("/verification",verificationRouter);

module.exports = router;