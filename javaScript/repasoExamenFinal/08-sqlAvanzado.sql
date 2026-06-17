-- 08-sqlAvandazo.sql

SELECT Categories.CategoryName, SUM( OrderDetails.Quantity )
FROM 