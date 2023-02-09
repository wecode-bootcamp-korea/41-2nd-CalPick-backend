
const { appDataSource } = require("../databases/database");

const getTestInfo = async() =>{
    return await appDataSource.query(`
    SELECT DISTINCT
        tc.name 								                        AS title,
        "ticket"							                            AS className,
        DATE_FORMAT(t.test_date, "%Y-%m-%d")							AS start
        FROM tests t
        JOIN test_categories tc 		                                ON t.test_category_id = tc.id
        LEFT JOIN orders o                                              ON t.id = o.test_id
        LEFT JOIN users u                                               ON u.id = o.user_id
        LEFT JOIN calendars c                                           ON u.id = c.user_id;
        `,
    );
};

const createUserCalendar = async (userId, title, content, startDate, endDate) => {
    await appDataSource.query(
        `INSERT INTO calendars(
            user_id,
            title,
            content,
            start_date,
            end_date
        ) VALUES (?,?,?,?,?)
        `,
        [userId, title, content, startDate, endDate]
    )
}

const getCalendar = async(userId) => {
    return appDataSource.query(
      `SELECT
        calendars.id                                    AS id,
        calendars.title                                 AS title,
        calendars.content                               AS content,  
        date_format(calendars.start_date, '%Y-%m-%d')   AS start,
        date_format(calendars.end_date, '%Y-%m-%d')     AS end,
        calendars.class_name                            AS className,
        calendars.color                                 AS color,
        calendars.editable                              AS editable,
        calendars.start_editable                        AS startEditable,
        calendars.duration_editable                     AS durationEditable,
        calendars.resource_editable                     AS resourceEditable
    FROM
        users
    INNER JOIN calendars                                ON users.id = calendars.user_id
    LEFT JOIN orders                                    ON orders.user_id = users.id
    LEFT JOIN tests                                     ON orders.test_id = tests.id
    WHERE 
        users.id = ?
      `,
      [userId]
)};

const updateCalendar = async(calendarId, title, content, start, end) => {
    await appDataSource.query(
        `UPDATE 
            calendars 
        SET 
            title = ?,
            content = ?,
            start_date = ?, 
            end_date = ?
        WHERE 
            id = ?; 
        `,[title, content, start, end, calendarId]
)};

const deleteCalendar = async (calendarId) => {
    await appDataSource.query(
        `DELETE FROM
            calendars
        WHERE
            id = ?`, [calendarId]
    )
}

module.exports = {
    getTestInfo,
    createUserCalendar,
    getCalendar,
    updateCalendar,
    deleteCalendar
}