# mysql-login-app
Web development internship assignment on user authentication and data management for Juhosi Software Technologies Private Limited.

## Live Link

[Mysql Login App](https://mysql-login-app.onrender.com/)

## Description

This project allows users to manage order details and export them to Excel/CSV files. Users can log in, add order details, view existing data, and export the data to a local file.

## Dummy Login Details

To test the login functionality, use the following dummy login details:

- ID: Jack
- Password: 12345678

## Prerequisites

Before starting, make sure you have the following SQL servers set up:

- Server: db4free.net
  - Name: juhosi
  - Username: juhosi
  - Password: juhosi123
  - Port number: 3306

- Old Server: sql12.freemysqlhosting.net
  - Name: sql12629011
  - Username: sql12629011
  - Password: RzlzHmeUy8
  - Port number: 3306

## Installation

1. Clone the repository.
2. Install the required dependencies using `npm install`.
3. Configure the MySQL database connection using the provided SQL server credentials.
4. Connect the mysql server using the given SQL servers ceridentials.
5. Start the application using `nodemon server.js`.

## Usage

1. Visit the login page and enter your credentials.
2. Upon successful login, the order form will be displayed.
3. Fill in the order details, except for the company and order owner fields.
4. Click the "Submit" button to add the details to the Orderitem table.
5. To view previously filled data, click the "View Orders" button.
6. To change the password, enter your mobile number and new password in the Change Password section. If the entered mobile number matches the one in the database, the password will be updated.
7. Click the "Export to Excel" button to download all the data to an Excel or CSV file.

