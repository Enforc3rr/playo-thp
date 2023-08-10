const {createUserDao, findAllUsersDao} = require("../dao/UserDao");
const {isValidEmail} = require("../Utils/MiscellaneousUtils");

exports.createUserController = async (req, res) => {
    try {
        console.log(`Saving User Details`);
        if (!isValidEmail(req.body.emailId))
            return res.status(400).json({
                message: "Invalid Email Format"
            });
        req.body["joinedAt"] = Date.now();
        const savedUser = await createUserDao(req.body);
        console.log(`Saved User Details ${req.body.emailId}`);
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
exports.findAllUsersController = async (req, res) => {
    try {
        console.info(`Requesting to find all user data`);
        const allUserData = await findAllUsersDao();
        return res.status(200).json({
            message: "User Details found",
            data: allUserData
        });
    } catch (e) {
        console.error(`Error ${e.message} in findAllUserController function`);
        return res.status(500).json({
            message: "internal server error while trying to find the user"
        });
    }
}

