/*
SQLyog Enterprise v12.09 (64 bit)
MySQL - 10.4.8-MariaDB : Database - tookoin
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `cart` */

DROP TABLE IF EXISTS `cart`;

CREATE TABLE `cart` (
  `id_cart` int(5) NOT NULL AUTO_INCREMENT,
  `id_product` int(5) DEFAULT NULL,
  `id_seller` int(5) DEFAULT NULL,
  `id_buyer` int(11) DEFAULT NULL,
  `qty` int(5) DEFAULT NULL,
  PRIMARY KEY (`id_cart`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id_category` int(5) NOT NULL AUTO_INCREMENT,
  `name_category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id_product` int(5) NOT NULL AUTO_INCREMENT,
  `name_product` varchar(255) DEFAULT NULL,
  `desc_product` text DEFAULT NULL,
  `price` double DEFAULT NULL,
  `id_category` int(5) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `stock` int(5) DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `transaction` */

DROP TABLE IF EXISTS `transaction`;

CREATE TABLE `transaction` (
  `id_transaction` int(5) NOT NULL AUTO_INCREMENT,
  `transaction_date` datetime DEFAULT NULL,
  `id_seller` int(5) DEFAULT NULL,
  `id_buyer` int(5) DEFAULT NULL,
  `total_payment` double DEFAULT NULL,
  `expired_date` datetime DEFAULT NULL,
  `status` int(5) DEFAULT 1,
  PRIMARY KEY (`id_transaction`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `transaction_detail` */

DROP TABLE IF EXISTS `transaction_detail`;

CREATE TABLE `transaction_detail` (
  `id_detail` int(5) NOT NULL AUTO_INCREMENT,
  `id_transaction` int(5) DEFAULT NULL,
  `id_product` int(5) DEFAULT NULL,
  `qty` int(5) DEFAULT NULL,
  `subtotal` int(12) DEFAULT NULL,
  PRIMARY KEY (`id_detail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id_user` int(5) NOT NULL AUTO_INCREMENT,
  `name_user` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int(1) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
