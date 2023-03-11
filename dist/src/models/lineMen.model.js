"use strict";
// USE [GKDairy]
// GO
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
// /****** Object:  Table [dbo].[tbl_LineMan]    Script Date: 03/11/2023 15:06:42 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// SET ANSI_PADDING ON
// GO
// CREATE TABLE [dbo].[tbl_LineMan](
// 	[LineManGUID] [int] IDENTITY(1,1) NOT NULL,
// 	[LineManID] [varchar](20) NULL,
// 	[LineManName] [varchar](100) NULL,
// 	[Address] [varchar](200) NULL,
// 	[City] [varchar](200) NULL,
// 	[State] [varchar](200) NULL,
// 	[PinCode] [varchar](200) NULL,
// 	[MobileNo] [varchar](15) NULL,
// 	[ShopID] [varchar](20) NULL,
// 	[StoreGUID] [int] NULL,
// 	[CreatedGUID] [int] NULL,
// 	[CreatedDate] [datetime2](7) NOT NULL,
// 	[ModifiedGUID] [int] NULL,
// 	[DeletedGUID] [int] NULL,
// 	[ModifiedDate] [datetime2](7) NULL,
// 	[DeletedDate] [datetime2](7) NULL,
//  CONSTRAINT [PK_LineMan] PRIMARY KEY CLUSTERED
// (
// 	[LineManGUID] ASC
// )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
//  CONSTRAINT [UQ_LineMan_LineManID_MobileNo] UNIQUE NONCLUSTERED
// (
// 	[LineManID] ASC,
// 	[MobileNo] ASC
// )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
// ) ON [PRIMARY]
// GO
// SET ANSI_PADDING OFF
// GO
// ALTER TABLE [dbo].[tbl_LineMan]  WITH CHECK ADD  CONSTRAINT [FK_tbl_LineMan_CreatedGUID] FOREIGN KEY([CreatedGUID])
// REFERENCES [dbo].[tbl_Users] ([UserGUID])
// GO
// ALTER TABLE [dbo].[tbl_LineMan] CHECK CONSTRAINT [FK_tbl_LineMan_CreatedGUID]
// GO
// ALTER TABLE [dbo].[tbl_LineMan]  WITH CHECK ADD  CONSTRAINT [FK_tbl_LineMan_DeletedGUID] FOREIGN KEY([DeletedGUID])
// REFERENCES [dbo].[tbl_Users] ([UserGUID])
// GO
// ALTER TABLE [dbo].[tbl_LineMan] CHECK CONSTRAINT [FK_tbl_LineMan_DeletedGUID]
// GO
// ALTER TABLE [dbo].[tbl_LineMan]  WITH CHECK ADD  CONSTRAINT [FK_tbl_LineMan_ModifiedGUID] FOREIGN KEY([ModifiedGUID])
// REFERENCES [dbo].[tbl_Users] ([UserGUID])
// GO
// ALTER TABLE [dbo].[tbl_LineMan] CHECK CONSTRAINT [FK_tbl_LineMan_ModifiedGUID]
// GO
// ALTER TABLE [dbo].[tbl_LineMan]  WITH CHECK ADD  CONSTRAINT [FK_tbl_LineMan_StoreGUID] FOREIGN KEY([StoreGUID])
// REFERENCES [dbo].[tbl_StoreMaster] ([StoreGUID])
// GO
// ALTER TABLE [dbo].[tbl_LineMan] CHECK CONSTRAINT [FK_tbl_LineMan_StoreGUID]
// GO
let LineMan = class LineMan extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], LineMan.prototype, "LineManGUID", void 0);
LineMan = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_LineMan",
        timestamps: true,
        createdAt: "CreateGUID",
        updatedAt: "ModifiedGUID",
        deletedAt: "DeletedGUID",
    })
], LineMan);
exports.default = LineMan;
