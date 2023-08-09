const express = require("express");
const app = express();
const dotenv = require("dotenv");
const {userRouter} = require("./routes/UserRoutes");
const {logRequests} = require("./middleware/LoggingMiddleware");
const {databaseConnection} = require("./configuration/DatabaseConfiguration");
dotenv.config({path: "./configuration/configuration.env"});
require("console-stamp")(console);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logRequests);
// Routers
app.use(userRouter);


databaseConnection()
    .then(() => console.info("Connected To DB"))
    .catch(() => console.error("Connection To DB Failed"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Starting server at PORT ${PORT}`));