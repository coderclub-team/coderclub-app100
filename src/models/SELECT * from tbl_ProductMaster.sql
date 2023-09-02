
EXEC sp_help tbl_SalesDetails

-- SalesDetailGUID
-- SalesMasterGUID
-- ProductGUID
-- ProductCode
-- Qty
-- MRP
-- SaleRate
-- SGST
-- CGST
-- DiscountPercent
-- DiscAmt
-- TaxAmount
-- Amount
-- CreatedGUID
-- CreatedDate
-- ProductName

-- SalesDetailGUID
-- SalesMasterGUID
-- ProductGUID
-- Qty
SELECT *
INTO Cart
FROM tbl_CartItems
WHERE 1 = 0;
SELECT * from Cart

-- CartItemGUID
-- ProductGUID
-- Quantity
-- CreatedGUID
-- CreatedDate
-- isSubscription
-- SubsCycleGUID
-- SubsOccurences

CREATE TABLE tbl_Cart
(
    CartItemGUID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    ProductGUID INT NOT NULL FOREIGN KEY REFERENCES tbl_ProductMaster(ProductGUID),
    Quantity int NOT NULL,
    CreatedGUID INT NOT NULL FOREIGN KEY REFERENCES tbl_Users(UserGUID),
    CreatedDate datetime NOT NULL,
    isSubscription bit NOT NULL DEFAULT 0,
    SubsCycleGUID INT NULL FOREIGN KEY REFERENCES tbl_BillingCycles(BillingCycleGUID),
    SubsOccurences int NULL
);



SELECT * from tbl_Cart

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
EXEC sp_help tbl_SalesDetails

-- SalesDetailGUID
-- SalesMasterGUID
-- ProductGUID
-- ProductCode
-- Qty
-- MRP
-- SaleRate
-- SGST
-- CGST
-- DiscountPercent
-- DiscAmt
-- TaxAmount
-- Amount
-- CreatedGUID
-- CreatedDate
-- ProductName

SELECT * from tbl_SalesMaster

SELECT * FROM tbl_GlobalType

INSERT into tbl_GlobalType
(GlobalTypeName, GlobalTypeCategoryGUID) VALUES('User App Sale', 4)
