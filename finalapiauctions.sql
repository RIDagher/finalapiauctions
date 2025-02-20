-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: finalapiauctions
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `Auctions`
--

DROP TABLE IF EXISTS `Auctions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Auctions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemCode` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `itemDesc` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `sellerEmail` varchar(320) COLLATE utf8mb4_general_ci NOT NULL,
  `lastBid` decimal(10,2) DEFAULT NULL,
  `lastBidderEmail` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `itemCode` (`itemCode`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Auctions`
--

LOCK TABLES `Auctions` WRITE;
/*!40000 ALTER TABLE `Auctions` DISABLE KEYS */;
INSERT INTO `Auctions` VALUES (6,'ABC123','Vintage Watch','seller1@example.com',NULL,NULL,'2025-02-19 13:20:37','2025-02-19 13:20:37'),(7,'DEF456','Antique Vase','seller2@example.com',NULL,NULL,'2025-02-19 13:20:37','2025-02-19 13:20:37'),(8,'GHI789','Rare Coin Collection','seller3@example.com',NULL,NULL,'2025-02-19 13:20:37','2025-02-19 13:20:37'),(9,'JKL012','Signed Baseball','seller4@example.com',NULL,NULL,'2025-02-19 13:20:37','2025-02-19 13:20:37'),(10,'MNO345','Limited Edition Sneakers','seller5@example.com',NULL,NULL,'2025-02-19 13:20:37','2025-02-19 13:20:37'),(11,'MA','Signed Jersy','seller4@example.com',90.00,'seller@example.com','2025-02-19 18:26:04','2025-02-19 18:37:57'),(12,'MA123456','Car','selle@example.com',60.00,'seller@example.com','2025-02-19 18:36:57','2025-02-19 18:37:37');
/*!40000 ALTER TABLE `Auctions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-19 13:52:06
