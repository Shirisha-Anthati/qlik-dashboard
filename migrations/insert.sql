--
-- Table structure for table `utility_data`
--

DROP TABLE IF EXISTS `utility_data`;
CREATE TABLE `utility_data` (
  `id` int NOT NULL,
  `region` text,
  `category` text,
  `role` text,
  `user_id` text,
  `user_name` text,
  `screen_id` text,
  `screen_name` text,
  `activity_date` text,
  `start_time` text,
  `session_type` text,
  `duration` int DEFAULT NULL,
  `session_end_time` text,
  `parallel_screen_count` int DEFAULT NULL,
  `overlap` text,
  `time_breaks` double DEFAULT NULL,
  PRIMARY KEY (`id`)
); 
--
-- Dumping data for table `utility_data`
--

LOCK TABLES `utility_data` WRITE;
/*!40000 ALTER TABLE `utility_data` DISABLE KEYS */;
INSERT INTO `utility_data` VALUES (1,'AMS','Outdoor & Sports','User','george123','George, Kalvin','9e33f593-6797-4a84-8f1e-0b49c461f67f','Backpack','01-09-2023','08:37:51','VIEW ONLY',67,'08:38:58',1,'',0),(2,'EMEA','Electronics','User','ben456','Ben, Ten','3d4c1196-25da-44bf-bf72-ecc6d23b3f49','Bluetooth Earbuds','02-09-2023','08:37:53','VIEW ONLY',12,'08:38:05',0,'',-1.08),(3,'APJ','Home & Kitchen','User','john987','John, Cena','02c941d7-31e3-47d4-96e0-07e51b0ce7f2','Coffee Maker','03-09-2023','08:51:10','VIEW ONLY',99,'08:52:49',0,'',13.08),(4,'EMEA','Jewelry & Watches','User','martin90','Martin, Riley','b173c10d-e5b0-4b9b-9a5f-745ee84ec1c4','Designer Watch','04-09-2023','08:51:19','VIEW ONLY',297,'08:56:16',0,'',-1.5),(5,'AMS','Furniture','User','alex123','Alexandra, Flores','6d10ab35-e4c2-4c66-bd31-0e14e8242f8b','Desk Chair','04-09-2023','08:56:33','VIEW ONLY',29,'08:57:02',0,'',0.28),(6,'APJ','Office Supplies','User','max999','Maxi, Millian','0ec07c87-1079-41e1-8d2e-0ef0b4772d0c','Desk Organizer','04-09-2023','08:56:52','VIEW ONLY',85,'08:58:17',0,'',-0.17),(7,'EMEA','Electronics','User','mosh98','Mosh, Austin','792d3bf7-aae5-4c1c-9a02-8c7d7b61a4e5','Digital Camera','04-09-2023','10:05:59','VIEW ONLY',12,'10:06:11',0,'',67.7),(8,'APJ','Electronics','User','alison89','Alison, George','d46c4383-2d3e-4720-85a5-27d007660507','Gaming Console','04-09-2023','10:06:33','VIEW ONLY',132,'10:08:45',0,'',0.37),(9,'AMS','Electronics','User','maria25','Maria, Meyer','f8d95b04-9406-4c7f-8d4c-59e21c3eb2f8','Home Theater System','04-09-2023','10:08:46','VIEW ONLY',24,'10:09:10',0,'',0.02),(10,'EMEA','Home & Kitchen','User','ray143','Alana, Ray','7c1e7e17-1583-4a88-84f1-035b92b2a597','Kitchen Blender','04-09-2023','10:08:50','VIEW ONLY',333,'10:14:23',0,'',-0.33),(11,'APJ','Electronics','User','eden04','Eden, Sparks','5a05bea5-cf20-4927-80a9-6f82728b77cc','Laptop Pro','05-09-2023','10:14:24','VIEW ONLY',31,'10:14:55',0,'',0.02),(12,'EMEA','Home & Kitchen','User','anya01','Anya, Spy','16a0c020-1931-4647-9e5b-42b8cb800c1c','LED Desk Lamp','06-09-2023','10:14:55','UPDATE',77,'10:16:12',0,'',0),(13,'APJ','Outdoor & Sports','User','macie45','Macie, Wheeler','b9daa1f0-98f5-44f0-a10a-46b95b37e14d','Outdoor Grill','07-09-2023','11:35:41','VIEW ONLY',436,'11:42:57',0,'',79.48),(14,'AMS','Outdoor & Sports','User','jack76','Jack, Klein','d5f1c8f6-59b1-491d-aec3-743a4bc9ec02','Outdoor Tent','07-09-2023','11:42:57','VIEW ONLY',30,'11:43:27',0,'',0),(15,'APJ','Electronics','User','zoraa01','Zora, Hood','a0041631-22b2-4e46-9e50-8b731eab78ec','Portable Charger','07-09-2023','11:43:27','VIEW ONLY',14,'11:43:41',0,'',0),(16,'EMEA','Footwear','User','nezuka09','Nezuka, Slayer','824204d2-8f57-4fb7-bd14-e7a1981e0b50','Running Jacket','07-09-2023','11:43:42','VIEW ONLY',146,'11:46:08',0,'',0.02),(17,'APJ','Footwear','User','Prince01','Princeton, Hill','850c3b38-0d44-4ef2-ae0c-2069844e3f4a','Running Shoes','11-09-2023','11:46:09','VIEW ONLY',21,'11:46:30',0,'',0.02),(18,'AMS','Electronics','User','carolina09','Carolina, Turner','52a8e20b-c9f7-4b95-a7b6-103c409f39ca','Security Camera','12-09-2023','11:46:10','VIEW ONLY',49,'11:46:59',0,'',-0.33),(19,'APJ','Home & Kitchen','User','alia768','Alia, Bhutt','6d03b3e8-1830-4a4e-9b7c-48e4b102aeb4','Smart Thermostat','13-09-2023','11:47:00','VIEW ONLY',17,'11:47:17',0,'',0.02),(20,'EMEA','Electronics','User','lucy23','Lucy, Little','f47ac10b-58cc-4372-a567-0e02b2c3d479','Smart TV 4K','01-10-2023','11:47:17','VIEW ONLY',429,'11:54:26',0,'',0),(21,'APJ','Electronics','User','vaishu23','Vaishnavi,Aradhi','550e8400-e29b-41d4-a716-446655440000','Smartphone X','02-10-2023','11:35:41','VIEW ONLY',436,'11:42:57',0,'',79.48),(22,'AMS','Jewelry & Watches','User','bob45','Bob,Marle','01ea328a-0d77-4e6c-9bca-724eb67a8896','Sunglasses','03-11-2023','11:42:57','VIEW ONLY',30,'11:43:27',0,'',0),(23,'EMEA','Electronics','User','sonia','Sonia,Raj','4a295cd5-1a0b-4910-9b22-8c5a6a7e3b99','Tablet Pro','04-11-2023','11:43:27','VIEW ONLY',14,'11:43:41',0,'',0),(24,'APJ','Electronics','User','jaspreeth00','Jaspreeth,Singh','2bb3808e-0116-4f79-841e-acc53ec76d13','Wireless Headphones','05-11-2023','11:43:42','VIEW ONLY',146,'11:46:08',0,'',0.02),(25,'AMS','Electronics','User','marshell98','Marshell,Clark','683b0a80-ef23-41b0-88c4-4d15dd33b7eb','Wireless Keyboard','06-12-2023','11:46:09','VIEW ONLY',21,'11:46:30',0,'',0.02),(26,'EMEA','Electronics','User','karthik99','Karthik,Rajeshan','c0d8a13e-06c5-40a4-bb4c-20d72cb94064','Wireless Speaker','07-12-2023','11:46:10','VIEW ONLY',49,'11:46:59',0,'',-0.33);
/*!40000 ALTER TABLE `utility_data` ENABLE KEYS */;
UNLOCK TABLES;

