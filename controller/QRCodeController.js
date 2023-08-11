const {findUserDao} = require("../dao/UserDao");
const {generateQrCode, isValidStringForQRCode, QR_CODE_PATH} = require("../utils/MiscellaneousUtils");
const {
    createQrCodeMetaDataDao,
    fetchAllTheQRCodeGeneratedByAUser,
    findASpecificQrCodeMetaDataEntry
} = require("../dao/QRCodeDao");
const path = require("path");

/*
   * @desc Generate QR code
   * @port 8080
   * @route POST /qr
*/
exports.qrCodeGenerationController = async (req, res) => {
    try {
        const generatedBy = req.body.generatedBy;
        const userAssociated = await findUserDao(generatedBy);
        if (!userAssociated)
            return res.status(404).json({
                message: "User not found"
            });
        const contentToEncode = req.body.contentToEncode;
        if (!isValidStringForQRCode(contentToEncode))
            return res.status(400).json({
                message: "Invalid content to encode"
            });
        const fileName = await generateQrCode(contentToEncode);
        const qrCodeMetaData = await createQrCodeMetaDataDao({fileName, generatedBy, contentToEncode});
        console.log(`QR ${fileName} successfully generated for the user ${req.body.generatedBy}`);
        return res.status(201).json({
            message: `QR ${fileName} successfully generated for the user ${req.body.generatedBy}`,
            data: qrCodeMetaData
        });
    } catch (e) {
        console.error(`Error ${e} in qrCodeGenerationController function`);
        return res.status(500).json({
            message: "internal server error while generating QR code."
        });
    }
}

/*
   * @desc Fetch all QR code metadata of a single user or fetch a single QR code.
   * @port 8080
   * @route GET /qr/:emailId
   * @QueryParam fileName
*/
exports.fetchGeneratedQrCodeController = async (req, res) => {
    try {
        const generatedBy = req.params.emailId;
        const userAssociated = await findUserDao(generatedBy);
        if (!userAssociated)
            return res.status(404).json({
                message: "User not found"
            });
        if (!req.query.fileName) {
            const data = await fetchAllTheQRCodeGeneratedByAUser(generatedBy);
            return res.status(200).json({
                data,
                message: `QR meta data of ${generatedBy}`
            });
        }
        const fileName = req.query.fileName;
        console.log(`Searching for QR code ${fileName} of ${generatedBy}`);
        const qrCodeMetaDataOfASpecificFile = await findASpecificQrCodeMetaDataEntry(generatedBy, fileName);
        if (!qrCodeMetaDataOfASpecificFile)
            return res.status(404).json({
                message: `QR ${fileName} of ${generatedBy} not found`
            });
        const qrPath = path.join(__dirname, QR_CODE_PATH + fileName);
        return res.status(200).sendFile(qrPath);
    } catch (e) {
        console.error(`Error ${e.message} in qrCodeGenerationController function`);
        return res.status(500).json({
            message: "internal server error while fetching QR code."
        });
    }
}