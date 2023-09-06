EXEC sp_help tbl_SalesMaster
-- SalesMasterGUID
-- SaleOrderID
-- SaleType
-- PaymentMode
-- SalemanGUID
-- LinemanGUID
-- StoreGUID
-- CreatedGUID
-- CreatedDate
-- CustomerGUID
-- ModifiedDate
-- DeletedDate
-- IncentiveStatusGUID
-- ModeOfPayment
-- SaleChannel
-- SalePlatform
-- SaleOrderDate
-- UpdatedDate
-- Status
-- PromotionGUID
-- PaymentTransactionID
-- TotalAmount
-- WalletGUID




SELECT [WalletBalanceGUID], [UserGUID], [Balance] FROM [tbl_UserWalletBalances] AS [UserWalletBalance] WHERE [UserWalletBalance].[UserGUID] = 2 ORDER BY [UserWalletBalance].[WalletBalanceGUID] OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY
SELECT * from tbl_SalesMaster
SELECT * from tbl_Cart