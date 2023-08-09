const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path : "./configuration/configuration.env"});

app.use(express.json());
app.use(express.urlencoded({extended : true}));





const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Starting server at PORT ${PORT}`));