const express = require("express");
const app = express();
const dotenv = require("dotenv");
const {userRouter} = require("./routes/UserRoutes");
const {logRequests} = require("./middleware/LoggingMiddleware");
const {databaseConnection} = require("./configuration/DatabaseConfiguration");
const {expensesLogRouter} = require("./routes/ExpensesLogRoutes");
const {qrCodeRouter} = require("./routes/QRCodeRoutes");
dotenv.config({path: "./configuration/config.env"});
require("console-stamp")(console);

const API_V1_PREFIX = "/api/v1/"

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logRequests);

// Routes
app.use(API_V1_PREFIX + "user", userRouter);
app.use(API_V1_PREFIX + "expenses", expensesLogRouter);
app.use(API_V1_PREFIX + "qr", qrCodeRouter);


databaseConnection()
    .then(() => console.log("Connected To DB"))
    .catch(() => console.error("Connection To DB Failed"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Starting server at PORT ${PORT}`));