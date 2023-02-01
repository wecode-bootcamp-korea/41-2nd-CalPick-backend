const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const verificationRouter = require("./verificationRouter");
const testSitesRouter = require("./testsitesRouter");

router.use("/users", userRouter.router);
router.use("/verification", verificationRouter);
router.use("/tests", testSitesRouter);


module.exports = router;