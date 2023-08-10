const express = require("express");
const {createUserController, findUserDetailsController, findAllUsersController} = require("../controller/UserController");
const userRouter = express.Router();

userRouter.route("/")
    .post(createUserController)
    .get(findUserDetailsController);



module.exports = {
    userRouter
};