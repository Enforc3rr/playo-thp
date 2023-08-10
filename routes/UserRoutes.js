const express = require("express");
const {createUserController, findAllUsersController} = require("../controller/UserController");
const userRouter = express.Router();

userRouter.route("/")
    .post(createUserController)
    .get(findAllUsersController);



module.exports = {
    userRouter
};