DROP DATABASE IF EXISTS BamazonDB;
CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE Products(
  ItemID INT NOT NULL AUTO_INCREMENT,
  ProductName VARCHAR(45) NULL,
  DepartmentName VARCHAR(45) NULL,
  Price DOUBLE(10,2),
  StockQuantity INTEGER ,
  PRIMARY KEY (ItemID)
);

INSERT INTO Products (ProductName, DepartmentName, Price,StockQuantity)
VALUES ("Eggs", "grocery", 1.99,12),
        ("Eggs", "grocery", 1.99,12),

("Milk", "grocery", 2.99,24),
("PS4", "electronics", 199.99,5),
("Xbox 360", "electronics", 179.99, 7),

  ("iPad", "electronics", 399.99, 18),

  ("Bicycle", "sporting goods", 599.99, 2),

  ("Football", "sporting goods", 9.99, 49),

  ("50 Shades of Grey", "books", 9.99, 69),

  ("Game of Thrones", "books", 19.99, 33),

  ("Fight Club", "books", 11.99, 6),

  ("Fight Club", "dvds", 13.99, 36),  

  ("Office Space", "dvds", 9.99, 21),

  ("Dark Side of the Moon", "music", 11.55, 15);

  SELECT * FROM Products;



   -- SECOND TABLE//////////////


   CREATE TABLE Departments(

DepartmentID INTEGER AUTO_INCREMENT PRIMARY KEY,

DepartmentName VARCHAR(30),

OverHeadCosts DOUBLE(10,2),

TotalSales DOUBLE(10,2));



-- Seed Departments into Database

INSERT INTO Departments(DepartmentName, OverHeadCosts, TotalSales)

VALUES ("grocery", 10500.00, -10000.00), 

  ("electronics", 25000.00, 0.00),

  ("sporting goods", 15000.00, 0.00),

  ("books", 5000.00, 0.00),

  ("dvds", 20000.00, 0.00),

  ("music", 7500.00, 0.00);



-- View Database Entries

-- SELECT * FROM Departments;





