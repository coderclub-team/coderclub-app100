import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "tbl_GlobalTypeCategory",
})
export default class GlobalTypeCategory extends Model<GlobalTypeCategory> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    autoIncrementIdentity: true,
    type: DataType.INTEGER,
  })
  GlobalTypeCategoryGUID!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  GlobalTypeCategory!: string;
  @Column
  Description!: string;
  @Column
  CreatedGUID!: number;
  @Column
  CreatedDate!: Date;
  @Column
  IsActive!: number;
}

// @Table({
//   tableName: "tbl_GlobalType",
// })
// export class GlobalType extends Model<GlobalType> {
//   @Column({
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrementIdentity: true,
//     type: DataType.INTEGER,
//   })
//   @Column({
//     type: DataType.INTEGER,
//     references: {
//       model: GlobalTypeCategory,
//       key: "GlobalTypeCategoryGUID",
//     },
//   })
//   GlobalTypeGUID!: number;
//   @Column
//   GlobalTypeName!: string;
//   @Column
//   Description!: string;
//   @Column
//   GlobalTypeCategoryGUID!: number;
//   @Column
//   CreatedGUID!: number;
//   @Column
//   CreatedDate!: Date;
//   @Column
//   IsActive!: number;
// }
