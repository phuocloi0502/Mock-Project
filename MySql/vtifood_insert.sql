
INSERT INTO `categories`    (`id`,`name`)
VALUES                      (1,'Đồ ăn'  ),
                            (2,'Đồ uống'),
                            (3,'Kem'    );

INSERT INTO `products`  (`id`   ,`name`                     ,`quantity` ,`price`    ,`abstract`                                                     ,`description`                      ,`created_at`           ,`updated_at`   ,`category_id`  ,`status`,`is_show` )
VALUES                  (1      ,'Chân gà rút xương'        ,10         ,50000      ,'Chân gà đã được RÚT XƯƠNG trộn sốt thái + sốt chấm đặcbiệt'   ,'Giá cả bình dân, tặng 2 ly bia'   ,'2024-07-06 15:35:38'  ,NULL           ,1              ,'ACTIVE',1         ),
                        (2      ,'Chân Gà Sốt Thái'         ,10         ,50000      ,'Hộp lớn Ú U Chân gà Nguyên Xương + Sốt chấm đặc biệt'         ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-06 15:36:31'  ,NULL           ,1              ,'ACTIVE',1         ),
                        (3      ,'Combo Vi Vu Hè 2'         ,10         ,50000      ,'1 Gà giòn vui vẻ + 1 Mỳ ý sốt bò bằm +1 Khoai tây + 1'        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:39:23'  ,NULL           ,1              ,'ACTIVE',1         ),
                        (4      ,'Combo Vi Vu Hè 1'         ,10         ,50000      ,'1 Gà giòn vui vẻ + 1 Mỳ ý sốt bò bằm +1 Khoai tây + 1'        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:39:48'  ,NULL           ,1              ,'ACTIVE',1         ),
                        (5      ,'Combo Vi Vu Hè 3'         ,10         ,50000      ,'1 Gà giòn vui vẻ + 1 Mỳ ý sốt bò bằm +1 Khoai tây + 1'        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:39:59'  ,NULL           ,1              ,'ACTIVE',1         ),
                        (6      ,'Combo Vi Vu Hè 4'         ,10         ,50000      ,'1 Gà giòn vui vẻ + 1 Mỳ ý sốt bò bằm +1 Khoai tây + 1'        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:40:04'  ,NULL           ,1              ,'ACTIVE',1         ),
                        (7      ,'Combo Vi Vu Hè 5'         ,10         ,50000      ,'1 Gà giòn vui vẻ + 1 Mỳ ý sốt bò bằm +1 Khoai tây + 1'        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:40:07'  ,NULL           ,1              ,'ACTIVE',1         ),
                        (8      ,'Combo Vi Vu Hè 6'         ,10         ,50000      ,'1 Gà giòn vui vẻ + 1 Mỳ ý sốt bò bằm +1 Khoai tây + 1'        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:40:10'  ,NULL           ,1              ,'ACTIVE',1         ),
                        (9      ,'Combo Vi Vu Hè 7'         ,10         ,50000      ,'1 Gà giòn vui vẻ + 1 Mỳ ý sốt bò bằm +1 Khoai tây + 1'        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:40:14'  ,NULL           ,1              ,'ACTIVE',1         ),
                        (10     ,'Combo Vi Vu Hè 8'         ,10         ,50000      ,'1 Gà giòn vui vẻ + 1 Mỳ ý sốt bò bằm +1 Khoai tây + 1'        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:40:17'  ,NULL           ,1              ,'ACTIVE',1         ),
                        (11     ,'BÁNH FLAN CÀ PHÊ ĐÁ BÀO'  ,10         ,50000      ,'SET GỒM 2 BÁNH FLAN KÈM CÀ PHÊ ĐÁ BÀO'                        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:45:06'  ,NULL           ,2              ,'ACTIVE',1         ),
                        (12     ,'TRÀ SỮA BÁNH FLAN'        ,10         ,50000      ,'SET GỒM 2 BÁNH FLAN KÈM CÀ PHÊ ĐÁ BÀO'                        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:45:24'  ,NULL           ,2              ,'ACTIVE',1         ),
                        (13     ,'BÁNH FLAN '               ,10         ,50000      ,'SET GỒM 2 BÁNH FLAN KÈM CÀ PHÊ ĐÁ BÀO'                        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:45:45'  ,NULL           ,2              ,'ACTIVE',1         ),
                        (14     ,'CHÈ THÁI SẦU RIÊNG'       ,10         ,50000      ,'SET GỒM 2 BÁNH FLAN KÈM CÀ PHÊ ĐÁ BÀO'                        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:45:56'  ,NULL           ,2              ,'ACTIVE',1         ),
                        (15     ,'Trà sữa oolong sen'       ,10         ,50000      ,'SET GỒM 2 BÁNH FLAN KÈM CÀ PHÊ ĐÁ BÀO'                        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:46:29'  ,NULL           ,2              ,'ACTIVE',1         ),
                        (16     ,'Trà sữa mật ong'          ,10         ,50000      ,'SET GỒM 2 BÁNH FLAN KÈM CÀ PHÊ ĐÁ BÀO'                        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:47:00'  ,NULL           ,2              ,'ACTIVE',1         ),
                        (17     ,'Trà đào sữa'              ,10         ,50000      ,'SET GỒM 2 BÁNH FLAN KÈM CÀ PHÊ ĐÁ BÀO'                        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:47:10'  ,NULL           ,2              ,'ACTIVE',1         ),
                        (18     ,'Trà  sữa vải'             ,10         ,50000      ,'SET GỒM 2 BÁNH FLAN KÈM CÀ PHÊ ĐÁ BÀO'                        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:47:20'  ,NULL           ,2              ,'ACTIVE',1         ),
                        (19     ,'Lục trà'                  ,10         ,50000      ,'SET GỒM 2 BÁNH FLAN KÈM CÀ PHÊ ĐÁ BÀO'                        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:47:30'  ,NULL           ,2              ,'ACTIVE',1         ),
                        (20     ,'Olong xoài đào'           ,10         ,50000      ,'SET GỒM 2 BÁNH FLAN KÈM CÀ PHÊ ĐÁ BÀO'                        ,'Giá cả bình dân, tặng 2 thùng bia','2024-07-07 04:47:42'  ,NULL           ,2              ,'ACTIVE',1         );


INSERT INTO `product_images`    (`id`       ,`product_id`       ,`image_url`                                                                                                                )
VALUES                          (1          ,1                  ,'uploads/fe313718-9466-4ec6-a93b-f16a5b5b60c9_11763609.jpg'                                                                ),
                                (2          ,1                  ,'uploads/f892ec6c-e520-4cc4-82c6-db5527076721_11763609.jpg'                                                                ),
                                (3          ,2                  ,'uploads/1e3e2d80-edc0-4878-a435-0ca2b9eee791_combo.jpeg'                                                                  ),
                                (4          ,3                  ,'uploads/77dd04a2-4f31-4307-8242-1f7a95f56283_combo.jpeg'                                                                  ),
                                (5          ,4                  ,'uploads/ca773624-438d-4c82-ac5a-e8464b2a3a5e_combo.jpeg'                                                                  ),
                                (6          ,5                  ,'uploads/f07a3acf-c265-4309-9790-497720dd7c19_combo.jpeg'                                                                  ),
                                (7          ,6                  ,'uploads/cd5891ee-5418-48da-9256-37343ab36b15_combo.jpeg'                                                                  ),
                                (8          ,7                  ,'uploads/59d2b8fb-12dd-4ab1-b1df-580c3a58fbd2_combo.jpeg'                                                                  ),
                                (9          ,8                  ,'uploads/65b1a519-7536-4c71-b2fc-6dd5f517e25f_combo.jpeg'                                                                  ),
                                (10         ,9                  ,'uploads/29d7f766-eeb2-4316-b9e9-c306295a6a7d_combo.jpeg'                                                                  ),
                                (11         ,10                 ,'uploads/f1e83d7f-cc52-49a7-84d7-0867996a4cb9_combo.jpeg'                                                                  ),
                                (12         ,11                 ,'uploads/ee0b22c9-4d5d-4514-a30e-8a4017aa37be_vn-11134517-7r98o-lr0j4ejsfxqx0c@resize_ss400x400!@crop_w400_h400_cT.jpeg'   ),
                                (13         ,12                 ,'uploads/166b894f-3e19-4dce-805e-7d48102082de_vn-11134517-7r98o-lr0j4ejsfxqx0c@resize_ss400x400!@crop_w400_h400_cT.jpeg'   ),
                                (14         ,13                 ,'uploads/3e13e94b-4d53-4e29-99f1-91d70b6a809c_vn-11134517-7r98o-lqzylifif0zo96@resize_ss400x400!@crop_w400_h400_cT.jpeg'   ),
                                (15         ,14                 ,'uploads/a1b41a96-59b2-48d2-aba9-87c72cef98cd_vn-11134517-7r98o-lqzylifif0zo96@resize_ss400x400!@crop_w400_h400_cT.jpeg'   ),
                                (16         ,14                 ,'uploads/7efae673-e6bf-42f9-b6d5-0f0f24fad0e3_vn-11134517-7r98o-lr462kesj7h55d@resize_ss400x400!@crop_w400_h400_cT.jpeg'   ),
                                (17         ,15                 ,'uploads/b98862a6-7b15-45f6-a673-ef222c513dbe_vn-11134517-7r98o-lr462kesj7h55d@resize_ss400x400!@crop_w400_h400_cT.jpeg'   ),
                                (18         ,16                 ,'uploads/fe0c114f-f9a6-4015-b696-4b6c0250ce83_vn-11134517-7r98o-lteb7agjohc461@resize_ss400x400!@crop_w400_h400_cT.jpeg'   ),
                                (19         ,17                 ,'uploads/15880f13-93d7-4bd8-a451-1940e71f9874_vn-11134517-7r98o-lteb7agjohc461@resize_ss400x400!@crop_w400_h400_cT.jpeg'   ),
                                (20         ,18                 ,'uploads/26bec38e-2b09-465c-8f19-3182398a38c1_vn-11134517-7r98o-lr0768nm4tl078@resize_ss400x400!@crop_w400_h400_cT.jpeg'   ),
                                (21         ,19                 ,'uploads/7847aee2-ab04-4afa-ba9d-2decb0e72a55_vn-11134517-7r98o-lr0768nm4tl078@resize_ss400x400!@crop_w400_h400_cT.jpeg'   ),
                                (22         ,20                 ,'uploads/98803018-4efa-40a7-bddb-320b6f4beae1_vn-11134517-7r98o-lr0768nm4tl078@resize_ss400x400!@crop_w400_h400_cT.jpeg'   );

INSERT INTO `roles` (id ,`role` ,`name` )
VALUES              (1  ,'ADMIN','admin'),
                    (2  ,'USER' ,'user' );

INSERT INTO `users` (`firstname`,`lastname` , `phone_number`, `username`, `password`, `date_of_birth`, `email`                  , `address`       ,`role_id`)
VALUES              ('Tran'     ,'My'       , 0336728006    , 'Duyen'   ,'123456'   ,'1993-01-20'    ,'tranduyen8006@gmail.com' ,'Ba Tri, Bến Tre',1        ),
                    ('Huynh'    ,'Dang'     , 0336728007    , 'Khoa'    ,'s55454'   ,'1997-07-19'    ,'duyentran120@gmail.com'  ,'Ba Tri, Bến Tre',2        ),
                    ('Chau'     ,'Yen'      , 0336728008    , 'Linh'    ,'asfvf5'   ,'2004-12-20'    ,'duyentran8006@gmail.com' ,'Ba Tri, Bến Tre',2        );

INSERT INTO `cart`  (`user_id`  )
VALUES              (1          ),
                    (2          );

INSERT INTO `cart_detail`  (`cart_id`  ,`product_id`   ,`quantity` )
VALUES                      (1          ,1              ,2          ),
                            (1          ,2              ,1          ),
                            (2          ,3              ,5          );

--
-- Table structure for table `payment_method`
--
INSERT INTO `payment_method` 	(`name`	, `description`					)
VALUES              			("COD" 	, "Thanh toán khi nhận hàng" 	),
								("Bank"	, "Thanh toán online"			);

call vtifood.CreateOrder(2, '2024-07-14', 'Ba Tri', 'XÁC NHẬN', 'Test', 2, True, '2014-07-15');