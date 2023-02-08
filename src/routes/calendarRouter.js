const express = require("express");
const router = express.Router();

const { authHandler } = require("../middlewares/auth");
const calendarController = require("../controllers/calendarController")

router.post("", authHandler, calendarController.createUserCalendar);
router.get("/user", authHandler, calendarController.getUserInfo);
router.post("/tests", authHandler, calendarController.getTestInfo);
router.patch("/user", authHandler, calendarController.updateCalendar);

module.exports = router;