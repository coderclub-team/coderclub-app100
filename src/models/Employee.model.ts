import {
  BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  Sequelize,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Op } from "sequelize";
import { IEmployee } from "../../custom";
import os from "node:os";
os.hostname();

@Table({
  tableName: "tbl_employees",
  timestamps: true,
  paranoid: true,
  deletedAt: "DeletedDate",
})
export default class Employee extends Model<IEmployee> {
  @Column({
    primaryKey: true,
    type: DataType.NUMBER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  })
  EmployeeGUID!: number;
  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    defaultValue: "EMP0001",
    unique: true,
  })
  EmployeeID!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true,
      // check if already exists
    },
  })
  FirstName!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  LastName!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  Title!: string;
  TitleOfCourtesy!: string;
  BirthDate!: Date;
  HireDate!: Date;
  Address!: string;
  City!: string;
  Region!: string;
  PostalCode!: string;
  Country!: string;
  HomePhone!: string;
  Extension!: string;
  Photo!: string;
  Notes!: string;
  ReportsTo!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  PhotoPath!: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [10, 15],
      notEmpty: true,
      // check if already exists
      async isUnique(value: string) {
        const employee = await Employee.findOne({
          where: {
            MobileNo: value,
          },
        });
        if (employee) {
          throw new Error("MobileNo already exists!");
        }
      },
    },
  })
  MobileNo!: string;

  ReleatingDate!: Date;
  Reason!: string;

  @CreatedAt
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  CreatedDate!: Date | null;

  @UpdatedAt
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  ModifiedDate!: Date | null;

  @DeletedAt
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  DeletedDate!: Date | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  CreatedGUID!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  ModifiedGUID!: number;

  @BeforeCreate
  static async setEmployeeID(instance: Employee) {
    let max: number = await Employee.max("EmployeeGUID");
    if (max === null) {
      instance.EmployeeID = "EMP0001";
      return;
    }
    let employee = await Employee.findByPk(max);
    if (employee) {
      let empID = employee.EmployeeID;
      let empIDNum = parseInt(empID.substring(3));
      empIDNum = empIDNum + 1;
      instance.EmployeeID = `EMP${empIDNum.toString().padStart(5, "0")}`;
    }
  }
}
