const express = require("express");
const {createUserController} = require("../controller/UserController");
const userRouter = express.Router();

userRouter.route("/")
    .post(createUserController)
    .get();


module.exports = {
    userRouter
};