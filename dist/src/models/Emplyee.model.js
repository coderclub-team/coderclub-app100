"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var Employee_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const node_os_1 = __importDefault(require("node:os"));
node_os_1.default.hostname();
let Employee = Employee_1 = class Employee extends sequelize_typescript_1.Model {
    static setEmployeeID(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            let max = yield Employee_1.max("EmployeeGUID");
            if (max === null) {
                instance.EmployeeID = "EMP0001";
                return;
            }
            let employee = yield Employee_1.findByPk(max);
            if (employee) {
                let empID = employee.EmployeeID;
                let empIDNum = parseInt(empID.substring(3));
                empIDNum = empIDNum + 1;
                instance.EmployeeID = `EMP${empIDNum.toString().padStart(5, "0")}`;
            }
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        type: sequelize_typescript_1.DataType.NUMBER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", Number)
], Employee.prototype, "EmployeeGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        defaultValue: "EMP0001",
        unique: true,
    }),
    __metadata("design:type", String)
], Employee.prototype, "EmployeeID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true,
            // check if already exists
        },
    }),
    __metadata("design:type", String)
], Employee.prototype, "FirstName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Employee.prototype, "LastName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Employee.prototype, "Title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Employee.prototype, "PhotoPath", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(15),
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [10, 15],
            notEmpty: true,
            // check if already exists
            isUnique(value) {
                return __awaiter(this, void 0, void 0, function* () {
                    const employee = yield Employee_1.findOne({
                        where: {
                            MobileNo: value,
                        },
                    });
                    if (employee) {
                        throw new Error("MobileNo already exists!");
                    }
                });
            },
        },
    }),
    __metadata("design:type", String)
], Employee.prototype, "MobileNo", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
    }),
    __metadata("design:type", Object)
], Employee.prototype, "CreatedDate", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
    }),
    __metadata("design:type", Object)
], Employee.prototype, "ModifiedDate", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Employee.prototype, "DeletedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Employee.prototype, "CreatedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Employee.prototype, "ModifiedGUID", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Employee]),
    __metadata("design:returntype", Promise)
], Employee, "setEmployeeID", null);
Employee = Employee_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_employees",
        timestamps: true,
        paranoid: true,
        deletedAt: "DeletedDate",
    })
], Employee);
exports.default = Employee;
