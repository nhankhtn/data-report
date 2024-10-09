CREATE DATABASE data_report;
use data_report;

CREATE TABLE GasStation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    INDEX idx_gasStation_name (name) 
);

CREATE TABLE Product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    INDEX idx_product_name (name),    
    INDEX idx_product_price (price)   
);

CREATE TABLE Pump (
    id INT PRIMARY KEY AUTO_INCREMENT,
    gasStationID INT,
    productID INT,
    FOREIGN KEY (GasStationID) REFERENCES GasStation(id) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Product(id) ON DELETE CASCADE,
    INDEX idx_pump_gasStationID (gasStationID),
    INDEX idx_pump_productID (productID)         
);

CREATE TABLE Transaction (
    id INT PRIMARY KEY AUTO_INCREMENT,
    gasStationID INT,
    pumpID INT,
    productID INT,
    quantity DECIMAL(10, 2) NOT NULL,
    transactionValue DECIMAL(10, 2) NOT NULL,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (GasStationID) REFERENCES GasStation(id) ON DELETE CASCADE,
    FOREIGN KEY (PumpID) REFERENCES Pump(id) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Product(id) ON DELETE CASCADE,
    INDEX idx_transaction_gasStationID (gasStationID),
    INDEX idx_transaction_pumpID (pumpID),            
    INDEX idx_transaction_productID (productID),     
    INDEX idx_transaction_createdAt (createdAt)      
);
