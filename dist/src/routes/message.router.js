"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Define your routes here
router.post('/alert', (req, res, next) => {
    const { Type, UserGUIDList } = req.body;
    if (!(Type.toUpperCase() === ("CARDEXPIRY" || "LOWBALANCE"))) {
        res.status(400).json({ message: "Invalid request type" });
    }
    if (Array.isArray(UserGUIDList)) {
        res.status(400).json({ message: "UserGUIDList should be an array" });
    }
    try {
        // User.findOne({
        //     where:{
        //         UserGUID:{
        //             [Op.eq]:UserGUIDs
        //         },
        //         Status:{
        //             [Op.eq]:1
        //         },
        //     }
        // })
        res.send("success");
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
