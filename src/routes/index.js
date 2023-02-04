const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const verificationRouter = require("./verificationRouter");

router.use("/users", userRouter.router);
router.use("/verification", verificationRouter);

module.exports = router;