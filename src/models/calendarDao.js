const { appDataSource } = require("../databases/database");

const getTestInfo = async(testCategoryId) =>{
    return appDataSource.query(
        `SELECT DISTINCT
        JSON_OBJECT(
            "id", tc.id,
            "title", tc.name,
            "start", t.test_date
        ) 								AS tests
    FROM tests t
    INNER JOIN test_categories tc 		ON t.test_category_id = tc.id
    WHERE tc.id = ${testCategoryId}
        `,
    )
};

const createUserCalendar = async (userId, title, content) => {
    await appDataSource.query(
        `INSERT INTO calendars(
            user_id,
            title,
            content
        ) VALUES (?,?,?)
        `,
        [userId, title, content]
    )
}

const getUserInfo = async(userId) => {
    return appDataSource.query(
      `SELECT
        users.id                            AS id,
        calendars.title                     AS title,
        tests.test_date                     AS start,
        tests.test_date                     AS end,
        calendars.class_name                AS className,
        calendars.color                     AS color,
        calendars.editable                  AS editable,
        calendars.start_editable            AS startEditable,
        calendars.duration_editable         AS durationEditable,
        calendars.resource_editable         AS resourceEditable
    FROM
        users
    INNER JOIN calendars                    ON users.id = calendars.user_id
    INNER JOIN orders                       ON orders.user_id = users.id
    INNER JOIN tests                        ON orders.test_id = tests.id
    WHERE 
        users.id = ?
      `,
      [userId]
)};

const updateCalendar = async(userId, startDate, endDate) => {
    await appDataSource.query(
        `UPDATE calendars SET start_date = ${startDate}, end_date = ${endDate}
        WHERE calendars.user_id = ${userId}; 
    `
)};

module.exports = {
    getTestInfo,
    createUserCalendar,
    getUserInfo,
    updateCalendar,
}