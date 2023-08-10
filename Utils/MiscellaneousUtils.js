const qrCode = require("qrcode");
const uuid = require("uuid");
const path = require("path");

const QR_CODE_PATH = "../qr/";
const QR_CODE_EXTENSION = ".png";

const isValidEmail = (email) => {
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email && email !== '' && email.match(emailFormat))
        return true;
    console.warn(`Invalid Email Detected ${email}`);
    return false;
}

const isValidStringForQRCode = (contentToEncode) => {
    const validFormat = /^[a-zA-Z0-9]*$/;
    if (contentToEncode && contentToEncode.match(validFormat) && contentToEncode.length < 7)
        return true;
    console.warn(`Invalid content to encode format Detected ${contentToEncode}`);
    return false;
}

const generateQrCode = async (contentToEncode) => {
    return new Promise((resolve, reject) => {
        const fileName = uuid.v4() + QR_CODE_EXTENSION;
        qrCode.toFile(path.join(__dirname, QR_CODE_PATH + fileName), contentToEncode, {
            errorCorrectionLevel: 'H'
        }, (err) => {
            if (err)
                reject(err.message);
            resolve(fileName);
        })
    })
}

module.exports = {
    QR_CODE_PATH,
    QR_CODE_EXTENSION,
    generateQrCode,
    isValidStringForQRCode,
    isValidEmail
}