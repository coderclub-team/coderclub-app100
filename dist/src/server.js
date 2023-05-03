"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const database_1 = __importDefault(require("./database"));
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config().parsed;
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const authGaurd_middleware_1 = __importDefault(require("./middlewares/authGaurd.middleware"));
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const productCategory_router_1 = __importDefault(require("./routes/product/productCategory.router"));
const productSubCategory_router_1 = __importDefault(require("./routes/product/productSubCategory.router"));
const ProductMaster_router_1 = __importDefault(require("./routes/product/ProductMaster.router"));
const node_fs_1 = __importDefault(require("node:fs"));
const app_config = node_fs_1.default.readFileSync(node_path_1.default.join(__dirname, "../public/data/app_config.json"), "utf-8");
const appconfig = JSON.parse(app_config);
// Set the base URL and store it in app.locals
const app = (0, express_1.default)();
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)());
// parse application/json
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
console.log("Connecting to DB", node_path_1.default.join("public"));
(0, database_1.default)()
    .then(() => {
    console.log("Connected to DB");
})
    .catch((err) => {
    console.log("Error connecting to DB", err);
});
app.get("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
app.use("/api", auth_router_1.default);
app.use("/api/users", authGaurd_middleware_1.default, user_router_1.default);
app.use("/api/productMasters", authGaurd_middleware_1.default, ProductMaster_router_1.default);
app.use("/api/productcategories", productCategory_router_1.default);
app.use("/api/productsubcategories", productSubCategory_router_1.default);
app.get("/api/app/config", (req, res) => {
    const host = req.protocol + "://" + req.get("host");
    appconfig.applogo[0].image = host + "/" + appconfig.applogo[0].image;
    appconfig.splashlogo[0].image = host + "/" + appconfig.splashlogo[0].image;
    appconfig.walkthrogh.forEach((item) => {
        item.image = host + "/" + item.image;
    });
    res.status(200).json(appconfig);
});
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
