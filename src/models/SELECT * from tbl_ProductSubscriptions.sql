-- SELECT * from tbl_ProductSubscriptions


-- DELETE from tbl_SalesDetails
-- DELETE from tbl_SalesMaster
-- DELETE from tbl_ProductSubscriptions
-- DELETE from tbl_UserWalletBalances
-- DELETE from tbl_UserWallets
EXEC sp_help tbl_SalesMaster

SELECT *
FROM INFORMATION_SCHEMA.CHECK_CONSTRAINTS
WHERE CONSTRAINT_NAME = 'CHECK_MOP'

-- ([ModeOfPayment]='CASH ON DELIVERY' OR [ModeOfPayment]='DEBIT CARD' OR [ModeOfPayment]='PAYTM' OR [ModeOfPayment]='AMAZON PAY' OR [ModeOfPayment]='GOOGLE PAY' OR [ModeOfPayment]='PHONEPE' OR [ModeOfPayment]='BHIM' OR [ModeOfPayment]='VENMO' OR [ModeOfPayment]='PAYPAL' OR [ModeOfPayment]='NET BANKING' OR [ModeOfPayment]='UPI' OR [ModeOfPayment]='CARD' OR [ModeOfPayment]='POS' OR [ModeOfPayment]='ONLINE' OR [ModeOfPayment]='CHEQUE' OR [ModeOfPayment]='CREDIT CARD' OR [ModeOfPayment]='CASH')
ALTER TABLE tbl_SalesMaster
ADD CONSTRAINT CHECK_MOP CHECK (PaymentMode IN ('CASH ON DELIVERY', 'DEBIT CARD', 'PAYTM', 'AMAZON PAY', 'GOOGLE PAY', 'PHONEPE', 'BHIM', 'VENMO', 'PAYPAL', 'NET BANKING', 'UPI', 'CARD', 'POS', 'ONLINE', 'CHEQUE', 'CREDIT CARD', 'CASH','WALLET'));
