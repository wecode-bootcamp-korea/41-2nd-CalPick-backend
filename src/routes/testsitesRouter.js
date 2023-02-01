const express = require("express");

const router = express.Router();

const { authHandler } = require("../middlewares/auth");

const testSitesControllers = require("../controllers/testsitesController");

router.get("",  authHandler, testSitesControllers.getTests);

module.exports = router;