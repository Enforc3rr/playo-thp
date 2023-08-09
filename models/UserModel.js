const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    joinedAt : {
        type : Date,
        required: false,
        default : null
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("user", userSchema);

