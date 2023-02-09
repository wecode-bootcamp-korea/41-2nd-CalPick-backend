const calendarDao = require("../models/calendarDao.js")

const getTestInfo = async() =>{
    return await calendarDao.getTestInfo()
};

const createUserCalendar = async(userId, title, content, startDate, endDate) =>{
    return await calendarDao.createUserCalendar(userId, title, content, startDate, endDate)
};

const getCalendar = async(userId) =>{
    return await calendarDao.getCalendar(userId)
};

const updateCalendar = async(calendarId, title, content, start, end) => {
    return await calendarDao.updateCalendar(calendarId, title, content, start, end)
};

const deleteCalendar = async(calendarId) => {
    return await calendarDao.deleteCalendar(calendarId)
}

module.exports = {
    getTestInfo,
    createUserCalendar,
    getCalendar,
    updateCalendar,
    deleteCalendar
}