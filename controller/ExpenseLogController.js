const {isValidEmail} = require("../Utils/MiscellaneousUtils");
const {findUserDao} = require("../dao/UserDao");
const {createExpenseLogEntryDao, findAllOwnedToByEmailDao, findAllOwnedByEmailDao} = require("../dao/ExpensesLogDao");


exports.createExpenseLogEntryController = async (req, res) => {
    try {
        const userEmail = req.body.ownedTo;
        console.log(`Finding user data of ${userEmail}`);
        if (!isValidEmail(userEmail))
            return res.status(400).json({
                message: "Invalid Email Format"
            });
        const userData = await findUserDao(userEmail);
        if (!userData)
            return res.status(404).json({
                message: "User not found"
            });
        if (typeof req.body.totalExpense !== "number" && req.body.totalExpense > 0)
            return res.status(400).json({
                message: "unexpected totalExpense value"
            });
        if (!req.body.ownedBy || req.body.ownedBy.length === 0)
            return res.status(400).json({
                message: "ownedBy array is required"
            });
        const amountPerPerson = req.body.totalExpense / req.body.ownedBy.length;
        await createExpenseLogEntryDao({
            expensePerPerson: amountPerPerson,
            ownedTo: req.body.ownedTo,
            ownedBy: req.body.ownedBy
        })
        return res.status(201).json({
            message: "expenses have been added"
        });
    } catch (e) {
        if (e.message.includes("Invalid Email"))
            return res.status(400).json({
                message: e.message
            })

        console.error(`Error ${e.message} in createExpenseLogEntryController function`);
        return res.status(500).json({
            message: "internal server error saving user's expenses."
        });
    }
}

exports.findUserExpenseDetails = async (req, res) => {
    try {
        const ownerId = req.params.emailId;
        console.log(`Requesting to find user data of ${ownerId}`);
        if (!isValidEmail(ownerId))
            return res.status(400).json({
                message: "Invalid Email Format"
            });
        const userData = await findUserDao(ownerId);
        if (!userData)
            return res.status(404).json({
                message: "User not found"
            });
        const emailOfDifferentUser = req.query.userEmail;
        const [userOwnedToData, userOwnedByData] = await Promise.all([findAllOwnedToByEmailDao(ownerId, emailOfDifferentUser), findAllOwnedByEmailDao(ownerId, emailOfDifferentUser)]);
        console.log(`Found user data of ${ownerId}`);
        // TODO : Merge these two functions after merging its DAO
        const expensesOwnedToUser = {};
        userOwnedToData.forEach(data => {
            expensesOwnedToUser[data.ownedBy] = (expensesOwnedToUser[data.ownedBy] || 0) + data.expense;
        });
        const expensesOwnedByUser = {};
        userOwnedByData.forEach(data => {
            expensesOwnedByUser[data.ownedTo] = (expensesOwnedByUser[data.ownedTo] || 0) + data.expense;
        });
        return res.status(200).json({
            message: "User Details found",
            data: {
                userData, expensesOwnedByUser, expensesOwnedToUser
            }
        });
    } catch (e) {
        console.error(`Error ${e.message} in findUserDetailsController function`);
        return res.status(500).json({
            message: "internal server error while trying to find the user"
        });
    }
}
