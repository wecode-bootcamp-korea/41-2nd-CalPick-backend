const { catchAsync } = require("../middlewares/errorHandler");
const calendarService = require("../services/calendarService");

const getTestInfo = catchAsync( async(req,res) => {
    const testInfo  = await calendarService.getTestInfo();

    return res.status(200).json(testInfo);
});

const createUserCalendar = catchAsync(async (req, res) => {
	const userId = req.userId;
	const { title, content, start, end } = req.body;

	if (!title || !content) detectError("INPUT ERROR");

	await calendarService.createUserCalendar(userId, title, content, start, end);

	return res.status(201).json({ message: "POST CREATED!" });
}); 

const getCalendar = catchAsync(async(req,res) => {
    const userId = req.userId

    const result = await calendarService.getCalendar(userId);
    return res.status(200).json({data:result})
 
 });

 const updateCalendar = catchAsync(async(req,res) =>{
    const {id, title, content, start, end} = req.body

    const calendarId = id.id;
    await calendarService.updateCalendar(calendarId, title, content, start, end);
    return res.status(201).json({ message: "CALENDAR UPDATED!" })
 });

 const deleteCalendar = catchAsync(async(req, res) => {
     const {id} = req.body

     const calendarId = id.id;
    await calendarService.deleteCalendar(calendarId);
    return res.status(200).json({ message: "CALENDAR DELETED!" })
 })

module.exports = {
    getTestInfo,
    createUserCalendar,
    getCalendar,
    updateCalendar,
    deleteCalendar
}