import { Model, Table } from "sequelize-typescript";
import {
  AutoIncrement,
  Column,
  ForeignKey,
  PrimaryKey,
} from "sequelize-typescript";
import User from "./User.model";

@Table({
  tableName: "tbl_UserAddresses",
  timestamps: true,
  paranoid: true,
  createdAt: "CreatedDate",
  updatedAt: "UpdatedDate",
  deletedAt: "DeletedDate",
})
class UserAddress extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  AddressGUID?: string;

  @Column
  HouseNo?: string;
  @Column
  Locality?: string;

  @Column
  Landmark?: string;
  @Column
  Country?: string;
  @Column
  CreatedGUID?: string;

  @Column
  StreetName?: string;

  @Column
  @ForeignKey(() => User)
  UserGUID?: string;
  @Column
  City?: string;
  @Column
  State?: string;
  @Column
  Pincode?: string;

  @Column
  CreatedDate?: Date;
  @Column
  UpdatedDate?: Date;
  @Column
  DeletedDate?: Date;
}

export default UserAddress;
