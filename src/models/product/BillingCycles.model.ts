import {
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
} from "sequelize-typescript";

// --BillingCycleGUID;
// --BillingCycleName;
// --NumberOfCycle;
@Table({
  tableName: "tbl_BillingCycles",
  timestamps: false,
  paranoid: false,
})
class BillingCycles extends Model<BillingCycles> {
  @PrimaryKey
  @Column
  BillingCycleGUID!: number;
  @Column
  BillingCycleName!: "Daily" | "Monthly";
  @Column
  NumberOfCycles!: string;
}
export default BillingCycles;
