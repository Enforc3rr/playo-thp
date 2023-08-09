const userDatabase = require("../models/UserModel");

exports.createUserDao = async (userData) => {
    try {
        return await userDatabase.create(userData);
    } catch (e) {
        console.error(`Error ${e.message} occurred while saving user data`);
        throw new Error(e.message);
    }
}

exports.findUser = async (emailId) => {
    try {
        return await userDatabase.findOne({emailId}, {firstName: 1, lastName: 1, emailId: 1});
    } catch (e) {
        console.error(`Error ${e.message} occurred while finding the user data`);
        throw new Error(e.message);
    }
}