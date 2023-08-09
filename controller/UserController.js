const {createUserDao, findUser} = require("../dao/UserDao");
const {isValidEmail} = require("../Utils/MiscellaneousUtils");
const {findAllOwnedToByEmailDao} = require("../dao/ExpensesLogDao");

exports.createUserController = async (req, res) => {
    try {
        console.info(`Saving User Details`);
        if (!isValidEmail(req.body.emailId))
            return res.status(400).json({
                message: "Invalid Email Format"
            });
        req.body["joinedAt"] = Date.now();
        const savedUser = await createUserDao(req.body);
        console.info(`Saved User Details ${req.body.emailId}`);
        return res.status(201).json({
            message: "User details saved", data: savedUser
        });
    } catch (e) {
        console.error(`Error ${e.message} in createUserController function`);
        return res.status(500).json({
            message: "internal server error while creating the user"
        });
    }
}

exports.findUserDetailsController = async (req, res) => {
    try {
        const userEmail = req.param.emailId;
        console.info(`Requesting to find user data of ${userEmail}`);
        if (!isValidEmail(userEmail))
            return res.status(400).json({
                message: "Invalid Email Format"
            });
        const userData= await findUser(userEmail);
        if (!userData)
            return res.status(400).json({
                message: "User not found"
            });
        const [userOwnedToData, userOwnedByData] = await Promise.all([findAllOwnedToByEmailDao(userEmail), findAllOwnedToByEmailDao(userEmail)]);
        console.info(`Found user data of ${userEmail}`);
        return res.status(200).json({
            message: "User Details found",
            data: {
                userData, userOwnedToData, userOwnedByData
            }
        });
    } catch (e) {
        console.error(`Error ${e.message} in findUserDetailsController function`);
        return res.status(500).json({
            message: "internal server error while trying to find the user"
        });
    }
}

