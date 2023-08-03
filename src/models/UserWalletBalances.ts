import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

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
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        references:{
            model:'tbl_Users',
            key:'UserGUID'
        }
    })
    UserGUID!:number

    @Column({
        type:DataType.DECIMAL(10,2),
        allowNull:false,
    })
    Balance!:number
}