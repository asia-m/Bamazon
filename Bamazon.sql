DROP DATABASE IF EXISTS Bamazon;
CREATE DATABASE Bamazon;

USE Bamazon;


CREATE TABLE items(
	item_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(3,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO items VALUES ("1", "product name", "department name", "003.99", "1");
INSERT INTO items VALUES ("2", "product name", "department name", "003.99", "6");
INSERT INTO items VALUES ("3", "product name", "department name", "003.99", "3");
INSERT INTO items VALUES ("4", "product name", "department name", "003.99", "6");
INSERT INTO items VALUES ("5", "product name", "department name", "003.99", "15");
INSERT INTO items VALUES ("6", "product name", "department name", "003.99", "6");
INSERT INTO items VALUES ("7", "product name", "department name", "003.99", "9");
INSERT INTO items VALUES ("8", "product name", "department name", "003.99", "17");
INSERT INTO items VALUES ("9", "product name", "department name", "003.99", "1");
INSERT INTO items VALUES ("10", "product name", "department name", "003.99", "1");
INSERT INTO items VALUES ("11", "product name", "department name", "003.99", "1");


SELECT * FROM items;