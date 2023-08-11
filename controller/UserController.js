const {createUserDao, findAllUsersDao, findUserDao} = require("../dao/UserDao");
const {isValidEmail} = require("../utils/MiscellaneousUtils");

/*
   * @desc Create User
   * @port 8080
   * @route POST /user
*/
exports.createUserController = async (req, res) => {
    try {
        console.log(`Saving User Details`);
        if (!isValidEmail(req.body.emailId))
            return res.status(400).json({
                message: "Invalid Email Format"
            });
        const preExistingUser = await findUserDao(req.body.emailId);
        if(!preExistingUser){
            req.body["joinedAt"] = Date.now();
        }
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

/*
   * @desc Find all users/data of single user
   * @port 8080
   * @route GET /user
   * @QueryParam emailId
*/
exports.findAllUsersController = async (req, res) => {
    try {
        const emailId = req.query.emailId;
        if (!emailId) {
            console.log(`Requesting to find all user data`);
            const allUserData = await findAllUsersDao();
            return res.status(200).json({
                message: "User Details found",
                data: allUserData
            });
        }
        const userData = await findUserDao(emailId);
        if (!userData)
            return res.status(404).json({
                message: "User not found"
            });
        return res.status(200).json({
            message: "User Details found",
            data: userData
        });
    } catch (e) {
        console.error(`Error ${e.message} in findAllUserController function`);
        return res.status(500).json({
            message: "internal server error while trying to find the user"
        });
    }
}

