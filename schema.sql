-- Create the DB
CREATE DATABASE login_app_db;

-- Use the DB
USE login_app_db;

-- creating auth table
CREATE TABLE auth_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- creating customer product details table
CREATE TABLE customer_product_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(255),
  orderDate DATE,
  company VARCHAR(255),
  owner VARCHAR(255),
  item VARCHAR(255),
  quantity INT,
  weight FLOAT,
  shipmentRequest VARCHAR(255),
  trackingID VARCHAR(255),
  shipmentSize VARCHAR(255),
  boxCount INT,
  specification VARCHAR(255),
  checklistQuantity VARCHAR(255)
);


-- inserting user credentials 
INSERT INTO auth_table (username, password) VALUES ('admin', 'password');
INSERT INTO auth_table (username, password) VALUES ('customer1', 'password');
INSERT INTO auth_table (username, password) VALUES ('customer2', 'password');
