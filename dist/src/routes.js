"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("./models/User.model"));
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.default.create(req.body);
        const token = jsonwebtoken_1.default.sign({ id: user.id }, "secret");
        res.json({ token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.default.findOne({
            where: { LoginName: req.body.username },
        });
        if (!user)
            throw new Error("User not found");
        const isMatch = yield user.comparePassword(req.body.password);
        if (!isMatch)
            throw new Error("Invalid password");
        const token = jsonwebtoken_1.default.sign({ id: user.id }, "secret");
        res.json({ token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
exports.default = router;
