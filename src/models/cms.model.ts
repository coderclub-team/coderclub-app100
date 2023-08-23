import { Model, Column, DataType, Table, PrimaryKey } from "sequelize-typescript";
require("dotenv").config();

@Table({
  tableName: "tbl_Walkthrough",
  timestamps: false,
})
export class Walkthrough extends Model<Walkthrough> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  WalkthroughGUID!: number;

  // Uncomment the following lines to add more columns
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "Title",
  })
  title!: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    field: "Description",
  })
  description!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: "PhotoPath",
    get() {
      const baseURL =
        process.env.NODE_ENV == "production"
          ? process.env.STATIC_FILE_URL
          : "http://localhost:3000";
      const path = this.getDataValue("image");
      return baseURL + "/" + path;
    },
  })
  image!: string;
}


// Path: src/models/cms.model.ts
@Table({
    tableName: "tbl_Banners",
    timestamps: false,
  })
export class Banner extends Model<Banner>{
    @PrimaryKey
    @Column
    BannerGUID!: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: "Title",
    })
    title!: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: true,
        field: "Description",
    })
    description!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: "PhotoPath",
        get() {
            const baseURL =
              process.env.NODE_ENV == "production"
                ? process.env.STATIC_FILE_URL
                : "http://localhost:3000";
            const path = this.getDataValue("image") as string;
            return baseURL + "/" + path;
          },
    })
    image!: string;

}
