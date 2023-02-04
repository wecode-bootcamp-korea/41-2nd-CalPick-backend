const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./src/routes");
const { globalErrorHandler } = require("./src/middlewares/errorHandler");

const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(morgan("tiny"));
    app.use(express.json());
    app.use(routes);
    app.use(globalErrorHandler);

    return app;
}

module.exports = {
  createApp,
}
