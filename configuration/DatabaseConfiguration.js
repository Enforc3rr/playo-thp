const mongoose = require("mongoose");

const databaseConnection = async ()=>{
    await mongoose.connect(process.env.DB);
}

module.exports = {databaseConnection};