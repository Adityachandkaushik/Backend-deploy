// backend/src/app.js
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");
const languageMiddleware = require("./middlewares/language.middleware");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Language middleware BEFORE routes
app.use(languageMiddleware);

app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
