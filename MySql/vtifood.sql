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

ALTER TABLE users
    MODIFY COLUMN `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN `updated_at` DATETIME NULL DEFAULT NULL;

ALTER TABLE users ADD COLUMN role_id INT;
ALTER TABLE users ADD FOREIGN KEY (role_id) REFERENCES roles(id);



CREATE TABLE `roles`(
	id INT PRIMARY KEY ,
    `role` VARCHAR(100),
    name VARCHAR(100)
);

ALTER TABLE `users` ADD COLUMN role_id INT;
ALTER TABLE `users` ADD FOREIGN KEY (role_id) REFERENCES roles(id);

--
-- Table structure for table `cart`
--
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

--
-- Table structure for table `cart_detail`
--
DROP TABLE IF EXISTS `cart_detail`;
CREATE TABLE `cart_detail` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `cart_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`cart_id`) REFERENCES `cart`(`id`),
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
);


ALTER TABLE `cart_detail`
    MODIFY COLUMN `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN `updated_at` DATETIME NULL DEFAULT NULL;

DROP TABLE IF EXISTS `payment_method`;
CREATE TABLE `payment_method` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

--
-- Table structure for table `order`
--
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `delivery_date` datetime NOT NULL,
  `delivery_address` varchar(255) NOT NULL,
  `order_status` ENUM('XÁC NHẬN','ĐÓNG GÓI','ĐANG GIAO','ĐÃ NHẬN','HỦY'),
  `note` varchar(255),
  `payment_status` boolean default false,
  `payment_date` datetime,
  `payment_method_id` int NOT NULL,
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `payment_method_id` (`payment_method_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`)
);

--
-- Table structure for table `order_detail`
--
DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
);

-- Create procedure
-- Create procedure
DELIMITER //

CREATE PROCEDURE CreateOrder(
    IN userId INT,
    IN deliveryDate DATETIME,
    IN deliveryAddress VARCHAR(255),
    IN orderStatus ENUM('XÁC NHẬN','ĐÓNG GÓI','ĐANG GIAO','ĐÃ NHẬN','HỦY'),
    IN note VARCHAR(255),
    IN paymentMethodId INT,
    IN paymentStatus BOOLEAN ,
    IN paymentDate DATETIME
)
BEGIN
	DECLARE orderId INT;
    DECLARE cartId INT;
    DECLARE totalAmount DECIMAL(10, 2);

    -- Get the cart ID for the user
    SELECT id INTO cartId FROM cart WHERE user_id = userId;

    -- Calculate the total amount from the cart details
    -- SELECT SUM(cd.quantity * p.price) INTO totalAmount
    SELECT SUM(cd.quantity * p.price) INTO totalAmount
    FROM cart_detail cd
    JOIN products p ON cd.product_id = p.id
    -- WHERE cd.cart_id = cartId;
     WHERE cd.cart_id = cartId;

    -- Insert the new order into the `order` table
    INSERT INTO `order` (
        user_id, delivery_date, delivery_address, order_status, note, payment_status, payment_date, payment_method_id, total_amount
    ) VALUES (
        userId, deliveryDate, deliveryAddress, orderStatus, note, paymentStatus, paymentDate, paymentMethodId, totalAmount
    );

    -- Get the last inserted order ID
    SET orderId = LAST_INSERT_ID();

    -- Insert data from cart_detail to order_detail
    INSERT INTO order_detail (order_id, product_id, quantity, price)
    SELECT
        orderId,
        cd.product_id,
        cd.quantity,
        p.price
    FROM
        cart_detail cd
    JOIN
        products p ON cd.product_id = p.id
    WHERE
        cd.cart_id = cartId;

    -- Optionally, clear the cart after moving items to order_detail
    DELETE FROM cart_detail WHERE cart_id = cartId;
    DELETE FROM cart WHERE id = cartId;
END //

DELIMITER ;