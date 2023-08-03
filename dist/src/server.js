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
const sale_router_1 = __importDefault(require("./routes/sale.router"));
const cartitems_router_1 = __importDefault(require("./routes/cartitems.router"));
const userAddresses_route_1 = __importDefault(require("./routes/userAddresses.route"));
const productSubscriptions_router_1 = __importDefault(require("./routes/productSubscriptions.router"));
const handleSequelizeError_1 = __importDefault(require("./middlewares/handleSequelizeError"));
const general_router_1 = require("./routes/general.router");
const wallet_router_1 = __importDefault(require("./routes/wallet.router"));
// const fs = require("fs");
// const app_config = fs.readFileSync(
//   path.join(__dirname, "../public/data/app_config.json"),
//   "utf-8"
// );
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
app.use("/api/users", authGaurd_middleware_1.default, user_router_1.default);
app.use("/api/cartitems", authGaurd_middleware_1.default, cartitems_router_1.default);
app.use("/api/addresses", authGaurd_middleware_1.default, userAddresses_route_1.default);
app.use("/api/productMasters", ProductMaster_router_1.default);
app.use("/api/productcategories", productCategory_router_1.default);
app.use("/api/productsubcategories", productSubCategory_router_1.default);
app.get("/api/app/config", (req, res) => {
    const app_config = {
        splashlogo: [
            {
                image: "splashscreen/splash_logo.gif",
            },
        ],
        applogo: [
            {
                image: "icons/milk_bottle.png",
            },
        ],
        walkthrogh: [
            {
                title: "Pick up",
                description: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
                image: "walkthrough/pickup.png",
            },
            {
                title: "Transport",
                description: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
                image: "walkthrough/transport.png",
            },
            {
                title: "Dellivery",
                description: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
                image: "walkthrough/delivery.png",
            },
        ],
    };
    const host = req.protocol + "://" + req.get("host");
    app_config.applogo[0].image = host + "/" + app_config.applogo[0].image;
    app_config.splashlogo[0].image = host + "/" + app_config.splashlogo[0].image;
    app_config.walkthrogh.forEach((item) => {
        item.image = host + "/" + item.image;
    });
    res.status(200).json(app_config);
});
app.use("/api/sales", authGaurd_middleware_1.default, sale_router_1.default);
app.use("/api", auth_router_1.default);
app.use("/api/subscriptions", authGaurd_middleware_1.default, productSubscriptions_router_1.default, handleSequelizeError_1.default);
app.use("/api/billingcycles", general_router_1.billingcyclesRouter, handleSequelizeError_1.default);
app.use("/api/wallets", authGaurd_middleware_1.default, wallet_router_1.default, handleSequelizeError_1.default);
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
