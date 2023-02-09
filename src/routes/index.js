const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const verificationRouter = require("./verificationRouter");
const testSitesRouter = require("./testsitesRouter");
const calendarRouter = require("./calendarRouter");

router.use("/users", userRouter);
router.use("/verification", verificationRouter);
router.use("/tests", testSitesRouter);
router.use("/calendar", calendarRouter);

module.exports = router;