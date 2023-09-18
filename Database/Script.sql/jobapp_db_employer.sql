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
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `account_id_UNIQUE` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employer`
--

LOCK TABLES `employer` WRITE;
/*!40000 ALTER TABLE `employer` DISABLE KEYS */;
INSERT INTO `employer` VALUES ('1','Công ty công nghệ đa quốc gia Google','268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam','Google LLC là một công ty công nghệ đa quốc gia của Mỹ, chuyên về các dịch vụ và sản phẩm liên quan đến Internet, bao gồm các công nghệ quảng cáo trực tuyến, công cụ tìm kiếm, điện toán đám mây, phần mềm và phần cứng.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694701182/DoAnNganh/Google_oecx0q.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030122/DoAnNganh/download_1_vbevow.jpg','1'),('10','Doanh nghiệp Youtube','245/20b, Nguyễn Công Hoan, Hoà An, Liên Chiểu, Đà Nẵng, Việt Nam','YouTube là một nền tảng chia sẻ video trực tuyến của Mỹ có trụ sở chính tại San Bruno, California. Nền tảng này được tạo ra vào tháng 2 năm 2005 bởi ba nhân viên cũ của PayPal — Chad Hurley, Steve Chen và Jawed Karim. ','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Icon_Youtube_Logo_Png_Clipart_5305994_-_PinClipart_preview_rev_1_n9ibgk.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030122/DoAnNganh/download_1_vbevow.jpg','10'),('11','Tập đoàn VinGroup','178 Lê Thanh Nghị, Hoà Cường Bắc, Hải Châu, Đà Nẵng, Việt Nam','Tập đoàn Vingroup là một tập đoàn đa ngành của Việt Nam. Vingroup được thành lập vào ngày 8 tháng 8 năm 1993, với tiền thân là công ty Technocom chuyên về sản xuất mỳ ăn liền tại Ukraina bởi một nhóm các du học sinh người Việt Nam, những người này sau đó quay trở lại đầu tư đa ngành tại quê hương.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031300/DoAnNganh/hd_preview_rev_1_zocxc8.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030121/DoAnNganh/download_qj21cf.jpg','11'),('12','Doanh nghiệp Tiktok','192 Hoài Thanh, Bắc Mỹ An, Ngũ Hành Sơn, Đà Nẵng, Việt Nam','TikTok là nền tảng video âm nhạc và mạng xã hội của Trung Quốc được ra mắt vào năm 2017, dành cho các thị trường bên ngoài Trung Quốc. bởi Trương Nhất Minh, người sáng lập của ByteDance','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/TikTok_Logo_Video_Tik_Tok_Sign_Symbol_Musically_preview_rev_1_ubknkg.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030121/DoAnNganh/Steelcase__Learning_and_Innovation_Center_in_Munich___STYLEPARK_f7qegg.jpg','12'),('2','Tập đoàn đa quốc gia Microsoft','390 Hoàng Văn Thụ, Phường 4, Tân Bình, Thành phố Hồ Chí Minh, Việt Nam','Microsoft là một tập đoàn đa quốc gia của Hoa Kỳ đặt trụ sở chính tại Redmond, Washington; chuyên phát triển, sản xuất, kinh doanh bản quyền phần mềm và hỗ trợ trên diện rộng các sản phẩm và dịch vụ liên quan đến máy tính','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694704601/DoAnNganh/Microsoft_wdzszl.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030121/DoAnNganh/Steelcase__Learning_and_Innovation_Center_in_Munich___STYLEPARK_f7qegg.jpg','2'),('3','Công ty Airbnb','47 Nguyễn Huy Lượng, Phường 7, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam','Airbnb, là một thị trường cộng đồng cho việc đặt và cho thuê phòng, căn hộ, có trụ sở tại Silicon Valley, California được thành lập trong năm 2008, tương tự như một hệ thống đặt hàng trực tuyến.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694704044/DoAnNganh/Airbnb_dy33tc.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030122/DoAnNganh/_Businesspeople_At_Meeting_Desk__by_Stocksy_Contributor__Lumina__qctwhq.jpg','3'),('4','Công ty phần mềm Slack','475A Đ. Điện Biên Phủ, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam','Slack Technologies, LLC là một công ty phần mềm của Mỹ được thành lập vào năm 2009 tại Vancouver, British Columbia, được biết đến với nền tảng giao tiếp độc quyền Slack.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694701182/DoAnNganh/Slack_lqee4s.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030121/DoAnNganh/download_qj21cf.jpg','4'),('5','Công ty công nghệ Cloudinary','720A Đ. Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam','Cloudinary là một công ty công nghệ SaaS có trụ sở chính tại Santa Clara, California, với các văn phòng tại Israel, Anh, Ba Lan và Singapore. Công ty cung cấp dịch vụ quản lý hình ảnh và video dựa trên đám mây.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694704601/DoAnNganh/Cloudinary_qv3qsn.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030121/DoAnNganh/How_to_Succeed_at_Sandler_Rule_15__The_Best_Presentation_You_Will_Ever_Give_the_Prospect_Will_Never_See_-_Sandler_brqpty.png','5'),('6','Doanh nghiệp Instagram','27 Đ. Cổ Linh, Long Biên, Hà Nội, Việt Nam','Instagram là một dịch vụ mạng xã hội chia sẻ hình ảnh và video của Mỹ được tạo ra bởi Kevin Systrom và Mike Krieger. ','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Instagram_application_icon_Logo_Computer_Icons_Social_media_insta_transparent_background_PNG_clipart_preview_rev_1_wohb6c.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030120/DoAnNganh/How_to_Help_Your_Content_Team_to_Have_Better_Ideas_nixdbd.png','6'),('7','Tập đoàn Xiaomi','3250 Tân Minh, Sóc Sơn, Hà Nội, Việt Nam','Xiaomi Inc. là một Tập đoàn sản xuất hàng điện tử Trung Quốc có trụ sở tại Thâm Quyến. Xiaomi là nhà sản xuất điện thoại thông minh lớn thứ 2 thế giới; trong quí 3 năm 2021, Xiaomi đã chiếm gần 17% thị trường điện thoại thông minh thế giới.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Xiaomi_Logo_Mi___01_-_PNG_Logo_Vector_Downloads_SVG_EPS_g755yt.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030120/DoAnNganh/Project_Manager_l%C3%A0_g%C3%AC__cxkwho.jpg','7'),('8','Công ty truyền thông xã hội và công nghệ Meta','Số 24 - NH1 , Núi Hiểu, Quang Châu, Việt Yên, Bắc Giang, Việt Nam','Meta là một công ty truyền thông xã hội và công nghệ Mỹ có trụ sở tại Menlo Park, California. Meta cung cấp các sản phẩm và dịch vụ khác. Nó đã mua lại Instagram, WhatsApp và Oculus và phát triển độc lập các ứng dụng Facebook Messenger, Threads, Facebook Watch và Facebook Portal. Nó còn có 9,99% cổ phần trên Jio Platforms.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Facebook_PNG_%C3%8Dcone_Logo_Transparente_Sem_Fundo_preview_rev_1_ascfuk.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694959037/DoAnNganh/image_wfa9xo.png','8'),('9','Doanh nghiệp Twitter','Đường Kim Chung, Kim Chung, Đông Anh, Hà Nội, Việt Nam','Twitter, là một phương tiện truyền thông mạng xã hội và dịch vụ mạng xã hội trực tuyến được điều hành bởi X Corp., công ty kế thừa của Twitter, Inc. X cho phép người sử dụng đọc, nhắn và cập nhật các mẩu tin nhỏ gọi là tweets, một dạng tiểu blog.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Twitter_Logo_White_Background_PNG_Image_With_Transparent_Background_png_-_Free_PNG_Images_preview_rev_1_ecww3c.png','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030122/DoAnNganh/_Businesspeople_At_Meeting_Desk__by_Stocksy_Contributor__Lumina__qctwhq.jpg','9');
/*!40000 ALTER TABLE `employer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-19  0:55:55
