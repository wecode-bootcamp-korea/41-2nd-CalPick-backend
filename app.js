const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const createApp = () => {
    const app = express();
    
    app.use(cors());
    app.use(morgan("tiny"));
    app.use(express.json());

    return app;
}

module.exports = {
    createApp
}
