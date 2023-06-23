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

-- inserting user credentials 
INSERT INTO auth_table (username, password) VALUES ('admin', 'password');
INSERT INTO auth_table (username, password) VALUES ('customer1', 'password');
INSERT INTO auth_table (username, password) VALUES ('customer2', 'password');
