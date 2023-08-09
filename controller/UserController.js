const {createUserDao, findUser} = require("../dao/UserDao");
const {isValidEmail} = require("../Utils/MiscellaneousUtils");

exports.createUserController = async (req, res) => {
    try {
        console.info(`Saving User Details`);
        if (!isValidEmail(req.body.emailId))
            return res.status(400).json({
                message: "Invalid Email Format"
            });
        const savedUser = await createUserDao(req.body);
        console.info(`Saved User Details ${req.body.emailId}`);
        return res.status(201).json({
            message: "User details saved", data: savedUser
        });
    } catch (e) {
        if (e.message.includes("duplicate")) {
            console.info(`Duplicate email ${req.body.emailId} received`);
            return res.status(400).json({
                message: `${req.body.emailId} is already registered`
            });
        }
        console.error(`Error ${e.message} in createUserController function`);
        return res.status(500).json({
            message: "internal server error while creating the user"
        });
    }
}

exports.findUserDetailsController = async (req, res) => {
    try {
        const userEmail = req.body.emailId;
        console.info(`Requesting to find user data of ${userEmail}`);
        if (!isValidEmail(userEmail))
            return res.status(400).json({
                message: "Invalid Email Format"
            });
        const [userData, userOwnedToData, userOwnedByData] = await Promise.all([findUser(userEmail), userOwnedToData(userEmail), userOwnedByData(userEmail)]);
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

