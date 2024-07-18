DROP DATABASE IF EXISTS `vtifood`;

CREATE DATABASE IF NOT EXISTS `vtifood`;

use `vtifood`;


CREATE TABLE categories(
                           id INT PRIMARY KEY AUTO_INCREMENT,
                           name VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'Tên danh mục, vd: đồ diện tử'

);

-- Bảng chứa sản phẩm(Product) : 'Laptop macbook air 15 inch 2023...'
CREATE TABLE products (
                          id INT PRIMARY KEY AUTO_INCREMENT,
                          name VARCHAR(350) COMMENT 'Tên sản phẩm',
                          quantity INT NOT NULL,
                          price FLOAT NOT NULL CHECK(price >= 0),
                          abstract VARCHAR(300) DEFAULT '',
                          description LONGTEXT,
                          created_at DATETIME,
                          updated_at DATETIME,
                          category_id INT,
                          status ENUM('ACTIVE', 'INACTIVE', 'OUT_OF_STOCK', 'PENDING')  NOT NULL,
                          `show` BOOLEAN NOT NULL,
                          FOREIGN KEY (category_id) REFERENCES categories(id)
);


ALTER TABLE products
    CHANGE COLUMN `show` `is_show` BOOLEAN;

CREATE TABLE `product_images` (
                                  id INT PRIMARY KEY AUTO_INCREMENT,
                                  product_id INT,
                                  FOREIGN KEY (product_id) REFERENCES products(id),
                                  CONSTRAINT fk_product_image_product_id FOREIGN KEY (product_id)
                                      REFERENCES products(id) ON DELETE CASCADE,
                                  image_url VARCHAR(300)
);

CREATE TABLE users (
                       id INT PRIMARY KEY AUTO_INCREMENT,
                       firstname VARCHAR(100) DEFAULT '',
                       lastname VARCHAR(100) DEFAULT '',
                       phone_number VARCHAR(10) NOT NULL,
                       username VARCHAR(200) NOT NULL,
                       password VARCHAR(200) NOT NULL,
                       date_of_birth DATE,
                       email VARCHAR(200) DEFAULT '',
                       address VARCHAR(200) DEFAULT ''

);

ALTER TABLE users
    ADD COLUMN created_at DATETIME DEFAULT NOW(),
ADD COLUMN updated_at DATETIME DEFAULT NOW() ON UPDATE NOW();

ALTER TABLE users ADD COLUMN role_id INT;
ALTER TABLE users ADD FOREIGN KEY (role_id) REFERENCES roles(id);


CREATE TABLE `roles`(
                        id INT PRIMARY KEY ,
                        `role` VARCHAR(100),
                        name VARCHAR(100)
)