



import { AfterCreate, Column, DataType, Model, Sequelize, Table } from "sequelize-typescript";
import Message from "./Message.model";
import User from "./User.model";
import { getWalletBalance } from "../controllers/userWallet.controller";
import UserWalletBalance from "./UserWalletBalances";

@Table({
    timestamps: true,
    paranoid: true,
    tableName: 'tbl_UserWallets',
    createdAt: 'CreatedDate',
    updatedAt: 'UpdatedDate',
    deletedAt: 'DeletedDate',
    hasTrigger: true,
})
export default class UserWallet extends Model {
@Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
})
WalletGUID!: number;

@Column({
    type: DataType.INTEGER,
    allowNull: false
})
UserGUID!: number;

@Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
})
Credit!: number;

@Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
})
Debit!: number;

@Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
})
CreatedDate!: Date;

@Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
})
UpdatedDate!: Date;

@Column({
    type: DataType.DATE,
    allowNull: true
})
DeletedDate!: Date;

@Column({
    type: DataType.INTEGER,
    allowNull: false
})
CreatedGUID!: number;

@Column({
    type: DataType.INTEGER,
    allowNull: true
})
UpdatedGUID!: number;

@Column({
    type: DataType.INTEGER,
    allowNull: true
})
DeletedGUID!: number;

@Column({
    type: DataType.STRING(50),
    allowNull: false,
    defaultValue: 'FULLFILLED'
})
Status!: string;

@AfterCreate
static async updateBalance(instance: UserWallet) {
   const user= await User.findByPk(instance.getDataValue("UserGUID"))
    const balance= await UserWalletBalance.findOne({
         where: {UserGUID: instance.getDataValue("UserGUID")}
    })
    if(instance.getDataValue("Credit") > 0){
     Message.sendRechargeSuccessMessage({
        MobileNo: user?.getDataValue("MobileNo"),
        RechargeAmount: instance.getDataValue("Credit"),
        RechargeDate: instance.getDataValue("CreatedDate") as Date,
        Balance: balance?.getDataValue("Balance"),
        DigitalCard:user?.DigitalCard!,
     }).then((Response)=>{
            console.log("sendRechargeSuccessMessage Response", Response);
     })
     .catch((error)=>{
            console.log("Error in sending message", error);
        })
}
}
}