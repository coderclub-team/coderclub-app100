"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateOTP() {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    if (process.env.NDOE_ENV !== "production") {
        OTP = "998877";
    }
    // one hour from now
    const OtpExpiryDate = new Date(Date.now() + 60 * 60 * 1000);
    return {
        OTP,
        OtpExpiryDate,
    };
}
exports.default = generateOTP;
