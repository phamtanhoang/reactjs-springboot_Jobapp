-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: jobapp
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('1','2023-09-16 04:41:21','active','admin','admin','$2a$10$CtKFdgP4Tg/HerX4mJT.VuDNrZXbBvNIsuxPTvOI1cJXNX.QeHUqm'),('10','2023-09-16 04:41:21','active','employer','youtube@example.com','$2a$10$ObXxK1v9HIVFFB9BAWaaa.DIMsZjLg6bBNCr7D4BuZFNaYHxXpZpS'),('11','2023-09-16 04:41:21','active','employer','vingroup@example.com','$2a$10$ObXxK1v9HIVFFB9BAWaaa.DIMsZjLg6bBNCr7D4BuZFNaYHxXpZpS'),('12','2023-09-16 04:41:21','active','employer','tiktok@example.com','$2a$10$ObXxK1v9HIVFFB9BAWaaa.DIMsZjLg6bBNCr7D4BuZFNaYHxXpZpS'),('13','2023-09-16 04:41:21','active','employer','google@example.com','$2a$10$4vDoiux9Ke1lJVOJTRdxge/o5lEYG1P.1IQ9s74miCXQ44PAmzen.'),('2','2023-09-16 04:41:21','active','employer','microsoft@example.com','$2a$10$ObXxK1v9HIVFFB9BAWaaa.DIMsZjLg6bBNCr7D4BuZFNaYHxXpZpS'),('3','2023-09-16 04:41:21','active','employer','airbnb@example.com','$2a$10$ObXxK1v9HIVFFB9BAWaaa.DIMsZjLg6bBNCr7D4BuZFNaYHxXpZpS'),('4','2023-09-16 04:41:21','active','employer','slack@example.com','$2a$10$ObXxK1v9HIVFFB9BAWaaa.DIMsZjLg6bBNCr7D4BuZFNaYHxXpZpS'),('5','2023-09-16 04:41:21','active','employer','cloudinary@example.com','$2a$10$ObXxK1v9HIVFFB9BAWaaa.DIMsZjLg6bBNCr7D4BuZFNaYHxXpZpS'),('5339a50d-2d59-499c-a944-6222eee4dc28','2023-10-09 07:36:59','pending','employer','123@gmail.com','$2a$10$6piDkpCCBoadhFQEkI8A/.ne79IS15RkMaBz7fKocsDbTdNM2JxaO'),('6','2023-09-16 04:41:21','active','employer','Instagram@example.com','$2a$10$ObXxK1v9HIVFFB9BAWaaa.DIMsZjLg6bBNCr7D4BuZFNaYHxXpZpS'),('60ce4695-22da-4333-bafa-19ca43cf6d3a','2023-09-29 07:35:20','active','candidate','candidate1@gmail.com','$2a$10$uT3O9mdDxrTsSvFm44TIwugy1N4..CO1.8uLQTS219HsxQvy1wFeq'),('7','2023-09-16 04:41:21','active','employer','xiaomi@example.com','$2a$10$ObXxK1v9HIVFFB9BAWaaa.DIMsZjLg6bBNCr7D4BuZFNaYHxXpZpS'),('7b02bc75-47f5-4ed4-b847-5dedd2b8b48b','2023-10-01 09:22:38','active','candidate','c3@gmail.com','$2a$10$n461f/9UAoPDVdUheRcIzuzOuHtzS45SHTdprXmFFIlz9HupOGwka'),('8','2023-09-16 04:41:21','active','employer','meta@example.com','$2a$10$ObXxK1v9HIVFFB9BAWaaa.DIMsZjLg6bBNCr7D4BuZFNaYHxXpZpS'),('9','2023-09-16 04:41:21','active','employer','twitter@example.com','$2a$10$ObXxK1v9HIVFFB9BAWaaa.DIMsZjLg6bBNCr7D4BuZFNaYHxXpZpS'),('a87cf42f-4eba-4cf3-abf8-abca38753dd1','2023-10-03 14:23:16','active','candidate','candidate3@gmail.com','$2a$10$EiDmgetIHzPjPuRpyrMleOAvH3L2rdQaYDH2AlrDZkfM/SU.HEmgG'),('c30050d1-818c-404d-8390-8190a1ef1293','2023-09-29 07:41:18','active','candidate','candidate2@gmail.com','$2a$10$eWbECEqwHaBhsgJdeB7gzeZnwNnKxo/CT2R0HAGjCt/t3ag9hxkvG');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `admin_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `account_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_id_UNIQUE` (`account_id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `apply_date` date NOT NULL,
  `CV` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci DEFAULT NULL,
  `letter` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `phone_number` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci DEFAULT NULL,
  `candidate_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `job_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` VALUES ('631c39b5-f32a-4422-936a-0f9e61ab2907','2023-09-27','164a2db6-c178-47ea-85b4-01baf64b8b73.pdf','<p>apply for job</p>','approved','0362400302','Phạm Tấn Hoàng','phamtanhoang3202@gmail.com','acb5af56-ebae-4ef1-9751-8bb05502ead7','14'),('7a6a7718-7bd2-498c-a8de-04677a9316f1','2023-10-01','5edfbc25-dbc6-4111-9da4-75779d91f921.pdf','<p>123123</p>','refused','123','Phạm','phamtanhoang3202@gmail.com','acb5af56-ebae-4ef1-9751-8bb05502ead7','3'),('85637b33-4426-4537-beaa-29791146a529','2023-10-11',NULL,'<p>123123123</p>','pending','123123123','123','123','7fc7ce26-b3e9-415f-a548-789e8e34cf31','14'),('94d0be68-b05f-490f-ba04-814478979335','2023-09-28','f06fd6d3-b7ad-4477-af8a-1e483201993b.pdf','<p>Dear Hiring Department at Mona Media,</p><p><br></p><p>I came across your company through the jobs website, and I am extremely enthusiastic about the Frontend Developer (Reactjs) at Mona Media. I am eager to embrace new challenges and further enhance my skills within the dynamic work environment your company offers. Based on my current knowledge and experiences, I believe I can make a meaningful contribution to your projects and team. I would like to extend my sincere appreciation to the Hiring Department at Mona Media for dedicating valuable time to reviewing this application. I am eagerly anticipating the possibility of an interview to elaborate on my skills and experiences in greater detail, as well as to gain a deeper understanding of the requirements for the Frontend Developer (Reactjs) role within your organization.</p><p>More information details about my background and qualifications are attached to my CV.</p><p><br></p><p>Sincerely,</p><p>Pham Tan Hoang</p>','refused','0362400302','Phạm Tấn Hoàng','phamtanhoang3202@gmail.com','acb5af56-ebae-4ef1-9751-8bb05502ead7','1'),('ac9c1b1f-dfde-4c2d-aca9-f592bb60e105','2023-10-11',NULL,'<p>Dear Hiring Team at KMS Technology, Inc.,</p><p>I am Pham Tan Hoang, currently a fourth-year student majoring in Information Technology at Open University in Ho Chi Minh City.</p><p>I learned about your esteemed company through the LinkedIn.com website, and I am highly interested in the position of Java Software Engineer Intern that your company is currently recruiting for. I aspire to take on challenges and further develop my skills in your dynamic work environment. With my current knowledge and experience, I believe I can make a significant contribution to your projects and team.</p><p>I would like to express my sincere gratitude to the Hiring Team at KMS Technology, Inc. for taking the precious time to consider my job application. I am eagerly looking forward to the opportunity to participate in an interview, where I can elaborate further on my skills and experience and gain a better understanding of the requirements for the Software Engineer Intern position at your company.</p><p>Detailed information about myself has been enclosed within my application.</p><p>Yours sincerely,</p><p>Pham Tan Hoang</p>','pending','0362123456','Lê Quang Đẹt','datlq@gmail.com','7fc7ce26-b3e9-415f-a548-789e8e34cf31','13');
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `account_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci DEFAULT NULL,
  `account_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci DEFAULT NULL,
  `skill` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci,
  `experience` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES ('2e5096a9-00dd-42a9-b995-ad20ca3eea7d','Nguyễn','An','','2023-10-01','Khác','a87cf42f-4eba-4cf3-abf8-abca38753dd1',NULL,NULL),('3c7d0421-272d-4245-9df5-d8d25b5244a9','Nguyễn','Phạm','','2023-09-25','Khác','7b02bc75-47f5-4ed4-b847-5dedd2b8b48b',NULL,NULL),('7fc7ce26-b3e9-415f-a548-789e8e34cf31','Lê','Đẹt','http://res.cloudinary.com/dcpatkvcu/image/upload/v1696166838/DoAnNganh/avatar/tds9y5gw9hqpksz8wxhb.jpg','2005-02-14','Nữ','c30050d1-818c-404d-8390-8190a1ef1293',NULL,NULL),('acb5af56-ebae-4ef1-9751-8bb05502ead7','Phạm Tấn','Hoàng','https://res.cloudinary.com/dzitm0sot/image/upload/v1696416720/hlfyt8v2tzmglb1d2xko.jpg','2002-02-18','Nam','60ce4695-22da-4333-bafa-19ca43cf6d3a','<h3><strong>Back-end:</strong></h3><ul><li><em>Spring Framework</em></li><li><em>.Net Framework</em></li></ul><h3><strong>Front-end:</strong></h3><ul><li><em>Reactjs</em></li><li><em>TailwindCSS</em></li></ul>','<ol><li>Làm việc tại OU từ 2020 - now (Fullstack developer)</li></ol>');
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('2cc51f0c-8d9c-4242-9e15-0ac3b57faf02','123'),('5','Chăm sóc khách hàng'),('1','Công nghệ thông tin'),('6','Khác'),('2','Kinh doanh'),('4','Thiết kế'),('3','Truyền thông');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `commented_at` datetime NOT NULL,
  `comment_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `account_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `blog_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employer`
--

DROP TABLE IF EXISTS `employer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employer` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `banner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `account_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_id_UNIQUE` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employer`
--

LOCK TABLES `employer` WRITE;
/*!40000 ALTER TABLE `employer` DISABLE KEYS */;
INSERT INTO `employer` VALUES ('1','Công ty công nghệ đa quốc gia Google','268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam','Google LLC là một công ty công nghệ đa quốc gia của Mỹ, chuyên về các dịch vụ và sản phẩm liên quan đến Internet, bao gồm các công nghệ quảng cáo trực tuyến, công cụ tìm kiếm, điện toán đám mây, phần mềm và phần cứng.','https://res.cloudinary.com/dzitm0sot/image/upload/v1697018137/Google_oecx0q.png','https://res.cloudinary.com/dzitm0sot/image/upload/v1697016052/download_qj21cf.png','13'),('10','Doanh nghiệp Youtube','245/20b, Nguyễn Công Hoan, Hoà An, Liên Chiểu, Đà Nẵng, Việt Nam','YouTube là một nền tảng chia sẻ video trực tuyến của Mỹ có trụ sở chính tại San Bruno, California. Nền tảng này được tạo ra vào tháng 2 năm 2005 bởi ba nhân viên cũ của PayPal — Chad Hurley, Steve Chen và Jawed Karim. ','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Icon_Youtube_Logo_Png_Clipart_5305994_-_PinClipart_preview_rev_1_n9ibgk.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030121/DoAnNganh/download_qj21cf.jpg','10'),('11','Tập đoàn VinGroup','178 Lê Thanh Nghị, Hoà Cường Bắc, Hải Châu, Đà Nẵng, Việt Nam','Tập đoàn Vingroup là một tập đoàn đa ngành của Việt Nam. Vingroup được thành lập vào ngày 8 tháng 8 năm 1993, với tiền thân là công ty Technocom chuyên về sản xuất mỳ ăn liền tại Ukraina bởi một nhóm các du học sinh người Việt Nam, những người này sau đó quay trở lại đầu tư đa ngành tại quê hương.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031300/DoAnNganh/hd_preview_rev_1_zocxc8.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030121/DoAnNganh/download_qj21cf.jpg','11'),('12','Doanh nghiệp Tiktok','192 Hoài Thanh, Bắc Mỹ An, Ngũ Hành Sơn, Đà Nẵng, Việt Nam','TikTok là nền tảng video âm nhạc và mạng xã hội của Trung Quốc được ra mắt vào năm 2017, dành cho các thị trường bên ngoài Trung Quốc. bởi Trương Nhất Minh, người sáng lập của ByteDance','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/TikTok_Logo_Video_Tik_Tok_Sign_Symbol_Musically_preview_rev_1_ubknkg.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030121/DoAnNganh/Steelcase__Learning_and_Innovation_Center_in_Munich___STYLEPARK_f7qegg.jpg','12'),('2','Tập đoàn đa quốc gia Microsoft','390 Hoàng Văn Thụ, Phường 4, Tân Bình, Thành phố Hồ Chí Minh, Việt Nam','Microsoft là một tập đoàn đa quốc gia của Hoa Kỳ đặt trụ sở chính tại Redmond, Washington; chuyên phát triển, sản xuất, kinh doanh bản quyền phần mềm và hỗ trợ trên diện rộng các sản phẩm và dịch vụ liên quan đến máy tính','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694704601/DoAnNganh/Microsoft_wdzszl.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030121/DoAnNganh/Steelcase__Learning_and_Innovation_Center_in_Munich___STYLEPARK_f7qegg.jpg','2'),('3','Công ty Airbnb','47 Nguyễn Huy Lượng, Phường 7, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam','Airbnb, là một thị trường cộng đồng cho việc đặt và cho thuê phòng, căn hộ, có trụ sở tại Silicon Valley, California được thành lập trong năm 2008, tương tự như một hệ thống đặt hàng trực tuyến.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694704044/DoAnNganh/Airbnb_dy33tc.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030122/DoAnNganh/_Businesspeople_At_Meeting_Desk__by_Stocksy_Contributor__Lumina__qctwhq.jpg','3'),('4','Công ty phần mềm Slack','475A Đ. Điện Biên Phủ, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam','Slack Technologies, LLC là một công ty phần mềm của Mỹ được thành lập vào năm 2009 tại Vancouver, British Columbia, được biết đến với nền tảng giao tiếp độc quyền Slack.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694701182/DoAnNganh/Slack_lqee4s.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030121/DoAnNganh/download_qj21cf.jpg','4'),('5','Công ty công nghệ Cloudinary','720A Đ. Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam','Cloudinary là một công ty công nghệ SaaS có trụ sở chính tại Santa Clara, California, với các văn phòng tại Israel, Anh, Ba Lan và Singapore. Công ty cung cấp dịch vụ quản lý hình ảnh và video dựa trên đám mây.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694704601/DoAnNganh/Cloudinary_qv3qsn.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030121/DoAnNganh/How_to_Succeed_at_Sandler_Rule_15__The_Best_Presentation_You_Will_Ever_Give_the_Prospect_Will_Never_See_-_Sandler_brqpty.png','5'),('6','Doanh nghiệp Instagram','27 Đ. Cổ Linh, Long Biên, Hà Nội, Việt Nam','Instagram là một dịch vụ mạng xã hội chia sẻ hình ảnh và video của Mỹ được tạo ra bởi Kevin Systrom và Mike Krieger. ','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Instagram_application_icon_Logo_Computer_Icons_Social_media_insta_transparent_background_PNG_clipart_preview_rev_1_wohb6c.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030120/DoAnNganh/How_to_Help_Your_Content_Team_to_Have_Better_Ideas_nixdbd.png','6'),('7','Tập đoàn Xiaomi','3250 Tân Minh, Sóc Sơn, Hà Nội, Việt Nam','Xiaomi Inc. là một Tập đoàn sản xuất hàng điện tử Trung Quốc có trụ sở tại Thâm Quyến. Xiaomi là nhà sản xuất điện thoại thông minh lớn thứ 2 thế giới; trong quí 3 năm 2021, Xiaomi đã chiếm gần 17% thị trường điện thoại thông minh thế giới.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Xiaomi_Logo_Mi___01_-_PNG_Logo_Vector_Downloads_SVG_EPS_g755yt.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030120/DoAnNganh/Project_Manager_l%C3%A0_g%C3%AC__cxkwho.jpg','7'),('8','Công ty truyền thông xã hội và công nghệ Meta','Số 24 - NH1 , Núi Hiểu, Quang Châu, Việt Yên, Bắc Giang, Việt Nam','Meta là một công ty truyền thông xã hội và công nghệ Mỹ có trụ sở tại Menlo Park, California. Meta cung cấp các sản phẩm và dịch vụ khác. Nó đã mua lại Instagram, WhatsApp và Oculus và phát triển độc lập các ứng dụng Facebook Messenger, Threads, Facebook Watch và Facebook Portal. Nó còn có 9,99% cổ phần trên Jio Platforms.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Facebook_PNG_%C3%8Dcone_Logo_Transparente_Sem_Fundo_preview_rev_1_ascfuk.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030121/DoAnNganh/download_qj21cf.jpg','8'),('9','Doanh nghiệp Twitter','Đường Kim Chung, Kim Chung, Đông Anh, Hà Nội, Việt Nam','Twitter, là một phương tiện truyền thông mạng xã hội và dịch vụ mạng xã hội trực tuyến được điều hành bởi X Corp., công ty kế thừa của Twitter, Inc. X cho phép người sử dụng đọc, nhắn và cập nhật các mẩu tin nhỏ gọi là tweets, một dạng tiểu blog.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Twitter_Logo_White_Background_PNG_Image_With_Transparent_Background_png_-_Free_PNG_Images_preview_rev_1_ecww3c.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030122/DoAnNganh/_Businesspeople_At_Meeting_Desk__by_Stocksy_Contributor__Lumina__qctwhq.jpg','9');
/*!40000 ALTER TABLE `employer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employer_vip`
--

DROP TABLE IF EXISTS `employer_vip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employer_vip` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `price` float NOT NULL,
  `employer_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employer_vip`
--

LOCK TABLES `employer_vip` WRITE;
/*!40000 ALTER TABLE `employer_vip` DISABLE KEYS */;
INSERT INTO `employer_vip` VALUES ('1','2023-09-10','2023-12-10',0,'1'),('2','2023-09-12','2023-12-12',0,'2'),('3','2023-09-15','2023-12-15',0,'3'),('4','2023-09-18','2023-12-18',0,'6'),('5','2023-09-20','2023-12-19',0,'12'),('6','2023-09-20','2023-12-19',0,'7'),('7','2023-09-20','2023-12-19',0,'6'),('8','2023-09-20','2023-12-19',0,'7');
/*!40000 ALTER TABLE `employer_vip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `candidate_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `job_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  PRIMARY KEY (`candidate_id`,`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci,
  `salary` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `category_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `employer_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES ('1','Lập trình viên','<h2><strong>Mô tả công việc</strong></h2><p>- Chương trình Quản trị viên tập sự (lương thưởng hấp dẫn) dành cho sinh viên&nbsp;ĐH sắp và mới ra trường trong năm 2022, 2023 đam mê với khối ngành nghề mình chọn (Kinh tế, Kỹ thuật, Ngoại ngữ,...)</p><p>- Chương trình chỉ áp dụng với các đại học sinh tốt nghiệp thuộc các chuyên ngành sau:</p><p>Cơ khí : 55 người</p><p>Ngôn ngữ Trung: 16 người</p><p>Điện - điện công nghiệp, tự động hóa : 45 người</p><p>Hóa vật liệu/ hóa học : 23 người</p><p>Khối ngành quản lý, kinh tế : 20 người (Nam)</p><h2><strong>Yêu cầu ứng viên</strong></h2><p>- Kỹ năng thuyết trình.</p><p>- Tự tin, tính trách nhiệm cao .</p><p>- Khả năng giao tiếp, xử lý vấn đề tốt.</p><p>- Kinh nghiệm: không yêu cầu</p><h2><strong>Quyền lợi được hưởng</strong></h2><p>- Kí túc xá nhân viên, chuyến xe về TP.HCM vào cuối tuần.</p><p>- Chế độ làm việc: 8 tiếng / ngày, tháng nghỉ 4 ngày. Thời gian làm việc: 7h30-17h00 (buổi trưa được nghỉ 1.5h).</p><p>- Lộ trình thăng tiến rõ ràng.</p><p>- Có cơ hội đi đào tạo tại Trung Quốc và làm việc tại nước ngoài.</p><p>- Thưởng thâm niên, thưởng giữa năm, thưởng cuối năm.</p><p>- Tham gia đầy đủ chế độ theo Luật lao động và các chế độ theo quy định của công ty.</p><p>- Đánh giá thưởng xe hàng năm: SH, vision, wave,...</p><p>- Phụ cấp điện thoại 200.000 VNĐ/tháng.</p><p>- Cung cấp bữa ăn giữa ca hàng ngày.</p><p>- Cấp phát đồ bảo hộ hàng năm.</p><p>- Phát quà và tổ chức tiệc sinh nhật tập thể.</p><p>- Phát quà vào các dịp lễ tết.</p><p>- Tổ chức tiệc tất niên và đi tham quan cắm trại dã ngoại.</p><p>- Hỗ trợ tiền xe về quê ăn tết, ký túc xá cho công nhân viên ở xa.</p>','10 - 12 triệu','2023-09-16','2023-10-06','Hà Nội','1','3','active'),('10','Thiết kế đồ họa cho ứng dụng','<h2><strong>Mô tả công việc</strong></h2><p>- Chương trình Quản trị viên tập sự (lương thưởng hấp dẫn) dành cho sinh viên&nbsp;ĐH sắp và mới ra trường trong năm 2022, 2023 đam mê với khối ngành nghề mình chọn (Kinh tế, Kỹ thuật, Ngoại ngữ,...)</p><p>- Chương trình chỉ áp dụng với các đại học sinh tốt nghiệp thuộc các chuyên ngành sau:</p><p>Cơ khí : 55 người</p><p>Ngôn ngữ Trung: 16 người</p><p>Điện - điện công nghiệp, tự động hóa : 45 người</p><p>Hóa vật liệu/ hóa học : 23 người</p><p>Khối ngành quản lý, kinh tế : 20 người (Nam)</p><h2><strong>Yêu cầu ứng viên</strong></h2><p>- Kỹ năng thuyết trình.</p><p>- Tự tin, tính trách nhiệm cao .</p><p>- Khả năng giao tiếp, xử lý vấn đề tốt.</p><p>- Kinh nghiệm: không yêu cầu</p><h2><strong>Quyền lợi được hưởng</strong></h2><p>- Kí túc xá nhân viên, chuyến xe về TP.HCM vào cuối tuần.</p><p>- Chế độ làm việc: 8 tiếng / ngày, tháng nghỉ 4 ngày. Thời gian làm việc: 7h30-17h00 (buổi trưa được nghỉ 1.5h).</p><p>- Lộ trình thăng tiến rõ ràng.</p><p>- Có cơ hội đi đào tạo tại Trung Quốc và làm việc tại nước ngoài.</p><p>- Thưởng thâm niên, thưởng giữa năm, thưởng cuối năm.</p><p>- Tham gia đầy đủ chế độ theo Luật lao động và các chế độ theo quy định của công ty.</p><p>- Đánh giá thưởng xe hàng năm: SH, vision, wave,...</p><p>- Phụ cấp điện thoại 200.000 VNĐ/tháng.</p><p>- Cung cấp bữa ăn giữa ca hàng ngày.</p><p>- Cấp phát đồ bảo hộ hàng năm.</p><p>- Phát quà và tổ chức tiệc sinh nhật tập thể.</p><p>- Phát quà vào các dịp lễ tết.</p><p>- Tổ chức tiệc tất niên và đi tham quan cắm trại dã ngoại.</p><p>- Hỗ trợ tiền xe về quê ăn tết, ký túc xá cho công nhân viên ở xa.</p>','20 - 30 triệu','2023-10-06','2023-11-05','Hà Nội','4','1','pending'),('11','Phát triển phần mềm','<h2><strong>Mô tả công việc</strong></h2><p>- Chương trình Quản trị viên tập sự (lương thưởng hấp dẫn) dành cho sinh viên&nbsp;ĐH sắp và mới ra trường trong năm 2022, 2023 đam mê với khối ngành nghề mình chọn (Kinh tế, Kỹ thuật, Ngoại ngữ,...)</p><p>- Chương trình chỉ áp dụng với các đại học sinh tốt nghiệp thuộc các chuyên ngành sau:</p><p>Cơ khí : 55 người</p><p>Ngôn ngữ Trung: 16 người</p><p>Điện - điện công nghiệp, tự động hóa : 45 người</p><p>Hóa vật liệu/ hóa học : 23 người</p><p>Khối ngành quản lý, kinh tế : 20 người (Nam)</p><h2><strong>Yêu cầu ứng viên</strong></h2><p>- Kỹ năng thuyết trình.</p><p>- Tự tin, tính trách nhiệm cao .</p><p>- Khả năng giao tiếp, xử lý vấn đề tốt.</p><p>- Kinh nghiệm: không yêu cầu</p><h2><strong>Quyền lợi được hưởng</strong></h2><p>- Kí túc xá nhân viên, chuyến xe về TP.HCM vào cuối tuần.</p><p>- Chế độ làm việc: 8 tiếng / ngày, tháng nghỉ 4 ngày. Thời gian làm việc: 7h30-17h00 (buổi trưa được nghỉ 1.5h).</p><p>- Lộ trình thăng tiến rõ ràng.</p><p>- Có cơ hội đi đào tạo tại Trung Quốc và làm việc tại nước ngoài.</p><p>- Thưởng thâm niên, thưởng giữa năm, thưởng cuối năm.</p><p>- Tham gia đầy đủ chế độ theo Luật lao động và các chế độ theo quy định của công ty.</p><p>- Đánh giá thưởng xe hàng năm: SH, vision, wave,...</p><p>- Phụ cấp điện thoại 200.000 VNĐ/tháng.</p><p>- Cung cấp bữa ăn giữa ca hàng ngày.</p><p>- Cấp phát đồ bảo hộ hàng năm.</p><p>- Phát quà và tổ chức tiệc sinh nhật tập thể.</p><p>- Phát quà vào các dịp lễ tết.</p><p>- Tổ chức tiệc tất niên và đi tham quan cắm trại dã ngoại.</p><p>- Hỗ trợ tiền xe về quê ăn tết, ký túc xá cho công nhân viên ở xa.</p>','10 - 12 triệu','2023-10-14','2023-11-14','Hồ Chí Minh','1','1','active'),('12','Quản lý dự án phần mềm','<h2><strong>Mô tả công việc</strong></h2><p>- Chương trình Quản trị viên tập sự (lương thưởng hấp dẫn) dành cho sinh viên&nbsp;ĐH sắp và mới ra trường trong năm 2022, 2023 đam mê với khối ngành nghề mình chọn (Kinh tế, Kỹ thuật, Ngoại ngữ,...)</p><p>- Chương trình chỉ áp dụng với các đại học sinh tốt nghiệp thuộc các chuyên ngành sau:</p><p>Cơ khí : 55 người</p><p>Ngôn ngữ Trung: 16 người</p><p>Điện - điện công nghiệp, tự động hóa : 45 người</p><p>Hóa vật liệu/ hóa học : 23 người</p><p>Khối ngành quản lý, kinh tế : 20 người (Nam)</p><h2><strong>Yêu cầu ứng viên</strong></h2><p>- Kỹ năng thuyết trình.</p><p>- Tự tin, tính trách nhiệm cao .</p><p>- Khả năng giao tiếp, xử lý vấn đề tốt.</p><p>- Kinh nghiệm: không yêu cầu</p><h2><strong>Quyền lợi được hưởng</strong></h2><p>- Kí túc xá nhân viên, chuyến xe về TP.HCM vào cuối tuần.</p><p>- Chế độ làm việc: 8 tiếng / ngày, tháng nghỉ 4 ngày. Thời gian làm việc: 7h30-17h00 (buổi trưa được nghỉ 1.5h).</p><p>- Lộ trình thăng tiến rõ ràng.</p><p>- Có cơ hội đi đào tạo tại Trung Quốc và làm việc tại nước ngoài.</p><p>- Thưởng thâm niên, thưởng giữa năm, thưởng cuối năm.</p><p>- Tham gia đầy đủ chế độ theo Luật lao động và các chế độ theo quy định của công ty.</p><p>- Đánh giá thưởng xe hàng năm: SH, vision, wave,...</p><p>- Phụ cấp điện thoại 200.000 VNĐ/tháng.</p><p>- Cung cấp bữa ăn giữa ca hàng ngày.</p><p>- Cấp phát đồ bảo hộ hàng năm.</p><p>- Phát quà và tổ chức tiệc sinh nhật tập thể.</p><p>- Phát quà vào các dịp lễ tết.</p><p>- Tổ chức tiệc tất niên và đi tham quan cắm trại dã ngoại.</p><p>- Hỗ trợ tiền xe về quê ăn tết, ký túc xá cho công nhân viên ở xa.</p>','20 - 25 triệu','2023-10-17','2023-11-17','Đà Nẵng','1','1','refused'),('13','Biên tập nội dung','Biên tập nội dung','20 - 25 triệu','2023-10-20','2023-11-20','Hà Nội','3','1','active'),('14','Kế toán thuế','Kế toán thuế','Thỏa thuận','2023-10-22','2023-11-22','Hồ Chí Minh','2','1','active'),('15','Hỗ trợ khách hàng qua điện thoại','Hỗ trợ khách hàng qua điện thoại','20 - 25 triệu','2023-10-25','2023-11-25','Đà Nẵng','5','1','pending'),('16','Phát triển ứng dụng di động','Phát triển ứng dụng di động','10 - 12 triệu','2023-10-28','2023-11-28','Hà Nội','1','1','active'),('17','Thiết kế đồ họa cho ứng dụng di động','Thiết kế đồ họa cho ứng dụng','20 - 25 triệu','2023-10-29','2023-11-29','Hà Nội','6','1','active'),('18','Quản lý sản phẩm phần mềm','Quản lý sản phẩm phần mềm','Thỏa thuận','2023-11-02','2023-12-02','Đà Nẵng','1','1','active'),('19','Hỗ trợ khách hàng khác','Hỗ trợ khách hàng online','20 - 25 triệu','2023-11-05','2023-12-05','Hà Nội','5','1','refused'),('2','Quản lý dự án IT','Quản lý dự án phần mềm','10 - 12 triệu','2023-09-22','2023-10-22','Hồ Chí Minh','1','1','active'),('20','Phát triển ứng dụng android','Phát triển ứng dụng di động','20 - 25 triệu','2023-11-05','2023-12-05','Hà Nội','5','1','active'),('3','Thiết kế đồ họa Website','Thiết kế đồ họa cho website','Thỏa thuận','2023-09-24','2023-10-04','Đà Nẵng','4','1','active'),('4','Quản lý sản phẩm phần cứng','Quản lý sản phẩm phần cứng','Thỏa thuận','2023-09-28','2023-10-05','Hà Nội','2','1','refused'),('5','Hỗ trợ khách hàng online','Hỗ trợ khách hàng online','10 - 12 triệu','2023-09-30','2023-10-30','Hồ Chí Minh','5','1','active'),('6','Phát triển ứng dụng web','Phát triển ứng dụng web','10 - 12 triệu','2023-10-02','2023-11-02','Đà Nẵng','1','1','active'),('7','Kế toán','Xử lý sổ sách kế toán','10 - 12 triệu','2023-10-05','2023-11-05','Hà Nội','2','1','refused'),('8','Quảng cáo và PR','Quảng cáo và PR','Thỏa thuận','2023-10-08','2023-11-08','Hồ Chí Minh','3','1','pending'),('9','Hỗ trợ khách hàng trực tuyến','Hỗ trợ khách hàng trực tuyến','20 - 25 triệu','2023-10-10','2023-11-10','Đà Nẵng','5','1','active');
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vip`
--

DROP TABLE IF EXISTS `vip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vip` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amout` int NOT NULL,
  `price` float NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vip`
--

LOCK TABLES `vip` WRITE;
/*!40000 ALTER TABLE `vip` DISABLE KEYS */;
/*!40000 ALTER TABLE `vip` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-14  2:14:15
