EXEC sp_help tbl_ProductSubscriptions

-- SubscriptionGUID
-- UserGUID
-- ProductGUID
-- SubscriptionStartDate
-- SubscriptionEndDate
-- SubscriptionPrice
-- CreatedDate
-- UpdatedDate
-- DeletedDate
-- CreatedGUID
-- UpdatedGUID
-- DeletedGUID
-- BillingCycleGUID
-- NextPaymentDate
-- LastPaymentDate
-- SubscriptionOccurrences
-- Status
-- PaymentMethod
-- PaymentTransactionId
-- PromotionGUID
-- WalletGUID




CREATE TABLE tbl_TimeSlots (
    TimeSlotID INT PRIMARY KEY,
    TimeSlotName VARCHAR(50),
    StartTime TIME,
    EndTime TIME
);

-- INSERT INTO tbl_TimeSlots (TimeSlotID, TimeSlotName, StartTime, EndTime)
-- VALUES
--     (1, 'Early Morning', '06:00:00', '08:00:00'),
--     (2, 'Morning', '08:00:00', '10:00:00'),
--     (3, 'Late Morning', '10:00:00', '12:00:00'),
--     (4, 'Early Afternoon', '12:00:00', '14:00:00'),
--     (5, 'Afternoon', '14:00:00', '16:00:00'),
--     (6, 'Late Afternoon', '16:00:00', '18:00:00'),
--     (7, 'Early Evening', '18:00:00', '20:00:00'),
--     (8, 'Evening', '20:00:00', '22:00:00'),
--     (9, 'Late Evening', '22:00:00', '00:00:00'),
--     (10, 'Night', '00:00:00', '02:00:00'),
--     (11, 'Late Night', '02:00:00', '04:00:00'),
--     (12, 'Sunrise Morning', '04:00:00', '06:00:00');


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
-- WalletGUID-- BEGIN: 8f7a6b1d8c3e

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

CREATE TABLE tbl_Subscriptions (
    SubscriptionGUID NVARCHAR(10) PRIMARY KEY DEFAULT NEWID(),
    UserGUID INT NOT NULL FOREIGN KEY REFERENCES tbl_Users(UserGUID),
    ProductGUID INT NOT NULL FOREIGN KEY REFERENCES tbl_ProductMaster(ProductGUID),
    SubscriptionStartDate DATETIME2,
    SubscriptionEndDate DATETIME2,
    SubscriptionPrice DECIMAL(18, 2),
    CreatedDate DATETIME,
    UpdatedDate DATETIME,
    DeletedDate DATETIME,
    CreatedGUID UNIQUEIDENTIFIER,
    UpdatedGUID UNIQUEIDENTIFIER,
    DeletedGUID UNIQUEIDENTIFIER,
    BillingCycleGUID UNIQUEIDENTIFIER,
    NextPaymentDate DATETIME,
    LastPaymentDate DATETIME,
    SubscriptionOccurrences INT,
    Status VARCHAR(50),
    PaymentMethod VARCHAR(50),
    PaymentTransactionId VARCHAR(50),
    PromotionGUID UNIQUEIDENTIFIER,
    WalletGUID UNIQUEIDENTIFIER
);
-- END: 8f7a6b1d8c3e
