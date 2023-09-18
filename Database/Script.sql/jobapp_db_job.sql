-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: jobapp_db
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
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `salary` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `category_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `employer_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_vi_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES ('1','Lập trình viên','Viết mã cho ứng dụng di động','10 - 12 triệu','2023-09-20','2023-10-10','Hà Nội','1','1','1'),('10','Thiết kế đồ họa cho ứng dụng','Thiết kế đồ họa cho ứng dụng','20 - 25 triệu','2023-10-12','2023-11-12','Hà Nội','4','1','1'),('11','Phát triển phần mềm','Phát triển phần mềm','10 - 12 triệu','2023-10-15','2023-11-15','Hồ Chí Minh','1','5','1'),('12','Quản lý dự án phần mềm','Quản lý dự án IT','20 - 25 triệu','2023-10-18','2023-11-18','Đà Nẵng','1','1','1'),('13','Biên tập nội dung','Biên tập nội dung','20 - 25 triệu','2023-10-20','2023-11-20','Hà Nội','3','4','1'),('14','Kế toán thuế','Kế toán thuế','Thỏa thuận','2023-10-22','2023-11-22','Hồ Chí Minh','2','3','1'),('15','Hỗ trợ khách hàng qua điện thoại','Hỗ trợ khách hàng qua điện thoại','20 - 25 triệu','2023-10-25','2023-11-25','Đà Nẵng','5','5','1'),('16','Phát triển ứng dụng di động','Phát triển ứng dụng di động','10 - 12 triệu','2023-10-28','2023-11-28','Hà Nội','1','3','1'),('17','Thiết kế đồ họa cho ứng dụng di động','Thiết kế đồ họa cho ứng dụng','20 - 25 triệu','2023-10-30','2023-11-30','Hà Nội','4','1','1'),('18','Quản lý sản phẩm phần mềm','Quản lý sản phẩm phần mềm','Thỏa thuận','2023-11-02','2023-12-02','Đà Nẵng','1','2','1'),('19','Hỗ trợ khách hàng khác','Hỗ trợ khách hàng online','20 - 25 triệu','2023-11-05','2023-12-05','Hà Nội','5','1','1'),('2','Quản lý dự án IT','Quản lý dự án phần mềm','10 - 12 triệu','2023-09-22','2023-10-22','Hồ Chí Minh','1','2','1'),('20','Phát triển ứng dụng android','Phát triển ứng dụng di động','20 - 25 triệu','2023-11-05','2023-12-05','Hà Nội','5','2','1'),('3','Thiết kế đồ họa Website','Thiết kế đồ họa cho website','Thỏa thuận','2023-09-25','2023-10-25','Đà Nẵng','4','3','1'),('4','Quản lý sản phẩm phần cứng','Quản lý sản phẩm phần cứng','Thỏa thuận','2023-09-28','2023-10-28','Hà Nội','2','4','1'),('5','Hỗ trợ khách hàng online','Hỗ trợ khách hàng online','10 - 12 triệu','2023-09-30','2023-10-30','Hồ Chí Minh','5','5','1'),('6','Phát triển ứng dụng web','Phát triển ứng dụng web','10 - 12 triệu','2023-10-02','2023-11-02','Đà Nẵng','1','3','1'),('7','Kế toán','Xử lý sổ sách kế toán','10 - 12 triệu','2023-10-05','2023-11-05','Hà Nội','2','4','1'),('8','Quảng cáo và PR','Quảng cáo và PR','Thỏa thuận','2023-10-08','2023-11-08','Hồ Chí Minh','3','1','1'),('9','Hỗ trợ khách hàng trực tuyến','Hỗ trợ khách hàng trực tuyến','20 - 25 triệu','2023-10-10','2023-11-10','Đà Nẵng','5','2','1');
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-19  0:55:54
