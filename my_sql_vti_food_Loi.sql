DROP DATABASE IF EXISTS `vtifood`;

CREATE DATABASE IF NOT EXISTS `vtifood`;

use `vtifood`;

CREATE TABLE categories(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'Tên danh mục, vd: đồ diện tử'

);

INSERT INTO `categories`    (`id`,`name`)
VALUES                      (1,'Đồ ăn'  ),
                            (2,'Đồ uống'),
                            (3,'Kem'    );

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

/*
-- Query: SELECT * FROM vtifood.products
LIMIT 0, 1000

-- Date: 2024-07-16 23:48
*/
INSERT INTO `products` (`id`,`name`,`quantity`,`price`,`abstract`,`description`,`created_at`,`updated_at`,`category_id`,`status`,`is_show`) VALUES (2,'Chân gà rút xương',10,22432,'Chân gà rút xương rất là ngon đó nhen quý dị','mo ta san pham','2024-07-16 11:25:32',NULL,1,'ACTIVE',1);
INSERT INTO `products` (`id`,`name`,`quantity`,`price`,`abstract`,`description`,`created_at`,`updated_at`,`category_id`,`status`,`is_show`) VALUES (3,'Kem không tan',10,100000,'Kem không tan, không ăn không tan','Mo ta san pham','2024-07-16 11:27:21',NULL,3,'ACTIVE',1);
INSERT INTO `products` (`id`,`name`,`quantity`,`price`,`abstract`,`description`,`created_at`,`updated_at`,`category_id`,`status`,`is_show`) VALUES (6,'Chân gà ',2,50000,'Chân gà tuyệt ngon','Mô tả sản phẩm','2024-07-16 12:14:37',NULL,1,'ACTIVE',1);
INSERT INTO `products` (`id`,`name`,`quantity`,`price`,`abstract`,`description`,`created_at`,`updated_at`,`category_id`,`status`,`is_show`) VALUES (7,'Trà sữa mật ong',10,30000,'Trà sữa mật ong ngon tuyệt','Đây là mô tả sản phẩm','2024-07-16 12:17:13',NULL,2,'ACTIVE',1);


CREATE TABLE `product_images` (
	id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT fk_product_image_product_id FOREIGN KEY (product_id) 
    REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(300)
);
/*
-- Query: SELECT * FROM vtifood.product_images
LIMIT 0, 1000

-- Date: 2024-07-16 23:48
*/
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (1,2,'99b401a1-aa69-4ccf-9a8d-55a44d4f2f30_29351737_2152446668377854_356570745477300982_o_2152446668377854.jpg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (2,2,'f3231c47-d941-4f98-a356-4618d40c939c_Blueberry-ice-cream-5-500x500.webp');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (3,2,'9b85db89-32a9-4ed1-a7c4-8602385f2617_chan ga.jpeg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (4,2,'ec896501-a158-4c68-8ea2-655687915f26_combo.jpeg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (5,3,'6a9f97c7-abca-4cba-977a-d659e2a370cd_146677-ngay-hoi-kem-tuoi-an-kem-thoa-thich-tai-halloween-ice-cream.jpg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (6,3,'30f28940-5190-4abb-bd23-5674f1134912_banh_oc_que_hinh_tho_89c871bc25124b178bdbd87f90054c47.webp');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (7,6,'2d05f304-fef3-46f9-b178-eead3a98e365_chan ga.jpeg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (8,7,'f0cea4f5-4487-46d5-8218-70e9a871144b_vn-11134517-7r98o-lr462kesj7h55d@resize_ss400x400!@crop_w400_h400_cT.jpeg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (9,7,'94b8ce02-f20c-44f4-b96a-8c67c3dc9390_vn-11134517-7r98o-lr0768nm4tl078@resize_ss400x400!@crop_w400_h400_cT.jpeg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (10,7,'c3cc09f2-5c09-482c-a33a-290a48519dc8_vn-11134517-7r98o-lteb7agjohc461@resize_ss400x400!@crop_w400_h400_cT.jpeg');


CREATE TABLE `roles`(
	id INT PRIMARY KEY ,
    `role` VARCHAR(100),
    name VARCHAR(100)
);



INSERT INTO `roles` (id ,`role` ,`name` )
VALUES              (1  ,'ADMIN','admin'),
                    (2  ,'USER' ,'user' );

CREATE TABLE `users` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(100) DEFAULT '',
    lastname VARCHAR(100) DEFAULT '',
    phone_number VARCHAR(10) NOT NULL,
	username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    date_of_birth DATE,
    email VARCHAR(200) DEFAULT '',
    address VARCHAR(200) DEFAULT '',
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW() ON UPDATE NOW()

);


ALTER TABLE `users`
    MODIFY COLUMN `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN `updated_at` DATETIME NULL DEFAULT NULL;
  ALTER TABLE `users` ADD COLUMN role_id INT;
ALTER TABLE `users` ADD FOREIGN KEY (role_id) REFERENCES roles(id);
  
    /*
-- Query: SELECT * FROM vtifood.users
LIMIT 0, 1000

-- Date: 2024-07-16 23:45
*/
INSERT INTO `users` (`id`,`firstname`,`lastname`,`phone_number`,`username`,`password`,`date_of_birth`,`email`,`address`,`created_at`,`updated_at`,`role_id`) VALUES (1,'Loi','Vo Phuoc ','0987656344','admin','$2a$10$N06VwQl7Cb.1xIqTApM9buufsuy3Q7.RTVGje8ym1z7rYF8uak4BS','1999-02-05','vophuocloi0502@gmail.com','Vinh Long','2024-07-16 11:13:51',NULL,1);
INSERT INTO `users` (`id`,`firstname`,`lastname`,`phone_number`,`username`,`password`,`date_of_birth`,`email`,`address`,`created_at`,`updated_at`,`role_id`) VALUES (2,'Duyen','Tran','0987656344','tranduyen','$2a$10$cnxhJo4fXhBBXcaO.aVBx.23TeDZLhWzTKnnHchHVwHSAd/.ivf7u','2001-10-09','nhan@gmail.com','Lầu 5 cốc','2024-07-16 11:14:49','2024-07-16 14:42:38',2);
INSERT INTO `users` (`id`,`firstname`,`lastname`,`phone_number`,`username`,`password`,`date_of_birth`,`email`,`address`,`created_at`,`updated_at`,`role_id`) VALUES (3,'Quoc','Tran','0987656344','quoctran','$2a$10$.UYG2ocpKHRV8Lm3KfE/YO/rf7zlYlbq5AJszixYICPAnsN4cyZNW','2001-10-09','nhan@gmail.com','Lầu 5 cốc','2024-07-16 12:04:05','2024-07-16 14:43:06',2);
INSERT INTO `users` (`id`,`firstname`,`lastname`,`phone_number`,`username`,`password`,`date_of_birth`,`email`,`address`,`created_at`,`updated_at`,`role_id`) VALUES (4,'Dung','Le','0987656344','dungle','$2a$10$1bkTvaOAPelaZ92InrJsgeWJ.x71huvvI4MrdP9D6iyt0fVHCj7k.','2001-10-09','nhan@gmail.com','Lầu 5 cốc','2024-07-16 14:24:40','2024-07-16 14:43:40',2);
INSERT INTO `users` (`id`,`firstname`,`lastname`,`phone_number`,`username`,`password`,`date_of_birth`,`email`,`address`,`created_at`,`updated_at`,`role_id`) VALUES (5,'Loi','Vo','0987656344','loivo','$2a$10$GOGo0V91JuolezpcFh/Soe7IC7tSa7VenSfvNvHDviGJqm1bkA5G6','2001-10-09','nhan@gmail.com','Lầu 5 cốc','2024-07-16 14:44:27',NULL,2);





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

--
-- Table structure for table `payment_method`
--
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
INSERT INTO `payment_method` 	(`name`	, `description`					)
VALUES              			("COD" 	, "Thanh toán khi nhận hàng" 	),
								("Bank"	, "Thanh toán online"			);
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



-- call vtifood.CreateOrder(2, '2024-07-14', 'Ba Tri', 'XÁC NHẬN', 'Test', 2, True, '2014-07-15');
