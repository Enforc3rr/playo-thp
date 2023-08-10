const expensesLogDatabase = require("../models/ExpensesLogModel");
const mongoose = require("mongoose");
const {isValidEmail} = require("../Utils/MiscellaneousUtils");
const {createUserDao} = require("./UserDao");

// TODO : (findAllOwnedToByEmailDao & findAllOwnedByEmailDao) can be combined using using OR condition

exports.findAllOwnedToByEmailDao = async (email, emailOfOwnedByUser) => {
    try {
        if (!emailOfOwnedByUser)
            return await expensesLogDatabase.find({ownedTo: email}, {expense: 1, ownedBy: 1, _id: 0});
        else
            return await expensesLogDatabase.find({ownedTo: email, ownedBy: emailOfOwnedByUser}, {
                expense: 1,
                ownedBy: 1,
                _id: 0
            });

    } catch (e) {
        console.error(`Error ${e.message} occurred while fetching fetching owned to data`);
        throw new Error(e.message);
    }
}

exports.findAllOwnedByEmailDao = async (email, emailOfOwnedByUser) => {
    try {
        if (!emailOfOwnedByUser)
            return await expensesLogDatabase.find({ownedBy: email}, {expense: 1, ownedTo: 1, _id: 0});
        else
            return await expensesLogDatabase.find({ownedBy: email, ownedTo: emailOfOwnedByUser}, {
                expense: 1,
                ownedTo: 1,
                _id: 0
            });
    } catch (e) {
        console.error(`Error ${e.message} occurred while fetching owned by data`);
        throw new Error(e.message);
    }
}

exports.createExpenseLogEntryDao = async (expenseLogData) => {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        for (const ownedByEmail of expenseLogData.ownedBy) {
            if (!isValidEmail(ownedByEmail))
                throw new Error(`Invalid Email ${ownedByEmail} found`);
            await createUserDao({emailId: ownedByEmail});
            await expensesLogDatabase.create({
                expense: expenseLogData.expensePerPerson,
                ownedTo: expenseLogData.ownedTo,
                ownedBy: ownedByEmail
            });
        }
        await session.commitTransaction();
    } catch (e) {
        console.error(`Error ${e.message} occurred while creating expense log entry`);
        await session.abortTransaction();
        throw new Error(e.message);
    } finally {
        await session.endSession();
    }
}



