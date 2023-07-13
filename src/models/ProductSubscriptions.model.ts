import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import ProductMaster from "./product/ProductMaster.model";
import User from "./User.model";
import BillingCycles from "./product/BillingCycles.model";

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

  @ForeignKey(() => ProductMaster)
  @Column(DataType.INTEGER)
  ProductGUID!: number;

  @Column(DataType.DATE)
  SubscriptionStartDate!: Date;

  @Column(DataType.DATE)
  SubscriptionEndDate!: Date;

  @Column
  SubscriptionOccurrences!: number;

  // Refunded
  // Pending Approval
  // Payment Declined
  // Trial Expired
  // Pending Payment
  // Grace Period
  // On Hold
  // Downgraded
  // Upgraded
  // Trial
  // Cancelled
  // Expired
  // Inactive
  // Active
  @Column(DataType.STRING(20))
  SubscriptionStatus!: string;

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
}

export default ProductSubscription;
