const express = require("express");
const app = express();
const dotenv = require("dotenv");
const {userRouter} = require("./routes/UserRoutes");
const {logRequests} = require("./middleware/LoggingMiddleware");
const {databaseConnection} = require("./configuration/DatabaseConfiguration");
const {expensesLogRouter} = require("./routes/ExpensesLogRoutes");
dotenv.config({path: "./configuration/config.env"});
require("console-stamp")(console);
const API_V1_PREFIX = "/api/v1/"


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logRequests);
// Routers
app.use(API_V1_PREFIX+"user",userRouter);
app.use(API_V1_PREFIX+"expenses",expensesLogRouter);


databaseConnection()
    .then(() => console.info("Connected To DB"))
    .catch(() => console.error("Connection To DB Failed"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Starting server at PORT ${PORT}`));