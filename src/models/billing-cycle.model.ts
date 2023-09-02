import {
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "tbl_BillingCycles",
  timestamps: false,
  paranoid: false,
})
class SubscriptionCycle extends Model<SubscriptionCycle> {
  @PrimaryKey
  @Column
  BillingCycleGUID!: number;
  @Column
  BillingCycleName!: "Daily" | "Monthly";
  @Column
  NumberOfCycles!: string;

}
export default SubscriptionCycle;
