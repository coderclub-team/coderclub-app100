"use strict";
// a
// a middle ware to check if the user is logged in or not
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
exports.default = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.body.user = decoded;
        console.log("payload", req.body.newUser);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
