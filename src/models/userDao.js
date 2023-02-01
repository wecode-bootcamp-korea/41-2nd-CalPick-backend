const { appDataSource } = require("../databases/database");

const createUser = async(email, password, name) => {
    return appDataSource.query(
        `INSERT INTO users(
            email,
            password,
            username
        )VALUES (?,?,?)
        `,
        [email, password, name]
    );
};

module.exports = {
    createUser,
}