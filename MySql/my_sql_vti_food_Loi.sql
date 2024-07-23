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

-- Date: 2024-07-23 20:14
*/
INSERT INTO `products` (`id`,`name`,`quantity`,`price`,`abstract`,`description`,`created_at`,`updated_at`,`category_id`,`status`,`is_show`) VALUES (99,'Chân gà sả tắc',10,50000,'Món ăn vặt hấp dẫn','Chân gà sả tắc là món ăn khoái khẩu được rất nhiều người yêu thích. Những chiếc chân gà ngâm với gia vị, dai ngon, sần sật, ngấm vị chua cay, mặn ngọt tạo nên mùi vị càng hấp dẫn. Món ăn này thích hợp là món ăn vặt hoặc món nhậu lai rai của nhiều người.','2024-07-23 10:16:46',NULL,1,'ACTIVE',1);
INSERT INTO `products` (`id`,`name`,`quantity`,`price`,`abstract`,`description`,`created_at`,`updated_at`,`category_id`,`status`,`is_show`) VALUES (100,'Trà ô long mật ong',10,20000,'Đậm vị mật ong, ngon khó cưỡng','Trà ô long mật ong là thức uống được yêu thích vào mùa nóng này','2024-07-23 10:19:15',NULL,2,'ACTIVE',1);
INSERT INTO `products` (`id`,`name`,`quantity`,`price`,`abstract`,`description`,`created_at`,`updated_at`,`category_id`,`status`,`is_show`) VALUES (101,'Kem blueberry',10,20000,'Đã là hè thì phải có Kem blueberry ','Kem blueberry làm từ  blueberry nguyên chất','2024-07-23 10:20:44',NULL,3,'ACTIVE',1);
INSERT INTO `products` (`id`,`name`,`quantity`,`price`,`abstract`,`description`,`created_at`,`updated_at`,`category_id`,`status`,`is_show`) VALUES (102,'Gà chiên giòn',20,30000,'Giòn giòn giòn !!!','Gà chiên giòn được chiên bằng loại bột hảo hạn','2024-07-23 10:22:07',NULL,1,'ACTIVE',1);
INSERT INTO `products` (`id`,`name`,`quantity`,`price`,`abstract`,`description`,`created_at`,`updated_at`,`category_id`,`status`,`is_show`) VALUES (103,'Chè thái',10,20000,'Chè Thái nhưng đến từ Việt Nam','Chè Thái còn được gọi là “Chong” hoặc chè giun hay chè bánh lọt theo cách gọi của người miền Nam. Đây là một món ăn vặt nổi tiếng sẽ khiến du khách ngây ngất ngay từ cái nhìn.','2024-07-23 10:24:02',NULL,2,'ACTIVE',1);
INSERT INTO `products` (`id`,`name`,`quantity`,`price`,`abstract`,`description`,`created_at`,`updated_at`,`category_id`,`status`,`is_show`) VALUES (104,'Kem ngũ vị',20,15000,'Kem ngon khó cưỡng','Kem 5 vị từ 10 lọai trái cây khác nhau','2024-07-23 10:25:10',NULL,3,'ACTIVE',1);
INSERT INTO `products` (`id`,`name`,`quantity`,`price`,`abstract`,`description`,`created_at`,`updated_at`,`category_id`,`status`,`is_show`) VALUES (105,'Bánh kẹp phô mai',10,30000,'Đậm vị thơm khi còn nóng','Bánh kẹp phô mai, bên trong là phô mai','2024-07-23 10:26:25',NULL,1,'ACTIVE',1);
INSERT INTO `products` (`id`,`name`,`quantity`,`price`,`abstract`,`description`,`created_at`,`updated_at`,`category_id`,`status`,`is_show`) VALUES (106,'Chè Thái Sầu Riêng',10,20000,'Đặc trưng của mùa hè','Chè Thái Sầu Riêng thơm mùi sầu riêng','2024-07-23 10:29:25',NULL,2,'ACTIVE',1);
INSERT INTO `products` (`id`,`name`,`quantity`,`price`,`abstract`,`description`,`created_at`,`updated_at`,`category_id`,`status`,`is_show`) VALUES (107,'Kem dâu',10,20000,'Kem thật Dâu thật','Kem dâu với màu sắc đa dạng','2024-07-23 10:30:33','2024-07-23 10:32:13',3,'ACTIVE',1);


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

-- Date: 2024-07-23 20:16
*/
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (202,99,'91535469-c19e-46f0-ad34-6ee037c7fba1_chan ga.jpeg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (203,99,'5cd21751-7b61-48d3-a020-bc022d83c508_1-1.jpg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (204,99,'d3a0cc1e-8ec2-48b3-a7b4-a2e8fcd7d55e_5551d8a4d6358dd3835b59b4c9c746ad.jpg_720x720q80.jpg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (205,100,'9cce6a6e-85e6-4d71-963a-7368b840cfc5_vn-11134517-7r98o-lr0768nm4tl078@resize_ss400x400!@crop_w400_h400_cT.jpeg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (206,100,'c4c21307-03c4-413d-88f5-328eee1ba008_vn-11134517-7r98o-lteb7agjohc461@resize_ss400x400!@crop_w400_h400_cT.jpeg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (207,101,'ccf4d3aa-f320-4b34-bde5-327e56c75fbf_Blueberry-ice-cream-5-500x500.webp');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (208,101,'e49a3fce-0670-4b4a-91fe-9e70aabfc7d3_435381-ice-cream-base-Pam-Ziegler-Lutz-4x3-1-88949560ccf04d0fae12225be5b83fc2.jpg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (209,102,'557ce90d-ab27-419f-a6d3-4efb8dc70b1b_29351737_2152446668377854_356570745477300982_o_2152446668377854.jpg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (210,102,'a875a1fa-d049-4878-b193-b5af57a45a73_sub-buzz-708-1689798620-9.webp');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (211,103,'1365b95f-5675-4113-8657-0d4b823c49a7_vn-11134517-7r98o-lr462kesj7h55d@resize_ss400x400!@crop_w400_h400_cT.jpeg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (212,104,'e3ca6444-469d-4302-93ba-45152c49cc05_FOIC_NZICBLOG1.jpg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (213,105,'3cee2f40-d0fe-4c20-b9e6-477623f7060a_17tootired-grilled-cheese-articleLarge.webp');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (214,106,'8acfd803-1592-4973-8301-029fd237f98f_vn-11134517-7r98o-lqzylifif0zo96@resize_ss400x400!@crop_w400_h400_cT.jpeg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (215,106,'c6bc1b7f-0c09-442a-869a-839faf044d64_z3702048179558_ac1de346eeee627adf17cdb97d628251.jpg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (216,107,'97b744de-ac3e-4485-a32d-0c8a2fe07201_kem-dau.jpg');
INSERT INTO `product_images` (`id`,`product_id`,`image_url`) VALUES (217,107,'04055501-a444-4faf-ba09-8ce161b0be96_146677-ngay-hoi-kem-tuoi-an-kem-thoa-thich-tai-halloween-ice-cream.jpg');

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
