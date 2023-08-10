const qrCodeDatabase = require("../models/QRCodeMetaDataModel");

exports.createQrCodeMetaDataDao = async (qrCodeMetaData) => {
    try {
        return await qrCodeDatabase.create(qrCodeMetaData);
    } catch (e) {
        console.error(`Error ${e.message} occurred while creating the qr meta data`);
        throw new Error(e.message);
    }
}

exports.fetchAllTheQRCodeGeneratedByAUser = async (userEmail) => {
    try {
        return await qrCodeDatabase.find({generatedBy: userEmail}, {generatedBy: 1, generatedAt: 1, fileName: 1});
    } catch (e) {
        console.error(`Error ${e.message} occurred while fetching all the qr meta data of the user ${userEmail}`);
        throw new Error(e.message);
    }
}

exports.findASpecificQrCodeMetaDataEntry = async (userEmail, fileName) => {
    try {
        return await qrCodeDatabase.findOne({generatedBy: userEmail, fileName: fileName});
    } catch (e) {
        console.error(`Error ${e.message} occurred while fetching the qr meta data ${fileName} of the user ${userEmail}`);
        throw new Error(e.message);
    }
}