import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./User.model";

@Table({
    tableName: 'tbl_UserWalletBalances',
    timestamps:false,
    paranoid:false
})
export default class UserWalletBalance extends Model{

    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    })
    WalletBalanceGUID!:number

    @ForeignKey(()=>User)
    @Column
    UserGUID!:number

    @BelongsTo(()=>User)
    user!:User

    @Column({
        type:DataType.DECIMAL(10,2),
        allowNull:false,
    })
    Balance!:number
}