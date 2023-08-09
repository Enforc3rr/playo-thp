const mongoose = require("mongoose");

const expensesLogSchema = new mongoose.Schema({
    expense: {
        type: Number,
        required: true
    },
    ownedTo: {
        type: String,
        required: true,
        index: true
    },
    ownedBy: {
        type: String,
        required: true,
        index: true
    }
}, {
    timestamps: true,
    versionKey: false
});


module.exports = mongoose.model("expense_log", expensesLogSchema);