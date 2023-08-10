const userDatabase = require("../models/UserModel");

exports.createUserDao = async (userData) => {
    try {
        return await userDatabase.findOneAndUpdate({emailId: userData.emailId}, userData, {new: true, upsert: true});
    } catch (e) {
        console.error(`Error ${e.message} occurred while saving user data`);
        throw new Error(e.message);
    }
}

exports.findAllUsersDao = async () => {
    try {
        return await userDatabase.find({
            joinedAt: {$exists: true, $ne: null}
        }, {firstName: 1, lastName: 1, emailId: 1, joinedAt: 1});
    } catch (e) {
        console.error(`Error ${e.message} occurred while saving user data`);
        throw new Error(e.message);
    }
}

exports.findUserDao = async (emailId) => {
    try {
        return await userDatabase.findOne({emailId}, {firstName: 1, lastName: 1, emailId: 1});
    } catch (e) {
        console.error(`Error ${e.message} occurred while finding the user data`);
        throw new Error(e.message);
    }
}