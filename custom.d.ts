declare global {
  namespace NodeJS {
    interface Global {
      [key: string]: any;
    }
    interface ProcessEnv {
      JWT_SECRET: string;
    }
  }
}

// declare namespace NodeJS {
//   interface ProcessEnv {
//     JWT_SECRET: string;
//   }
// }

export interface IUser {
  UserGUID?: number;
  FirstName?: string;
  LastName?: string;
  LoginName?: string;
  Password?: string;
  EmailAddress?: string;
  MobileNo?: number;
  Landline?: string;
  DOB?: Date;
  Address?: string;
  City?: string;
  State?: string;
  Role?: user | admin | superadmin;
  Status?: boolean;
  Password_Attempt?: number;
  Account_Deactivated?: Date;
  CreatedGUID?: number;
  CreatedDate?: Date;
  ModifiedGUID?: number;
  ModifiedDate?: Date;
  Logouttime?: Date;
  AuthID?: string;
  OTP?: string;
}

export interface IEmployee {
  EmployeeGUID?: number;
  EmployeeID?: number;
  FirstName?: string;
  LastName?: string;
  Title?: string;
  TitleOfCourtesy?: string;
  BirthDate?: Date;
  HireDate?: Date;
  Address?: string;
  City?: string;
  Region?: string;
  PostalCode?: string;
  Country?: string;
  HomePhone?: string;
  Extension?: string;
  Photo?: string;
  Notes?: string;
  ReportsTo?: number;
  PhotoPath?: string;
  MobileNo: string;
}
