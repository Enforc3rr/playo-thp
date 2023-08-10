const express = require("express");
const {createExpenseLogEntryController, findUserExpenseDetails} = require("../controller/ExpenseLogController");
const expensesLogRouter = express.Router();

expensesLogRouter.route("/")
    .post(createExpenseLogEntryController);
expensesLogRouter.route("/:emailId")
    .get(findUserExpenseDetails);



module.exports = {
    expensesLogRouter
};