const { catchAsync } = require("../middlewares/errorHandler");
const calendarService = require("../services/calendarService");

const getTestInfo = catchAsync( async(req,res) => {
    const { testCategoryId } = req.body;
    const result = await calendarService.getTestInfo(testCategoryId);
    return res.status(200).json({data:result})
});

const createUserCalendar = catchAsync(async (req, res) => {
	const userId = req.userId;
	const { title, content } = req.body;

	if (!title || !content) detectError("INPUT ERROR");

	await calendarService.createUserCalendar(userId, title, content);

	res.status(201).json({ message: "POST CREATED!" });
}); 

const getUserInfo = catchAsync(async(req,res) => {
    const userId = req.userId

    const result = await calendarService.getUserInfo(userId);
    return res.status(200).json({data:result})
 
 });

 const updateCalendar = catchAsync(async(req,res) =>{
     const userId = req.userId

     const result = await calendarService.updateCalendar(userId);
     return res.status(200).json({data: result})
 });

module.exports = {
    getTestInfo,
    createUserCalendar,
    getUserInfo,
    updateCalendar,
}