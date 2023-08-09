const express = require("express");
const {createExpenseLogEntryController} = require("../controller/ExpenseLogController");
const expensesLogRouter = express.Router();

expensesLogRouter.route("/")
    .post(createExpenseLogEntryController)
    .get();


module.exports = {
    expensesLogRouter
};