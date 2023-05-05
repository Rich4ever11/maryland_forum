-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: forum
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `categoryId` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` longtext,
  `slug` varchar(45) DEFAULT NULL,
  `logoUrl` varchar(45) DEFAULT NULL,
  `sportForumId` int DEFAULT NULL,
  `entertainmentForumId` int DEFAULT NULL,
  `miscForumId` int DEFAULT NULL,
  `generalForumId` int DEFAULT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'University of Maryland, Baltimore County','UMBC is a highly rated public university located in Catonsville, Maryland in the Baltimore Area. It is a mid-size institution with an enrollment of 9,220 undergraduate students.','UMBC','/static/UMBClogo.png',1,2,3,4),(2,'University of Maryland - College Park','Maryland is a highly rated public university located in College Park, Maryland in the Washington, D.C. Area. It is a large institution with an enrollment of 28,160 undergraduate students.','UMD','/static/UMDlogo.png',5,6,7,8),(3,'Johns Hopkins University','Far more than a place of learning, Hopkins is an ever-evolving community of academic trailblazers motivated by a desire to advance the human condition.','JHU','/static/JHUlogo.png',9,10,11,12),(4,'Towson University','At TU, you’ll learn through doing. Dig deep into the things that inspire you with world-class teaching and hands-on research.','TU','/static/TUlogo.png',13,14,15,16),(5,'Salisbury University','Home to 8,700 students from across the U.S. and around the world, SU is known for excellence in public higher education.','SU','/static/SUlogo.png',17,18,19,20),(6,'Morgan State University','Morgan State is a public university located in Baltimore, Maryland. As a historically black college, Morgan State has a strong history of and commitment to the education of black Americans.','MSU','/static/MSUlogo.png',21,22,23,24),(7,'Bowie State University','Bowie State is a public university located in Maryland. As a historically black college, BSU has a strong history of and commitment to the education of black Americans. ','BSU','/static/BUlogo.png',25,26,27,28);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum`
--

DROP TABLE IF EXISTS `forum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum` (
  `forumId` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` longtext,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`forumId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum`
--

LOCK TABLES `forum` WRITE;
/*!40000 ALTER TABLE `forum` DISABLE KEYS */;
INSERT INTO `forum` VALUES (1,'Sports','UMBC Sports',1),(2,'Entertainment','UMBC Entertainment',1),(3,'Misc','UMBC Misc',1),(4,'General','UMBC General',1),(5,'Sports','UMD Sports',2),(6,'Entertainment','UMD Entertainment',2),(7,'Misc','UMD Misc',2),(8,'General','UMD General',2),(9,'Sports','JHU Sports',3),(10,'Entertainment','JHU Entertainment',3),(11,'Misc','JHU Misc',3),(12,'General','JHU General',3),(13,'Sports','TU Sports',4),(14,'Entertainment','TU Entertainment',4),(15,'Misc','TU Misc',4),(16,'General','TU General',4),(17,'Sports','SU Sports',5),(18,'Entertainment','SU Entertainment',5),(19,'Misc','SU Misc',5),(20,'General','SU General',5),(21,'Sports','MSU Sports',6),(22,'Entertainment','MSU Entertainment',6),(23,'Misc','MSU Misc',6),(24,'General','MSU General',6),(25,'Sports','BSU Sports',7),(26,'Entertainment','BSU Entertainment',7),(27,'Misc','BSU Misc',7),(28,'General','BSU General',7);
/*!40000 ALTER TABLE `forum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `postId` int NOT NULL AUTO_INCREMENT,
  `publishedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `text` longtext,
  `threadId` int DEFAULT NULL,
  `creatorId` int DEFAULT NULL,
  PRIMARY KEY (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (48,'2023-04-18 17:06:53','Post your favorite moments from the tourney',24,33),(49,'2023-04-18 17:09:13','Dont be shy',24,33),(50,'2023-04-18 17:18:18','My favorite moment was when you choked and got blown out by Alabama #rip',24,34),(51,'2023-04-18 17:23:41','Please be nice',24,35),(52,'2023-04-18 17:25:43','Do you guys ever just stare at the sky and wonder what makes life so wonderful',25,32),(53,'2023-04-18 17:26:28','Sorry my account got hacked',25,32),(55,'2023-04-18 17:58:08','we all know you didnt get hacked',25,36),(57,'2023-04-21 14:48:57','“We’re growing right, we’re getting better every year and I like to believe we’re getting better every game,” Montgomery said. Bro name any school that can stop us at softball',27,36),(58,'2023-04-21 15:14:03','Relax, you guys are ranked 45 in softball',27,37),(59,'2023-04-21 15:25:10','dont test me bro',27,36),(60,'2023-04-21 15:31:44','just scored 15 points in my rec league and Im feeling dangerous  ? ',28,36),(61,'2023-04-21 15:32:33','lemme know if you think this is possible, srs btw',28,36),(62,'2023-04-21 15:36:27','just lol @ this thread, people on this forum just hop online and be saying anything',28,33),(63,'2023-04-21 15:40:14','Did you suffer a concussion during your rec league game also? I would bet my house, car, and children that you cant beat anyone on UMDs basketball roster',28,32),(64,'2023-04-21 15:44:22','Is it safe to do a full body workout every other day? I only have limited days I can get to the gym, and latley instead of doing upperbody or lowerbody I just do full body strenth workouts.\n\nI am trying to gain as much as I can without getting fat.\n',29,34),(65,'2023-04-21 15:50:40','Most beginner - intermediate programs are full body work outs, 3x per week so I think it\'s safe to assume that they\'re \'safe\'.\n',29,36),(66,'2023-04-21 15:52:08','If I go every other day I will be at the gym 4-5 times a week, is that over training?\n\nI typically work out for 60-90 minutes, I push my self and raise the weight each week.',29,34),(67,'2023-04-21 15:53:46','That makes no sense. There are only 7 days in a week. If you go every other day that is 3.5 times a week.\n',29,32),(68,'2023-04-21 15:54:41','Monday, Wednesday, Friday, Sunday. That is 4 days.\n\nHow do you go 3.5 times? Do a half workout or something? lol',29,37),(69,'2023-04-21 15:55:43','7x in 2 weeks = 3.5 times a week, genius.\n\nAnd yeah, 3x a week, full body workouts are good.\n',29,38),(70,'2023-04-21 15:56:40','I never said anything about going exactly 7 times, like I said, if I go every other day, that is 4 DAYS A WEEK. How hard is that to comprehend?\n\nWeek 1 - Sunday, Tuesday, Thursday, Saturday\nWeek 2 - Monday, Wednesday, Friday, Sunday.\n\n8 DAYS IN 2 WEEKS\n\nIn your terms,\n\n8x in 2 weeks = 4 times a week, genius.\n\nAll Muscle and No Brains? lol',29,37),(71,'2023-04-21 15:58:08','You double counted Sunday - that is 2 weeks plus 1 day.\n\nDid you fail grade 2 math ?\n\nPLUS your old post said 4 or 5 times a week. Now you just neglect to mention the 5.\n\nGrow up and admit when you are wrong. Believe me you will get a a lot further in life this way.',29,32),(73,'2023-04-21 16:09:35','I\'ll start, Java',30,37),(74,'2023-04-21 16:11:35','Objective C. Guarantee the guy who wrote this was on one.',30,32),(75,'2023-04-21 16:14:37','PHP and its not even close',30,35),(76,'2023-04-21 16:16:47','I think it would add some flair to the school',31,35),(77,'2023-04-21 16:25:36','We should take all the computer science students, give them some pads and have them play random D1 football teams within umbc\'s parking lot.',31,39),(78,'2023-04-21 16:27:00','better yet give them no pads, shave there heads and have each school give them a free hit before each game',31,38),(79,'2023-04-21 16:28:08','read thread title, I want to know',32,38),(80,'2023-04-21 16:30:43','besides me, I think you would have to shift through here -> https://umbc.prestosports.com/information/hof/bios',32,39),(81,'2023-04-21 16:32:43','dude tried to sneak himself in the discussion, your not slick bro lol. ',32,32),(83,'2023-04-21 21:14:11','just created my account, who let the flood gates open!',33,40),(84,'2023-04-21 21:14:43','im here to make some noise fellas',33,40),(85,'2023-04-21 21:15:55','This guy is way too happy. just dont get banned buddy',33,35),(86,'2023-04-21 21:18:28','never been to a game I need some input on if we are good?',34,41),(87,'2023-04-22 17:58:37','Who begs to differ',35,35),(88,'2023-04-22 17:59:17','someone chime in',36,35),(89,'2023-04-22 18:09:56','I plead to differ my sisters middle school soccer team could beat towsons',35,36),(90,'2023-04-22 18:10:37','The School Looks Great!',37,36),(91,'2023-04-22 18:10:57','Im visiting btw',37,36),(92,'2023-04-22 18:12:25','Claiming first post real estate in this category ',38,36),(93,'2023-04-22 18:16:10','gave it a 10/10 and will be giving my praise on google reviews',39,36),(94,'2023-04-22 18:17:05','Your just gonna leave us hanging on the name of the movie >:(',39,40),(95,'2023-04-22 18:17:53','This guy really just left us hanging',39,40),(96,'2023-04-22 20:11:32','ill start, I was walking on my way back to campus and I see a 10 foot tall man with red eyes. he looked at me and then disappeared. Strangest thing I have ever seen and I still cant explain it to this day',40,42),(97,'2023-04-22 20:11:44','Let me know what you think',40,42),(98,'2023-04-29 21:57:05','this is a great idea guys we must gain a football team to be the greatest',31,47),(99,'2023-04-29 22:05:44','I agree with user77. this guy is a super nut job',28,48),(106,'2023-04-29 22:39:55','yep I am the best',32,49),(107,'2023-05-01 21:05:28','Im trying to figure out if umd has good actors that came from the school. There is not much on google about it.',43,49),(111,'2023-05-04 15:02:58','ready, set go!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',46,49);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread`
--

DROP TABLE IF EXISTS `thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread` (
  `threadId` int NOT NULL AUTO_INCREMENT,
  `lastPostAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `lastPostId` int DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `creatorId` int DEFAULT NULL,
  `publishedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `forumId` int DEFAULT NULL,
  PRIMARY KEY (`threadId`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread`
--

LOCK TABLES `thread` WRITE;
/*!40000 ALTER TABLE `thread` DISABLE KEYS */;
INSERT INTO `thread` VALUES (24,'2023-04-18 17:01:13',33,'We had a great run in the Tournament ',33,'2023-04-18 17:01:13',5),(25,'2023-04-18 17:25:42',32,'Star Gazing o3o',32,'2023-04-18 17:25:42',4),(27,'2023-04-21 14:48:57',36,'Maryland softball blitzes past UMBC in 9-0 mercy-rule victory',36,'2023-04-21 14:48:57',5),(28,'2023-04-21 15:31:44',36,'ngl I could probably beat UMDs whole basketball roster one on one',36,'2023-04-21 15:31:44',5),(29,'2023-04-21 15:44:22',34,'Full Body Workout Every Other Day?',34,'2023-04-21 15:44:22',4),(30,'2023-04-21 16:09:35',37,'Name the worst programming language you\'ve ever used',37,'2023-04-21 16:09:35',4),(31,'2023-04-21 16:16:47',35,'Why does UMBC not have a football team?',35,'2023-04-21 16:16:47',1),(32,'2023-04-21 16:28:08',38,'Who is the greatest athlete to ever preform at UMBC',38,'2023-04-21 16:28:08',1),(33,'2023-04-21 21:14:11',40,'FIRST THREAD',40,'2023-04-21 21:14:11',3),(34,'2023-04-21 21:18:28',41,'Are we even good at any sports?',41,'2023-04-21 21:18:28',9),(35,'2023-04-22 17:58:37',35,'Best Soccer Team in Maryland?',35,'2023-04-22 17:58:37',13),(36,'2023-04-22 17:59:17',35,'Best Places to Eat Here?',35,'2023-04-22 17:59:17',18),(37,'2023-04-22 18:10:37',36,'Just Got On Campus',36,'2023-04-22 18:10:37',24),(38,'2023-04-22 18:12:25',36,'First Thread/Post',36,'2023-04-22 18:12:25',27),(39,'2023-04-22 18:16:10',36,'Just Watched The Funniest Movie On Campus ',36,'2023-04-22 18:16:10',2),(40,'2023-04-22 20:11:32',42,'Whats the most disturbing thing youve seen at this school',42,'2023-04-22 20:11:32',3),(43,'2023-05-01 21:05:28',49,'Does UMD has a famous actor alumni????',49,'2023-05-01 21:05:28',6),(46,'2023-05-04 15:02:58',49,'Favorite Band, And For The Love Of God You Cant Say The Beatles. ',49,'2023-05-04 15:02:58',3);
/*!40000 ALTER TABLE `thread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `avatar` varchar(80) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `lastVisitAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(45) DEFAULT NULL,
  `registeredAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(290) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (26,'69','69','2023-03-21 15:51:34','69','2023-03-21 15:51:34','69','x1y2auKNjrxu3tACwoqLoNBtOnjGtcv5sq3gUfB3WsQ='),(27,'69','69','2023-03-21 15:52:46','69','2023-03-21 15:52:46','69','x1y2auKNjrxu3tACwoqLoNBtOnjGtcv5sq3gUfB3WsQ='),(28,'https://hotpot.ai/images/site/ai/background_remover/teaser.jpg','gavawol888@necktai.com','2023-03-21 15:55:26','John Ferguson','2023-03-21 15:55:26','John2299','cdjWf9g5sZ349VyV5uo6ajOtbgwDWtr27MVI28aqAfw='),(29,'user','user','2023-03-21 16:10:52','user','2023-03-21 16:10:52','user','BPiZbadjt6lpsQKO4wB1aerzpjVIbdqyEdUSyFud+Ps='),(30,'user','user','2023-03-22 19:39:38','user','2023-03-22 19:39:38','user','BPiZbadjt6lpsQKO4wB1aerzpjVIbdqyEdUSyFud+Ps='),(32,'icons8-pause-60.png','user77','2023-04-06 14:24:54','user77','2023-04-06 14:24:54','user77','I8K+srHM/S7FANT8CdkA4HaqJi/O9I97M45c+NMaqfM='),(33,'netflix.png','kevin22','2023-04-18 14:28:51','kevin22','2023-04-18 14:28:51','kevin22','S8w7GFOfGbHRhwcySZJ5dkMR85S54gTY5tH90D6fniQ='),(34,'netflix.png','superman@whatever.com','2023-04-18 17:12:48','John Kelly','2023-04-18 17:12:48','johnkellyTHAGOD','+WD0axTcrQVMg42qh60oEeRCk6zd5ol4+UhI5dVxThU='),(35,'netflix.png','mods','2023-04-18 17:23:22','mods','2023-04-18 17:23:22','mods','r/0w0w0ZkOYaQ0rtj9oIGnNwFW3IzVxhsA0fy4cAYSo='),(36,'netflix.png','baduser','2023-04-18 17:52:33','baduser','2023-04-18 17:52:33','baduser','168Seim2gJrnC4swkyBGKmrktDaSM/V5rVpgwhWfot8='),(37,'NONE','baki','2023-04-21 15:10:41','baki','2023-04-21 15:10:41','baki','r3i3/SZMb9TY1lKuebOCT1niRBmt3/e693F1xderUiE='),(38,'NONE','player1','2023-04-21 15:55:25','player1','2023-04-21 15:55:25','player1','ScybDB3zTvkcfLKcKxFEAOzRWPlcmWsALGkpeYixXdw='),(39,'NONE','player2','2023-04-21 16:17:08','player2','2023-04-21 16:17:08','player2','vfQAC8gaUJ/q/d44E1VU3gjXqbrCtphDWNbovZKjG90='),(40,'NONE','john','2023-04-21 21:13:20','john','2023-04-21 21:13:20','john','yaT+P0/6wxJtgiwQJxEefW/5t9/6jdeOqGuTcfEXvTY='),(41,'NONE','jjh','2023-04-21 21:17:37','jjh','2023-04-21 21:17:37','jjh','vLrDos6/QVtKjP8QXv6qNIRhsdwv1NYGo45gyUjp1pU='),(42,'NONE','oliver','2023-04-22 20:03:40','oliver','2023-04-22 20:03:40','oliver','EoRpY3ae3C3S76teGUJ1GWIzxo5JuLiB6DoHuYNj+4Y='),(47,'NONE','newguylol@gmail.com','2023-04-29 21:55:21','oliver jones','2023-04-29 21:55:21','newguylol','XmZsNBD6eVFYLp3lo+NowMQOVbKLHMIeZy80qMlKm+4='),(48,'NONE','newuserlol@gmail.com','2023-04-29 22:03:43','Fred Jones','2023-04-29 22:03:43','newuserlol','bF/VnWMxh0QY3Sv7g7OOZP/flcYjN+hM/Fj1DCNiZAI='),(49,'NONE','popcorn@gmail.com','2023-04-29 22:36:05','Pop Corn','2023-04-29 22:36:05','popcorn','wMALBNL2QW1y4jRjtKYBAY3x9770pKzTVals5sI+yH4='),(50,'NONE','murphy77@gmail.com','2023-05-03 16:38:54','murphy77','2023-05-03 16:38:54','murphy77','qhoGEj55rMeX6FmS1S07j13SaSyT0yCkGVtLbIM9j7w=');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-05 15:45:16
