const express = require("express");

const router = express.Router();

const { authHandler } = require("../middlewares/auth");
const verificationController = require("../controllers/verificationController");

router.post("", authHandler, verificationController.createVerification);
router.post("/code", authHandler, verificationController.checkVerificationCode);

module.exports = router;