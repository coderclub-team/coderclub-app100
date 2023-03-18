import {
  Model,
  Table,
  Column,
  DataType,
  BeforeCreate,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BeforeUpdate,
  Unique,
  BeforeSave,
} from "sequelize-typescript";
import bcrypt from "bcrypt";

import moment from "moment";
import { DataTypes } from "sequelize";
import { AuthenticateProps } from "../../custom";
import {
  IncorrectPasswordError,
  UserNotFoundExceptionError,
} from "../../custom.error";
import jwt from "jsonwebtoken";

@Table({
  tableName: "tbl_Users",
  timestamps: true,
  paranoid: true,
})
export default class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  public UserGUID!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    validate: {
      notEmpty: true,
      // regex for First Name
      is: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    },
  })
  public FirstName!: string;

  @Column({
    type: DataType.STRING(50),
    validate: {
      notEmpty: true,
      // regex for Last Name
      is: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    },
  })
  public LastName!: string | null;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    validate: {
      notEmpty: true,
      // regex for Full Name
      is: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    },
  })
  FullName!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
    validate: {
      isIn: [["Male", "Female", "Transgender", null]],
    },
  })
  Gender!: string;

  // DoorNumber VARCHAR(10) NULL,
  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  DoorNumber!: string;

  // SteetName VARCHAR(100) NULL,
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  Street!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  Area!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  Landmark!: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  PhotoPath!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  public LoginName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public Password!: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,

    validate: {
      isEmail: true,
    },
  })
  public EmailAddress!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      // regex for mobile number
      is: /^[0-9]{10,15}$/,
    },
  })
  public MobileNo!: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: true,
    validate: {
      // regex for landline
      is: /^[0-9-]{10,20}$/,
    },
  })
  public Landline!: number | null;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    validate: {
      isEighteenOrOlder: function (value: Date) {
        if (!value) return;
        // Calculate user's age based on date of birth
        const age = moment().diff(moment(value), "years");

        // Check if user is at least 18 years old
        if (age < 18) {
          throw new Error("User must be at least 18 years old");
        }
      },
    },
  })
  public DOB!: Date | null;

  @Column({
    type: DataType.STRING(200),
    validate: {},
  })
  public Address!: string | null;

  @Column({
    type: DataType.STRING(200),
    validate: {},
  })
  public City!: string | null;

  @Column({
    type: DataType.STRING(200),
    validate: {},
  })
  public State!: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    defaultValue: 0,
  })
  public Status!: number;

  @Column({
    type: DataType.TINYINT,
    defaultValue: null,
    allowNull: true,
  })
  public Password_Attempt!: number | null;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  public Account_Deactivated!: Date | null;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  public Logouttime!: Date | null;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
  })
  public AuthID!: string | null;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  public OTP!: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  OtpExpiryDate!: Date | null;

  @CreatedAt
  @Column({
    type: DataType.DATEONLY,
  })
  public CreatedDate!: Date | null;

  @UpdatedAt
  @Column({
    type: DataType.DATEONLY,
  })
  public ModifiedDate!: Date | null;

  @DeletedAt
  @Column({
    type: DataType.DATEONLY,
  })
  public DeletedDate!: Date | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  public CreatedGUID!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  public ModifiedGUID!: number | null;

  static readonly fields = {
    password: { type: DataTypes.STRING, allowNull: false, exclude: true },
  };

  private _token!: string;

  get token(): string {
    return this.token;
  }
  set token(token: string) {
    this._token = token;
  }

  @BeforeCreate
  static async hashPassword(instance: User) {
    if (instance.Password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(instance.Password, salt);
      instance.Password = await instance.encrtiptPassword(instance.Password);
    }
  }
  public async encrtiptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePassword(password: string) {
    if (!this.Password) return false;

    return bcrypt.compare(password, this.Password);
  }

  static async authenticate(props: AuthenticateProps) {
    const user = await this.findOne({
      where: {
        MobileNo: props.MobileNo,
      },
    });

    if (!user) {
      throw new UserNotFoundExceptionError("User not found");
    } else if (user.Password_Attempt && user.Password_Attempt >= 3) {
      throw new Error("Account is locked due to multiple attempts");
    } else if (user.Account_Deactivated) {
      throw new Error("Account is deactivated by admin");
    } else if (user.Status == 0) {
      throw new Error("Account is not activated");
    }

    const isPasswordMatch = await user.comparePassword(props.Password);

    if (!isPasswordMatch) {
      if (user.Password_Attempt) {
        user.Password_Attempt = user.Password_Attempt + 1;
      } else {
        user.Password_Attempt = 1;
      }
      await user.save({
        fields: ["Password_Attempt"],
      });
      throw new IncorrectPasswordError("Incorrect password");
    }

    // json web token

    const token = jwt.sign(user.get({ plain: true }), process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      user,
      token,
    };
  }
}
