const calendarDao = require("../models/calendarDao")

const getTestInfo = async(testCategoryId) =>{
    return await calendarDao.getTestInfo(testCategoryId)
};

const createUserCalendar = async(userId, title, content) =>{
    return await calendarDao.createUserCalendar(userId, title, content)
};

const getUserInfo = async(userId) =>{
    return await calendarDao.getUserInfo(userId)
};

const updateCalendar = async(userId, startDate, endDate) => {
    return await calendarDao.patchCalendar(userId, startDate, endDate)
};

module.exports = {
    getTestInfo,
    createUserCalendar,
    getUserInfo,
    updateCalendar,
}