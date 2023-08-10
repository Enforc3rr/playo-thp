const mongoose = require("mongoose");

const qrCodeMetaDataSchema = new mongoose.Schema({
    generatedBy: {
        type: String,
        required: true,
        index: true
    },
    generatedAt : {
        type : Date,
        required: true,
        default : Date.now()
    },
    fileName : {
        type: String,
        required: true,
        index : true
    },
    contentToEncode : {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("qrCodeMetaData", qrCodeMetaDataSchema);

