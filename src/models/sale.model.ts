import {
  AutoIncrement,
  BeforeBulkCreate,
  BeforeBulkUpdate,
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import GlobalType from "./global-type.model";
import { sequelize } from "../database";
import User from "./user.model";
import SaleDetail from "./sale-detail.model";
import { Promotion } from "./promotion.model";


@Table({
  tableName: "tbl_SalesMaster",
  timestamps: false,
  createdAt: "CreatedDate",
  updatedAt: "UpdatedDate",
  deletedAt: "DeletedDate",
  paranoid: false,
})
export default class Sale extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  SalesMasterGUID!: number;

  @Column
  SaleOrderID!: string;
  // @Column
  // SaleOrderDate: Date=new Date();

  @ForeignKey(() => GlobalType)
  @Column({
    type: DataType.VIRTUAL,
    field: "SaleType",
  })
  SaleType!: string;

  @BelongsTo(() => GlobalType)
  SaleTypeRef?: GlobalType;

  @Column
  PaymentMode!: number;
  @Column
  SalemanGUID!: number;
  @Column
  LinemanGUID!: number;
  @Column
  StoreGUID!: number;
  @Column
  CreatedGUID!: number;
  @Column
  CreatedDate!: Date;

  @ForeignKey(() => User)
  @Column
  CustomerGUID!: number;

  @Column
  UpdatedDate!: Date;

  @Column
  DeletedDate!: Date;

  @Column
  Status!:string
  @Column
  PaymentTransactionID!:string

  @ForeignKey(() => Promotion)
  @Column({
    type: DataType.NUMBER,
    
  })
  PromotionGUID!: number;

  @BelongsTo(() => Promotion)
  Promotion?: Promotion;


  @HasMany(() => SaleDetail, {
    foreignKey: "SalesMasterGUID",
    as: "SaleDetails",
  })
  SaleDetails!: SaleDetail[];

  @BeforeCreate
  static async addSaleOrderID(sale: Sale) {
    const result = await sequelize.query("SELECT IDENT_CURRENT('tbl_SalesMaster')+1 as NEXTID") as any[][];
    const id = result[0][0].NEXTID;
    sale.SaleOrderID = `S${id.toString().padStart(7, '0')}`;
  }

  @BeforeBulkCreate
  @BeforeBulkUpdate
  static beforeBulkCreateHook(instances: Sale[]) {
    instances.forEach((instance) => {
      Object.entries(instance.toJSON()).forEach(([key, value]) => {
        if (typeof value === "string") {
          instance.setDataValue(key as keyof Sale, value.trim());
        }
      });
    });
  }

  @BeforeCreate
  @BeforeUpdate
  static beforeCreateHook(instance: Sale) {
    Object.entries(instance.toJSON()).forEach(([key, value]) => {
      if (typeof value === "string") {
        instance.setDataValue(key as keyof Sale, value.trim());
      }
    });
  }


}