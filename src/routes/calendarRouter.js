const express = require("express");
const router = express.Router();

const { authHandler } = require("../middlewares/auth");
const calendarController = require("../controllers/calendarController")

router.get("", authHandler, calendarController.getCalendar);
router.get("/tests", authHandler, calendarController.getTestInfo);
router.post("", authHandler, calendarController.createUserCalendar);
router.patch("", authHandler, calendarController.updateCalendar);
router.delete("", authHandler, calendarController.deleteCalendar);

module.exports = router;