const express = require("express");
const {qrCodeGenerationController, fetchGeneratedQrCodeController} = require("../controller/QRCodeController");
const qrCodeRouter = express.Router();

qrCodeRouter.route("/")
    .post(qrCodeGenerationController);

qrCodeRouter.route("/:emailId")
    .get(fetchGeneratedQrCodeController);


module.exports = {
    qrCodeRouter
};