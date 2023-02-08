const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const verificationRouter = require("./verificationRouter");
const calendarRouter = require("./calendarRouter");

router.use("/user",userRouter);
router.use("/verification", verificationRouter);
router.use("/calendar", calendarRouter);

module.exports = router;