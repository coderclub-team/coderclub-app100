import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeBulkCreate,
  BeforeBulkUpdate,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
import ProductMaster from "./product-master.model";
import User from "./user.model";
import BillingCycles from "./billing-cycle.model";

@Table({
  tableName: "tbl_ProductSubscriptions",
  createdAt: "CreatedDate",
  updatedAt: "UpdatedDate",
  deletedAt: "DeletedDate",
})
class ProductSubscription extends Model<ProductSubscription> {
  @Column({ primaryKey: true, autoIncrement: true })
  SubscriptionGUID!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  UserGUID!: number;

  @BelongsTo(() => User)
  User!: User;

  @ForeignKey(() => ProductMaster)
  @Column(DataType.INTEGER)
  ProductGUID!: number;

  @BelongsTo(() => ProductMaster)
  Product!: ProductMaster;

  @Column(DataType.DATE)
  SubscriptionStartDate!: Date;

  @Column(DataType.DATE)
  SubscriptionEndDate!: Date;

  @Column
  SubscriptionOccurrences!: number;



  @ForeignKey(() => BillingCycles)
  @Column
  BillingCycleGUID!: number;

  @Column(DataType.INTEGER)
  SubscriptionPrice!: number;

  // 'Prepaid Cards'
  // OR
  // 'Cheque Payment'
  // OR
  // 'Bank Transfer'
  // OR 'AEPS'
  // OR 'BHIM'
  // OR 'EMI'
  // OR 'Cash on Delivery'
  // OR 'IMPS'
  // OR 'RTGS'
  // OR 'NEFT'
  // OR 'Mobile Wallets'
  // OR 'UPI'
  // OR 'Net Banking'
  // OR 'Debit Card'
  @Column(DataType.STRING(100))
  PaymentMethod!: string;

  @Column
  PaymentTransactionId!:number

  @Column(DataType.DATE)
  LastPaymentDate!: Date;

  @Column(DataType.DATE)
  NextPaymentDate!: Date;

  @Column(DataType.DATE)
  CreatedDate!: Date;

  @Column(DataType.DATE)
  UpdatedDate!: Date;

  @Column(DataType.DATE)
  DeletedDate!: Date;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  CreatedGUID!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  UpdatedGUID!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  DeletedGUID!: number;

  // ('ACTIVE', 'INACTIVE', 'CANCELLED', 'EXPIRED', 'PENDING', 'SUSPENDED', 'TRIAL','PLACED'))  @Column(DataType.STRING(20))

  @Column
  Status!: string;

  @BeforeBulkCreate
  @BeforeBulkUpdate
  static beforeBulkCreateHook(instances: ProductSubscription[]) {
    instances.forEach((instance) => {
      Object.entries(instance.toJSON()).forEach(([key, value]) => {
        if (typeof value === "string") {
          instance.setDataValue(key as keyof ProductSubscription, value.trim());
        }
      });
    });
  }

  @BeforeCreate
  @BeforeUpdate
  static beforeCreateHook(instance: ProductSubscription) {
    Object.entries(instance.toJSON()).forEach(([key, value]) => {
      if (typeof value === "string") {
        instance.setDataValue(key as keyof ProductSubscription, value.trim());
      }
    });
  }

  
}

export default ProductSubscription;
