const {isValidEmail} = require("../Utils/MiscellaneousUtils");
const {findUserDao} = require("../dao/UserDao");
const {createExpenseLogEntryDao} = require("../dao/ExpensesLogDao");


exports.createExpenseLogEntryController = async (req,res) =>{
    try {
        const userEmail = req.body.ownedTo;
        console.info(`Finding user data of ${userEmail}`);
        if (!isValidEmail(userEmail))
            return res.status(400).json({
                message: "Invalid Email Format"
            });
        const userData= await findUserDao(userEmail);
        if (!userData)
            return res.status(400).json({
                message: "User not found"
            });
        if(typeof req.body.totalExpense !== "number" && req.body.totalExpense > 0)
            return res.status(400).json({
                message : "unexpected totalExpense value"
            });
        if(!req.body.ownedBy || req.body.ownedBy.length === 0)
            return res.status(400).json({
                message: "ownedBy array is required"
            });
        const amountPerPerson = req.body.totalExpense / req.body.ownedBy.length ;
        await createExpenseLogEntryDao({expensePerPerson : amountPerPerson , ownedTo : req.body.ownedTo , ownedBy : req.body.ownedBy})
        return res.status(201).json({
           message : "expenses have been added"
        });
    }catch (e) {
        if(e.message.includes("Invalid Email"))
            return res.status(400).json({
                message : e.message
            })

        console.error(`Error ${e.message} in createExpenseLogEntryController function`);
        return res.status(500).json({
            message: "internal server error saving user's expenses."
        });
    }
}