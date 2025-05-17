CREATE DATABASE  IF NOT EXISTS `dirseu` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `dirseu`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: dataepis.uandina.pe    Database: dirseu
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `asistencias`
--

DROP TABLE IF EXISTS `asistencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asistencias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_taller` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `id_sesion` int(11) NOT NULL,
  `estado` enum('Presente','Ausente') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_taller` (`id_taller`),
  KEY `id_estudiante` (`id_estudiante`),
  KEY `id_sesion` (`id_sesion`),
  CONSTRAINT `asistencias_ibfk_1` FOREIGN KEY (`id_taller`) REFERENCES `talleres` (`id`) ON DELETE CASCADE,
  CONSTRAINT `asistencias_ibfk_2` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `asistencias_ibfk_3` FOREIGN KEY (`id_sesion`) REFERENCES `sesiones_taller` (`id_sesion`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencias`
--

LOCK TABLES `asistencias` WRITE;
/*!40000 ALTER TABLE `asistencias` DISABLE KEYS */;
INSERT INTO `asistencias` VALUES (14,14,1,1,'Presente'),(15,14,6,1,'Presente'),(16,14,1,6,'Presente'),(17,14,6,6,'Presente'),(18,15,1,2,'Presente'),(19,15,6,2,'Ausente'),(20,16,1,3,'Presente'),(21,16,6,3,'Ausente');
/*!40000 ALTER TABLE `asistencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bachillerato`
--

DROP TABLE IF EXISTS `bachillerato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bachillerato` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idEgresado` int(11) NOT NULL,
  `tipo` enum('Ejercicio Pre Profesional','Internado') DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `fechaObtencion` date DEFAULT NULL,
  `nroResolucion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idEgresado` (`idEgresado`),
  CONSTRAINT `bachillerato_ibfk_1` FOREIGN KEY (`idEgresado`) REFERENCES `egresados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bachillerato`
--

LOCK TABLES `bachillerato` WRITE;
/*!40000 ALTER TABLE `bachillerato` DISABLE KEYS */;
INSERT INTO `bachillerato` VALUES (4,1,'Ejercicio Pre Profesional','2025-03-14','2025-03-22','2025-04-06','Res-2018-078');
/*!40000 ALTER TABLE `bachillerato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendario`
--

DROP TABLE IF EXISTS `calendario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha` date NOT NULL,
  `enlace` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendario`
--

LOCK TABLES `calendario` WRITE;
/*!40000 ALTER TABLE `calendario` DISABLE KEYS */;
INSERT INTO `calendario` VALUES (1,'Día Nacional de la vicuña','Esta es una descripción del registro.','2024-11-15','https://drive.google.com/file/d/1hNhL5kXB0c4z6Bp2ZNrkImQln7FK-l_n/view'),(3,'Día Mundial de la Educación Ambiental','Día Mundial de la Educación Ambiental','2025-01-26','https://drive.google.com/file/d/1kKXP3vXHR7sipvUZjF9tOTy8_KkBBwVs/view'),(5,'Día mundial de la acción frente al calentamiento global','Día mundial de la acción frente al calentamiento global','2025-01-28','https://drive.google.com/file/d/1C8ezjEPJz14oLniei4xVFcQ6bT0nxehb/view');
/*!40000 ALTER TABLE `calendario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `capacitaciones`
--

DROP TABLE IF EXISTS `capacitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `capacitaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `cupo_maximo` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capacitaciones`
--

LOCK TABLES `capacitaciones` WRITE;
/*!40000 ALTER TABLE `capacitaciones` DISABLE KEYS */;
INSERT INTO `capacitaciones` VALUES (1,'Capacitación en Liderazgo','Desarrolla habilidades de liderazgo y gestión de equipos.','2024-06-10','2024-06-12','Sala de Conferencias',50,NULL),(2,'Capacitación en Marketing Digital','Aprende estrategias de marketing en redes sociales.','2024-07-15','2024-07-17','Aula 305',40,NULL),(3,'Capacitación en Finanzas Personales','Gestiona tus finanzas personales de manera eficiente.','2024-08-20','2024-08-22','Aula 401',30,NULL),(4,'Capacitación en Primeros Auxilios','Adquiere conocimientos básicos de primeros auxilios.','2024-03-07','2024-03-22','Laboratorio de Salud',20,NULL),(5,'Capacitación en Gestión de Proyectos','Domina las técnicas de gestión de proyectos.','2024-10-10','2024-10-12','Aula 502',35,NULL),(6,'Capacitación en Desarrollo Web','Aprende a desarrollar aplicaciones web modernas.','2024-11-05','2024-11-07','Laboratorio de Computación',45,NULL),(7,'Capacitación en Recursos Humanos','Gestión y desarrollo del talento humano.','2024-05-15','2024-05-17','Aula 203',25,NULL),(8,'Capacitación en Innovación Empresarial','Fomenta la innovación en tu empresa.','2024-06-25','2024-06-27','Aula 302',30,NULL),(9,'Capacitación en Seguridad Informática','Protege tu información y sistemas.','2024-07-30','2024-08-01','Laboratorio de Redes',40,NULL),(10,'Capacitación en Ventas','Estrategias y técnicas efectivas de ventas.','2024-08-10','2024-08-12','Aula 404',35,NULL);
/*!40000 ALTER TABLE `capacitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coordinadores`
--

DROP TABLE IF EXISTS `coordinadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coordinadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `codigo_coordinador` varchar(50) NOT NULL,
  `nombre_coordinacion` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_coordinador` (`codigo_coordinador`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `coordinadores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordinadores`
--

LOCK TABLES `coordinadores` WRITE;
/*!40000 ALTER TABLE `coordinadores` DISABLE KEYS */;
INSERT INTO `coordinadores` VALUES (1,7,'C001','Coordinación de Desarrollo Formativo','987654321','Dirección A'),(2,8,'C002','Coordinación de Extensión Universitaria','963258741','Dirección B'),(3,9,'C003','Coordinación de Desarrollo Sostenible','741852963','Dirección C'),(4,10,'C004','Coordinación de Seguimiento al Egresado','123456789','Dirección D');
/*!40000 ALTER TABLE `coordinadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docentes`
--

DROP TABLE IF EXISTS `docentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docentes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_docente` varchar(20) NOT NULL,
  `departamento` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_docente` (`codigo_docente`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `docentes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docentes`
--

LOCK TABLES `docentes` WRITE;
/*!40000 ALTER TABLE `docentes` DISABLE KEYS */;
INSERT INTO `docentes` VALUES (1,'0211123123','Ingenieria','987654321','Mi Casa',1),(2,'654','Cusco','987654321','donde tu vieja',4);
/*!40000 ALTER TABLE `docentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `egresados`
--

DROP TABLE IF EXISTS `egresados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `egresados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(20) NOT NULL,
  `carrera` varchar(100) NOT NULL,
  `promocion` year(4) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `egresados_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `egresados`
--

LOCK TABLES `egresados` WRITE;
/*!40000 ALTER TABLE `egresados` DISABLE KEYS */;
INSERT INTO `egresados` VALUES (1,'987','100mts',2070,'987654321','tambien en mi jato',3),(2,'0198765432l','Ing. Sistemas',2024,'987654321','en tu casa',11);
/*!40000 ALTER TABLE `egresados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleadores`
--

DROP TABLE IF EXISTS `empleadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `codigo_empleador` varchar(50) NOT NULL,
  `nombre_empresa` varchar(255) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion_empresa` varchar(255) DEFAULT NULL,
  `area_negocio` varchar(255) DEFAULT NULL,
  `email_empresa` varchar(255) DEFAULT NULL,
  `fecha_registro` date DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_empleador` (`codigo_empleador`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `empleadores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleadores`
--

LOCK TABLES `empleadores` WRITE;
/*!40000 ALTER TABLE `empleadores` DISABLE KEYS */;
INSERT INTO `empleadores` VALUES (1,12,'10001','USC','987654321','en tu casa','extorsionar','empresa@gmail.com','2024-10-16'),(2,13,'10002','USC','123456789','mi casa','robo armado','empresa2@gmail.com','2024-10-16');
/*!40000 ALTER TABLE `empleadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleoactual`
--

DROP TABLE IF EXISTS `empleoactual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleoactual` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idEgresado` int(11) NOT NULL,
  `cargoLaboral` varchar(100) NOT NULL,
  `institucion` varchar(150) NOT NULL,
  `area` varchar(100) NOT NULL,
  `gradoUniversitario` varchar(100) NOT NULL,
  `fecha_inicio` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idEgresado` (`idEgresado`),
  CONSTRAINT `empleoactual_ibfk_1` FOREIGN KEY (`idEgresado`) REFERENCES `egresados` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleoactual`
--

LOCK TABLES `empleoactual` WRITE;
/*!40000 ALTER TABLE `empleoactual` DISABLE KEYS */;
INSERT INTO `empleoactual` VALUES (1,1,'CargadorXDDDD','UAC','Almacen','Bachiller','2028-11-15'),(8,2,'CargadorXprueba222','Institucion222','Area222','Grado222','2025-03-28');
/*!40000 ALTER TABLE `empleoactual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encuestas`
--

DROP TABLE IF EXISTS `encuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `encuestas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` enum('borrador','activa','inactiva') DEFAULT 'borrador',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encuestas`
--

LOCK TABLES `encuestas` WRITE;
/*!40000 ALTER TABLE `encuestas` DISABLE KEYS */;
INSERT INTO `encuestas` VALUES (1,'Encuesta de satisfacción1','Encuesta para evaluar el servicio','2024-11-11','2024-12-12','2024-11-10 21:16:51','borrador'),(2,'Encuesta de satisfacción2','Encuesta de satisfaccion 2','2024-11-11','2024-12-12','2024-11-10 21:23:02','borrador'),(7,'Encuesta de satisfacción3','Encuesta de satisfaccion 3','2024-11-11','2024-12-12','2024-11-11 15:38:13','borrador'),(8,'Encuesta de satisfacción4','Encuesta para evaluar el servicio4','2024-10-09','2024-10-18','2024-11-26 15:41:41','borrador');
/*!40000 ALTER TABLE `encuestas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiantes`
--

DROP TABLE IF EXISTS `estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(20) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `carrera` varchar(100) NOT NULL,
  `semestre` int(11) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiantes`
--

LOCK TABLES `estudiantes` WRITE;
/*!40000 ALTER TABLE `estudiantes` DISABLE KEYS */;
INSERT INTO `estudiantes` VALUES (1,'123','123','400mts',0,'2024-09-13','987654321','mi jato',2),(6,'01921234q','2024','Ingeniería de Sistemas',5,'2000-01-15','987654321','Av. Siempre Viva 123',35);
/*!40000 ALTER TABLE `estudiantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `lugar` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `codigo_coordinador` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_codigo_coordinador` (`codigo_coordinador`),
  CONSTRAINT `fk_codigo_coordinador` FOREIGN KEY (`codigo_coordinador`) REFERENCES `coordinadores` (`codigo_coordinador`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (13,'Feria Virtual de Empleo','Feria Virtual de Empleo','2024-12-19','20:30:00','Virtual','/uploads/resized-IMAGE-1734485417699-27773928.jpg','C004'),(17,'Feria de Empleabilidad','Feria de Empleabilidad','2024-11-28','20:40:00','Estacionamiento UAC','/uploads\\resized-IMAGE-1734486022389-482470976.jpg','C004'),(19,'BCP','Conoce más sobre el banco líder del país y la propuesta de valor que tiene para ti en el equipo comercial de BCP','2024-11-14','10:30:00','Auditorio Derecho','/uploads/resized-IMAGE-1734486807205-5062017.jpg','C004'),(23,'Concierto Coral de Gala','Por Fiestas Navideñas','2024-12-13','19:00:00','Basilica Catedral del Cusco','/uploads/IMAGE-1734531757080-480491238.jpg','C001'),(24,'V Reencuentro Andino 2024','V Reencuentro Andino 2024','2024-12-13','16:00:00','Paraninfo Universitario - Larapa','/uploads/IMAGE-1734531952053-85404739.jpg','C001'),(25,'Marinerathon 2024','Marinerathon 2024','2024-11-29','09:00:00','Estacionamiento UAC','/uploads/IMAGE-1734532047413-357270569.jpg','C001'),(26,'RAEETON 2024','Trae tus residuos eléctricos y electrónicos','2024-12-11','09:00:00','Estacionamiento UAC','/uploads/IMAGE-1734532462510-147796562.jpg','C003'),(27,'Donación De Sangre','\"Dona sangre, salva vidas\"','2024-08-08','08:00:00','Estacionamiento UAC','/uploads/IMAGE-1734532549922-665215472.jpg','C003'),(28,'Desfile de Aniversario','Demostremos nuestra identidad y orgullo por el aniversario de nuestra universidad','2024-05-19','10:00:00','Convento de la Compañía de Jesús','/uploads/IMAGE-1734582550901-331281883.jpg','C002'),(29,'Un programa de asociación Ferreycorp','Durante 3 días del programa en modalidad presencial, podrás reforzar bajo metodologías participativas y lúdicas, distintas competencias claves para tu desarrollo personal y profesional','2024-05-20','19:00:00','Virtual','/uploads/IMAGE-1734582709085-235539646.jpg','C004'),(30,'Talento COFIDE','Desarrollando Lideres Convocatoria 2025','2024-09-20','08:00:00','Virtual','/uploads/IMAGE-1734582842766-197338385.jpg','C004');
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiencias_laborales`
--

DROP TABLE IF EXISTS `experiencias_laborales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiencias_laborales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_egresado` int(11) NOT NULL,
  `empresa` varchar(255) NOT NULL,
  `puesto` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_egresado` (`id_egresado`),
  CONSTRAINT `experiencias_laborales_ibfk_1` FOREIGN KEY (`id_egresado`) REFERENCES `egresados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencias_laborales`
--

LOCK TABLES `experiencias_laborales` WRITE;
/*!40000 ALTER TABLE `experiencias_laborales` DISABLE KEYS */;
INSERT INTO `experiencias_laborales` VALUES (1,1,'empresa1','puesto1','descripcion1','2023-11-15','2024-11-15'),(4,1,'USC','Vendedor','Vender Ropa','2024-12-13','2024-12-29');
/*!40000 ALTER TABLE `experiencias_laborales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formacion_academica`
--

DROP TABLE IF EXISTS `formacion_academica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formacion_academica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_egresado` int(11) NOT NULL,
  `institucion` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_egresado` (`id_egresado`),
  CONSTRAINT `formacion_academica_ibfk_1` FOREIGN KEY (`id_egresado`) REFERENCES `egresados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formacion_academica`
--

LOCK TABLES `formacion_academica` WRITE;
/*!40000 ALTER TABLE `formacion_academica` DISABLE KEYS */;
INSERT INTO `formacion_academica` VALUES (1,1,'institucion1','titulo1','descripcion1','2023-11-15','2024-11-15');
/*!40000 ALTER TABLE `formacion_academica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habilidades`
--

DROP TABLE IF EXISTS `habilidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habilidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_egresado` int(11) NOT NULL,
  `habilidad` varchar(255) NOT NULL,
  `nivel` enum('básico','intermedio','avanzado') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_egresado` (`id_egresado`),
  CONSTRAINT `habilidades_ibfk_1` FOREIGN KEY (`id_egresado`) REFERENCES `egresados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habilidades`
--

LOCK TABLES `habilidades` WRITE;
/*!40000 ALTER TABLE `habilidades` DISABLE KEYS */;
INSERT INTO `habilidades` VALUES (1,1,'habilidad1','básico');
/*!40000 ALTER TABLE `habilidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `idiomas`
--

DROP TABLE IF EXISTS `idiomas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `idiomas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_egresado` int(11) NOT NULL,
  `idioma` varchar(255) NOT NULL,
  `nivel` enum('básico','intermedio','avanzado') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_egresado` (`id_egresado`),
  CONSTRAINT `idiomas_ibfk_1` FOREIGN KEY (`id_egresado`) REFERENCES `egresados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `idiomas`
--

LOCK TABLES `idiomas` WRITE;
/*!40000 ALTER TABLE `idiomas` DISABLE KEYS */;
INSERT INTO `idiomas` VALUES (2,1,'Ingles','intermedio');
/*!40000 ALTER TABLE `idiomas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripciones_capacitaciones`
--

DROP TABLE IF EXISTS `inscripciones_capacitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripciones_capacitaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entidad_id` int(11) NOT NULL,
  `egresado_id` int(11) NOT NULL,
  `fecha_inscripcion` date NOT NULL,
  `estado` enum('aprobado','pendiente','rechazado') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entidad_id` (`entidad_id`),
  KEY `egresado_id` (`egresado_id`) USING BTREE,
  CONSTRAINT `inscripciones_capacitaciones_ibfk_1` FOREIGN KEY (`entidad_id`) REFERENCES `capacitaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inscripciones_capacitaciones_ibfk_2` FOREIGN KEY (`egresado_id`) REFERENCES `egresados` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones_capacitaciones`
--

LOCK TABLES `inscripciones_capacitaciones` WRITE;
/*!40000 ALTER TABLE `inscripciones_capacitaciones` DISABLE KEYS */;
INSERT INTO `inscripciones_capacitaciones` VALUES (18,1,1,'2024-11-21','pendiente');
/*!40000 ALTER TABLE `inscripciones_capacitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripciones_ofertas_laborales`
--

DROP TABLE IF EXISTS `inscripciones_ofertas_laborales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripciones_ofertas_laborales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entidad_id` int(11) NOT NULL,
  `egresado_id` int(11) NOT NULL,
  `fecha_postulacion` date NOT NULL,
  `estado` enum('aprobado','pendiente','rechazado') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entidad_id` (`entidad_id`),
  KEY `egresado_id` (`egresado_id`) USING BTREE,
  CONSTRAINT `inscripciones_ofertas_laborales_ibfk_1` FOREIGN KEY (`entidad_id`) REFERENCES `ofertas_laborales` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inscripciones_ofertas_laborales_ibfk_2` FOREIGN KEY (`egresado_id`) REFERENCES `egresados` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones_ofertas_laborales`
--

LOCK TABLES `inscripciones_ofertas_laborales` WRITE;
/*!40000 ALTER TABLE `inscripciones_ofertas_laborales` DISABLE KEYS */;
/*!40000 ALTER TABLE `inscripciones_ofertas_laborales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripciones_talleres`
--

DROP TABLE IF EXISTS `inscripciones_talleres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripciones_talleres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entidad_id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `fecha_inscripcion` date NOT NULL,
  `estado` enum('aprobado','pendiente','rechazado') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entidad_id` (`entidad_id`),
  KEY `estudiante_id` (`estudiante_id`),
  CONSTRAINT `inscripciones_talleres_ibfk_1` FOREIGN KEY (`entidad_id`) REFERENCES `talleres` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inscripciones_talleres_ibfk_2` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones_talleres`
--

LOCK TABLES `inscripciones_talleres` WRITE;
/*!40000 ALTER TABLE `inscripciones_talleres` DISABLE KEYS */;
INSERT INTO `inscripciones_talleres` VALUES (5,14,1,'2024-11-21','pendiente'),(6,15,1,'2024-12-04','pendiente'),(7,16,1,'2024-12-04','pendiente'),(8,14,6,'2024-12-05','pendiente'),(9,15,6,'2024-12-05','pendiente'),(10,16,6,'2024-12-05','pendiente');
/*!40000 ALTER TABLE `inscripciones_talleres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripciones_voluntariados`
--

DROP TABLE IF EXISTS `inscripciones_voluntariados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripciones_voluntariados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entidad_id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `fecha_inscripcion` date NOT NULL,
  `estado` enum('aprobado','pendiente','rechazado') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entidad_id` (`entidad_id`),
  KEY `estudiante_id` (`estudiante_id`),
  CONSTRAINT `inscripciones_voluntariados_ibfk_1` FOREIGN KEY (`entidad_id`) REFERENCES `voluntariados` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inscripciones_voluntariados_ibfk_2` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones_voluntariados`
--

LOCK TABLES `inscripciones_voluntariados` WRITE;
/*!40000 ALTER TABLE `inscripciones_voluntariados` DISABLE KEYS */;
/*!40000 ALTER TABLE `inscripciones_voluntariados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructores`
--

DROP TABLE IF EXISTS `instructores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `codigo_instructor` varchar(50) NOT NULL,
  `nombre_taller` varchar(255) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_instructor` (`codigo_instructor`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `instructores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructores`
--

LOCK TABLES `instructores` WRITE;
/*!40000 ALTER TABLE `instructores` DISABLE KEYS */;
INSERT INTO `instructores` VALUES (1,26,'INSAV','Taller de Artes Visuales','123456789','Direccion del Instructor 1'),(2,27,'INSOS','Taller de Orquesta Sinfónica','234567890','Direccion del Instructor 2'),(3,28,'INSCoro','Taller de Coro','345678901','Direccion del Instructor 3'),(4,29,'INSDM','Taller de Danza Moderna','456789012','Direccion del Instructor 4'),(5,30,'INSDF','Taller de Danza Folclórica','567890123','Direccion del Instructor 5'),(6,31,'INSTeatro','Taller de Teatro','678901234','Direccion del Instructor 6'),(7,32,'INSTF','Taller de Tuna Femenina','789012345','Direccion del Instructor 7'),(8,33,'INSTU','Taller de Tuna Universitaria','890123456','Direccion del Instructor 8'),(9,34,'INSRC','Taller de Ritmo y Conexión','901234567','Direccion del Instructor 9');
/*!40000 ALTER TABLE `instructores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logros`
--

DROP TABLE IF EXISTS `logros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_egresado` int(11) NOT NULL,
  `logro` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_egresado` (`id_egresado`),
  CONSTRAINT `logros_ibfk_1` FOREIGN KEY (`id_egresado`) REFERENCES `egresados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logros`
--

LOCK TABLES `logros` WRITE;
/*!40000 ALTER TABLE `logros` DISABLE KEYS */;
INSERT INTO `logros` VALUES (1,1,'logro1','descripcion1','2023-11-15');
/*!40000 ALTER TABLE `logros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ofertas_laborales`
--

DROP TABLE IF EXISTS `ofertas_laborales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ofertas_laborales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `empresa` varchar(100) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `nro_contacto` varchar(15) DEFAULT NULL,
  `correo_contacto` varchar(255) DEFAULT NULL,
  `requisitos` text DEFAULT NULL,
  `carrera_destino` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario` (`id_usuario`),
  CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ofertas_laborales`
--

LOCK TABLES `ofertas_laborales` WRITE;
/*!40000 ALTER TABLE `ofertas_laborales` DISABLE KEYS */;
INSERT INTO `ofertas_laborales` VALUES (1,'Desarrollador Web','Empresa de tecnología busca desarrollador web con experiencia en React.','Tech Solution','2024-06-01','2024-06-30',NULL,NULL,NULL,NULL,NULL,12),(2,'Analista de Datos','Se requiere analista de datos para el área de marketing.','Data Corp','2024-07-01','2024-07-31',NULL,NULL,NULL,NULL,NULL,13),(3,'Diseñador Gráfico','Empresa de publicidad busca diseñador gráfico creativo.','Creativa S.A.','2024-08-01','2024-08-31',NULL,NULL,NULL,NULL,NULL,12),(4,'Ingeniero de Software','Desarrollo de software en equipo ágil.','Software Innovations','2024-09-01','2024-09-30',NULL,NULL,NULL,NULL,NULL,13),(5,'Gerente de Proyecto','Gestión de proyectos en el sector financiero.','Finanzas Globales','2024-10-01','2024-10-31',NULL,NULL,NULL,NULL,NULL,12),(6,'Especialista en SEO','Optimización de motores de búsqueda para e-commerce.','E-Commerce Experts','2024-11-01','2024-11-30',NULL,NULL,NULL,NULL,NULL,13),(7,'Contador Público','Empresa contable busca contador público con experiencia.','Contable S.A.','2024-05-01','2024-05-31',NULL,NULL,NULL,NULL,NULL,12),(8,'Desarrollador de Aplicaciones Móviles','Desarrollo de aplicaciones para iOS y Android.','AppDev','2024-06-01','2024-06-30',NULL,NULL,NULL,NULL,NULL,13),(9,'Administrador de Sistemas','Mantenimiento y administración de sistemas informáticos.','SysAdmin Corp','2024-07-01','2024-07-31',NULL,NULL,NULL,NULL,NULL,12),(10,'Especialista en Marketing','Desarrollo de estrategias de marketing digital.','Marketing Solutions','2024-08-01','2024-08-31',NULL,NULL,NULL,NULL,NULL,13),(12,'Desarrollo Web','Empresa de tecnología busca desarrollador web','Tech Solution','2024-10-17','2024-10-31','/uploads/resized-IMAGE-1729205953943-416170840.png','987654321','prueba@gmail.com','czxzc xxxxxxxxxx xxxxx xxxx','Economia',13),(36,'Gestión de proyectos en el sector tecnológico.','dsaasd','USC','2024-11-30','2024-12-07',NULL,'987654321','prueba@gmail.com','asdassa','Ingeniería de Sistemas',4);
/*!40000 ALTER TABLE `ofertas_laborales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opciones_preguntas`
--

DROP TABLE IF EXISTS `opciones_preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opciones_preguntas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pregunta_id` int(11) DEFAULT NULL,
  `texto` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pregunta_id` (`pregunta_id`),
  CONSTRAINT `opciones_preguntas_ibfk_1` FOREIGN KEY (`pregunta_id`) REFERENCES `preguntas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opciones_preguntas`
--

LOCK TABLES `opciones_preguntas` WRITE;
/*!40000 ALTER TABLE `opciones_preguntas` DISABLE KEYS */;
INSERT INTO `opciones_preguntas` VALUES (3,11,'Miguel'),(4,11,'Roger'),(7,11,'David');
/*!40000 ALTER TABLE `opciones_preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postulaciones`
--

DROP TABLE IF EXISTS `postulaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postulaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `egresado_id` int(11) NOT NULL,
  `oferta_id` int(11) NOT NULL,
  `estado_postulacion` enum('Recibido','En revisión','Rechazado','Aceptado') DEFAULT 'Recibido',
  `fecha_postulacion` date DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `egresado_id` (`egresado_id`),
  KEY `oferta_id` (`oferta_id`),
  CONSTRAINT `postulaciones_ibfk_1` FOREIGN KEY (`egresado_id`) REFERENCES `egresados` (`id`) ON DELETE CASCADE,
  CONSTRAINT `postulaciones_ibfk_2` FOREIGN KEY (`oferta_id`) REFERENCES `ofertas_laborales` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postulaciones`
--

LOCK TABLES `postulaciones` WRITE;
/*!40000 ALTER TABLE `postulaciones` DISABLE KEYS */;
INSERT INTO `postulaciones` VALUES (1,1,1,'Recibido','2024-11-15'),(2,2,1,'Recibido','2024-12-11'),(7,1,36,'Recibido','2024-12-16');
/*!40000 ALTER TABLE `postulaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preguntas`
--

DROP TABLE IF EXISTS `preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preguntas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `encuesta_id` int(11) DEFAULT NULL,
  `texto` varchar(255) NOT NULL,
  `tipo` enum('texto','opcion_multiple','casillas','numerica') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `encuesta_id` (`encuesta_id`),
  CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`encuesta_id`) REFERENCES `encuestas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntas`
--

LOCK TABLES `preguntas` WRITE;
/*!40000 ALTER TABLE `preguntas` DISABLE KEYS */;
INSERT INTO `preguntas` VALUES (2,2,'¿Cuál es tu pregunta?','texto'),(3,1,'¿Que hora es?','texto'),(11,1,'¿Como te llamas?','opcion_multiple'),(18,7,'¿Como te llamas?','texto');
/*!40000 ALTER TABLE `preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicaciones_encuestas`
--

DROP TABLE IF EXISTS `publicaciones_encuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicaciones_encuestas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `encuesta_id` int(11) DEFAULT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` enum('programada','publicada','cerrada') DEFAULT 'programada',
  `publico_objetivo` text DEFAULT NULL,
  `fecha_cierre` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `encuesta_id` (`encuesta_id`),
  CONSTRAINT `publicaciones_encuestas_ibfk_1` FOREIGN KEY (`encuesta_id`) REFERENCES `encuestas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicaciones_encuestas`
--

LOCK TABLES `publicaciones_encuestas` WRITE;
/*!40000 ALTER TABLE `publicaciones_encuestas` DISABLE KEYS */;
/*!40000 ALTER TABLE `publicaciones_encuestas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuestas`
--

DROP TABLE IF EXISTS `respuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuestas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `encuesta_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `fecha_respuesta` timestamp NOT NULL DEFAULT current_timestamp(),
  `pregunta_id` int(11) NOT NULL,
  `respuesta` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `encuesta_id` (`encuesta_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `fk_pregunta_id` (`pregunta_id`),
  CONSTRAINT `fk_pregunta_id` FOREIGN KEY (`pregunta_id`) REFERENCES `preguntas` (`id`),
  CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`encuesta_id`) REFERENCES `encuestas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `respuestas_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuestas`
--

LOCK TABLES `respuestas` WRITE;
/*!40000 ALTER TABLE `respuestas` DISABLE KEYS */;
INSERT INTO `respuestas` VALUES (2,1,4,'2024-11-18 00:55:20',3,'texto'),(3,1,4,'2024-11-18 00:55:20',11,'4'),(4,1,3,'2024-11-18 01:24:00',3,'texto'),(5,1,3,'2024-11-18 01:24:00',11,'4'),(6,1,3,'2024-11-18 01:26:54',3,'Dirseu'),(7,1,3,'2024-11-18 01:26:54',11,'4'),(8,1,3,'2024-11-18 01:28:10',3,'Dirseu'),(20,1,3,'2024-11-19 14:38:05',3,'dadasd'),(21,1,3,'2024-11-19 14:38:05',11,'4'),(22,1,3,'2024-11-22 14:15:42',3,'Prueba'),(23,1,3,'2024-11-22 14:15:42',11,'7'),(24,2,3,'2024-11-22 14:18:39',2,'Que hora es'),(25,7,3,'2024-11-22 14:19:06',18,'David');
/*!40000 ALTER TABLE `respuestas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuestas_detalles`
--

DROP TABLE IF EXISTS `respuestas_detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuestas_detalles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `respuesta_id` int(11) DEFAULT NULL,
  `pregunta_id` int(11) DEFAULT NULL,
  `opcion_id` int(11) DEFAULT NULL,
  `respuesta_texto` text DEFAULT NULL,
  `respuesta_numerica` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `respuesta_id` (`respuesta_id`),
  KEY `pregunta_id` (`pregunta_id`),
  KEY `opcion_id` (`opcion_id`),
  CONSTRAINT `respuestas_detalles_ibfk_1` FOREIGN KEY (`respuesta_id`) REFERENCES `respuestas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `respuestas_detalles_ibfk_2` FOREIGN KEY (`pregunta_id`) REFERENCES `preguntas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `respuestas_detalles_ibfk_3` FOREIGN KEY (`opcion_id`) REFERENCES `opciones_preguntas` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuestas_detalles`
--

LOCK TABLES `respuestas_detalles` WRITE;
/*!40000 ALTER TABLE `respuestas_detalles` DISABLE KEYS */;
/*!40000 ALTER TABLE `respuestas_detalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sesiones_taller`
--

DROP TABLE IF EXISTS `sesiones_taller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sesiones_taller` (
  `id_sesion` int(11) NOT NULL AUTO_INCREMENT,
  `id_taller` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `tipo` enum('practica','evento') NOT NULL,
  `detalle` text DEFAULT NULL,
  PRIMARY KEY (`id_sesion`),
  KEY `id_taller` (`id_taller`),
  CONSTRAINT `sesiones_taller_ibfk_1` FOREIGN KEY (`id_taller`) REFERENCES `talleres` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sesiones_taller`
--

LOCK TABLES `sesiones_taller` WRITE;
/*!40000 ALTER TABLE `sesiones_taller` DISABLE KEYS */;
INSERT INTO `sesiones_taller` VALUES (1,14,'2024-11-15','evento','marineraton'),(2,15,'2024-11-15','evento','marineraton'),(3,16,'2024-11-15','evento','marineraton'),(6,14,'2024-12-06','evento','Chocolatada');
/*!40000 ALTER TABLE `sesiones_taller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talleres`
--

DROP TABLE IF EXISTS `talleres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talleres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `cupo_maximo` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `codigo_instructor` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_codigo_instructor` (`codigo_instructor`),
  CONSTRAINT `fk_codigo_instructor` FOREIGN KEY (`codigo_instructor`) REFERENCES `instructores` (`codigo_instructor`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talleres`
--

LOCK TABLES `talleres` WRITE;
/*!40000 ALTER TABLE `talleres` DISABLE KEYS */;
INSERT INTO `talleres` VALUES (14,'Orquesta Sinfónica','Taller que reúne a músicos para interpretar una amplia variedad de obras clásicas y contemporáneas, fomentando el trabajo en equipo y la apreciación de la música sinfónica en su máxima expresión.','2024-08-01','2024-12-31','UAC',50,'/uploads/resized-IMAGE-1730085685078-140191312.jpg','INSOS'),(15,'Artes Gráficas','Enfocado en el desarrollo de habilidades artísticas y técnicas en diseño, ilustración y comunicación visual, este taller permite a los participantes explorar diferentes medios y estilos gráficos.','2024-08-01','2024-12-31','UAC',50,'/uploads/resized-IMAGE-1730085729204-11977182.jpg','INSAV'),(16,'Danza Folclórica','Este taller celebra la diversidad cultural mediante el aprendizaje de danzas tradicionales de diferentes regiones, promoviendo la identidad cultural y el aprecio por las costumbres folclóricas.','2024-08-01','2024-12-31','UAC',50,'/uploads/resized-IMAGE-1730085931644-52452705.png','INSDF');
/*!40000 ALTER TABLE `talleres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `titulo_profesional`
--

DROP TABLE IF EXISTS `titulo_profesional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `titulo_profesional` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idEgresado` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `fechaSustentacion` date DEFAULT NULL,
  `modalidadObtencion` varchar(100) DEFAULT NULL,
  `fechaObtencionTitulo` date DEFAULT NULL,
  `nroResolucion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idEgresado` (`idEgresado`),
  CONSTRAINT `titulo_profesional_ibfk_1` FOREIGN KEY (`idEgresado`) REFERENCES `egresados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titulo_profesional`
--

LOCK TABLES `titulo_profesional` WRITE;
/*!40000 ALTER TABLE `titulo_profesional` DISABLE KEYS */;
INSERT INTO `titulo_profesional` VALUES (5,1,'prueba','2025-03-20','no se','2025-03-30','Res-2018-078');
/*!40000 ALTER TABLE `titulo_profesional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=513 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (410,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzIyMDgyMTksImV4cCI6MTczMjIxMTgxOX0.bplUyfAwHpzERaudA9uRhqNTAj99AmY8vVh6Ur9oBwM'),(412,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzIyMTQxNjQsImV4cCI6MTczMjIxNzc2NH0.Skdrmy2nzaUvZ9hsbjO_BhkEvyV0BFOIhps-XlmcbfA'),(417,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzIyODUxNTUsImV4cCI6MTczMjI4ODc1NX0.7y4eFdLom11cufnXBUWgv2nOqoPAhzW-w7GRg-UgzNY'),(418,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzIyOTAxODksImV4cCI6MTczMjI5Mzc4OX0.NnVjd7gyV28sgUx7msdhidVozH7LNMlIA_f674jBc7I'),(420,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzIzMTExNjMsImV4cCI6MTczMjMxNDc2M30.O2MXt4Z1HvIOUEplEjRLgUkuxl6X78fpZVbPhZD2_RE'),(421,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzI1NDEwMDEsImV4cCI6MTczMjU0NDYwMX0.xYxO5DZWpsQFz0fLIu4_aj4xnJB8zrXPx8dCg181wh4'),(422,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzI1NDkwNjksImV4cCI6MTczMjU1MjY2OX0.7o4T4QQjaUl0i8cdxSi0Ox7fMEPWiRC13GZMzso1cbI'),(423,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzI1NTIzODcsImV4cCI6MTczMjU1NTk4N30.zLTPX9ySDBjYxt80VQPx8zaTOjfVlEpUmuxkteb9bUM'),(424,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzI2MzQ4MTQsImV4cCI6MTczMjYzODQxNH0.ld7ILhDJ_NUkGuORBM4WKp8J33kvpbn3RJrXLBiENkQ'),(425,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzMyNjM4NTc5LCJleHAiOjE3MzI2NDIxNzl9.7m5csLtISSTDuL2IKcBIuwEbSuzVaXhR5a49ZsrJFj8'),(426,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzI3MzI0NDMsImV4cCI6MTczMjczNjA0M30.lMoyeGyJllrcJc2KAh_mqWRmQYlDuNhPL3cl89-47Ws'),(427,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzMxNTQ4MjcsImV4cCI6MTczMzE1ODQyN30.3dYKQbbNgPDWUAG_NS9qYgXNE8hxQuS0SOTvYZHSclc'),(428,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzMxNjExNTMsImV4cCI6MTczMzE2NDc1M30.OVEjhRo6_OedZ9mzS_owiF4JAUpVqdPpZbb9RKwOo6A'),(429,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzMyNjg5NTAsImV4cCI6MTczMzI3MjU1MH0.y51CVG1PObcPbzfzSJETgTe2C28aAQGh1hPx_b-3H1c'),(430,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzMzMzE5ODE1LCJleHAiOjE3MzMzMjM0MTV9.PaeXOIuMTKx8DTpKuRZgInud4R0uTvp3SMXXIHYdkoA'),(431,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzMzMzI0NDQyLCJleHAiOjE3MzMzMjgwNDJ9.MqZTQu78g8zQYoHZ62nob4MdCxUvXBEepjIP9VwwxFM'),(432,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzMzMzI4Njg1LCJleHAiOjE3MzMzMzIyODV9.mkIDL7rfwppF3qFguWCNXwVXMSyQm7jw82ei10JmvpA'),(435,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzMzMzYyMDAyLCJleHAiOjE3MzMzNjU2MDJ9.PqQjimCuI6v815nDokmOKtWbdznMwoli4bTw2UHIJ9A'),(436,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzMzNDA2NjU1LCJleHAiOjE3MzM0MTAyNTV9.QMU8OMKDAycfKzrzrtP_esKlojGwfavjPSUkldUGxM4'),(439,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzMzNDEzMDU2LCJleHAiOjE3MzM0MTY2NTZ9.nHWPCSPFSgS_58oo-90V4ChLZxyiCTS7tk7UB5BUKMk'),(440,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzMzNDE3NzUxLCJleHAiOjE3MzM0MjEzNTF9.pdCJaJZtCI1VYvPFTVJR4U63mj2eTd2Y7m54cnMllDk'),(441,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzMzNDQyMjEyLCJleHAiOjE3MzM0NDU4MTJ9.voCSqmay-onucln2oNrlOuKHsM_nfYxaoaK7QKsrr_M'),(442,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzMzNzA5MDk2LCJleHAiOjE3MzM3MTI2OTZ9.X57coZt_mwCv8NtNfuUbdxhDJGE-E6oxhWHMhbn_LTo'),(443,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzMzNzEzMDQzLCJleHAiOjE3MzM3MTY2NDN9.OeQM9yiFxv9s4_uW7nAZK8V0IQFFmnb262Tk4ejqw0I'),(444,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzMzNzc5OTMxLCJleHAiOjE3MzM3ODM1MzF9.0ISlcTz7xE-XIBtbmO8F4i4AIVtD2NBre9d72yGewU4'),(445,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzMzNzg0ODM1LCJleHAiOjE3MzM3ODg0MzV9.3a_9Zlb2nSq1BJcpmugQxAWG6Y8kiuiwCSpBlF15OSA'),(446,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzMzNzg4NTQwLCJleHAiOjE3MzM3OTIxNDB9.tboaH9KyG4dchDNT19FOKOvGcatPfFvZAktfur9FjQQ'),(447,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzMzOTI1MDY5LCJleHAiOjE3MzM5Mjg2Njl9.2AmU6ZWDptPl6r54B27799Z6lIMTJb_EN5QepGupoZ8'),(448,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzM0MDExNjkxLCJleHAiOjE3MzQwMTUyOTF9.t6oUpjDjoY1Ko1RJJqJ0IwdMJT_GtIiClly1GiBnGL4'),(449,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzM0MDE1NjY3LCJleHAiOjE3MzQwMTkyNjd9.Q1xIdIq5gO8f0awGkQmhjTYYoyS3BIzz317DeVp9w2o'),(450,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzM0MjgwMjkwLCJleHAiOjE3MzQyODM4OTB9.NnzjYuUts_NCD2UAOzSJYtacHbF13XaaUQIkd9poEw4'),(451,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzM0Mjg1NzgxLCJleHAiOjE3MzQyODkzODF9.UQ1BQPBGsqfEU6N8faYoMe8yiXlA4qM5Skko_oU_3Ec'),(452,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzM0MjkzMjk5LCJleHAiOjE3MzQyOTY4OTl9.h0Md0pvYBXF_B7JWiTYKVCdYcdS9iugeKBcmswN9XQk'),(453,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzM0Mjk4OTU3LCJleHAiOjE3MzQzMDI1NTd9.9JNNju_KXJbBhz2d0K-Dq2-jb_AmyF04b04OjUeKUCg'),(454,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzM0MzAyOTg5LCJleHAiOjE3MzQzMDY1ODl9.l4-127PibCawCHYGsJ6WFv5y6GhsY6c81itrSJHlEFc'),(455,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzM0MzA2Nzg4LCJleHAiOjE3MzQzMTAzODh9.IVs1t7aXHNMGXnpQLgJzf9s-kSUvEq_HaHrsi55QCpg'),(456,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzM0MzEwNjkyLCJleHAiOjE3MzQzMTQyOTJ9.ceyuhWJQVOZr8GuB0QD8pLh8Xa6qUrATzaklGtWbjaU'),(458,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ikp1YW4gQWxiZXJ0byIsImxhc3ROYW1lIjoiUGVyZXogR2FyY2lhIiwiZW1haWwiOiJlbXBsZWFkb3JAZ21haWwuY29tIiwicm9sZSI6ImVtcGxlYWRvciIsImlkIjoxMn0sImlhdCI6MTczNDMxNTk2MSwiZXhwIjoxNzM0MzE5NTYxfQ.m_3Cq3L7-nwtuvr4UXpIQTLHjs_L7ByxNoumeVuDppk'),(459,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzQzNTQ2MjIsImV4cCI6MTczNDM1ODIyMn0.rLTLdw_9gyyLiDk4rAJ0VpCK3-aT5w3hc2e41rYoCoU'),(464,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ikp1YW4gQWxiZXJ0byIsImxhc3ROYW1lIjoiUGVyZXogR2FyY2lhIiwiZW1haWwiOiJlbXBsZWFkb3JAZ21haWwuY29tIiwicm9sZSI6ImVtcGxlYWRvciIsImlkIjoxMn0sImlhdCI6MTczNDM2NTEzNiwiZXhwIjoxNzM0MzY4NzM2fQ.MAglbBDH4WhfDapD3TtoLfRq_S3ZfUJ2GSPqVLWJXYY'),(466,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ikp1YW4gQWxiZXJ0byIsImxhc3ROYW1lIjoiUGVyZXogR2FyY2lhIiwiZW1haWwiOiJlbXBsZWFkb3JAZ21haWwuY29tIiwicm9sZSI6ImVtcGxlYWRvciIsImlkIjoxMn0sImlhdCI6MTczNDM2OTM5MCwiZXhwIjoxNzM0MzcyOTkwfQ.8G1qhNQI1VuEpcWhyGh3izsQmNNGB72aox13HQLRLF8'),(467,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ikp1YW4gQWxiZXJ0byIsImxhc3ROYW1lIjoiUGVyZXogR2FyY2lhIiwiZW1haWwiOiJlbXBsZWFkb3JAZ21haWwuY29tIiwicm9sZSI6ImVtcGxlYWRvciIsImlkIjoxMn0sImlhdCI6MTczNDM3MzIwMywiZXhwIjoxNzM0Mzc2ODAzfQ.rzyLcmL1thXj2UaJr2qVbE5KC8fBcodIVcosYqCHk4Q'),(468,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ikp1YW4gQWxiZXJ0byIsImxhc3ROYW1lIjoiUGVyZXogR2FyY2lhIiwiZW1haWwiOiJlbXBsZWFkb3JAZ21haWwuY29tIiwicm9sZSI6ImVtcGxlYWRvciIsImlkIjoxMn0sImlhdCI6MTczNDQwMjgyMSwiZXhwIjoxNzM0NDA2NDIxfQ.3LAiPRExrmLpioRUJfNHMsMuu6t1iPT_JUcWu9pFF2M'),(469,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik5vbWJyZTEiLCJsYXN0TmFtZSI6IkFwZWxsaWRvMSIsImVtYWlsIjoiZW1haWwxQGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWQiOjI2fSwiaWF0IjoxNzM0NDQxMjIxLCJleHAiOjE3MzQ0NDQ4MjF9.NsXZ3d9MqmE8XvPevBD7TVuk3GQGlHUG1bJyqaNpyVA'),(471,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik9sbWVyIiwibGFzdE5hbWUiOiJWaWxsZW5hIExlw7NuIiwiZW1haWwiOiJvdmlsbGVuYUB1YW5kaW5hLmVkdS5wZSIsInJvbGUiOiJjb29yZGluYWRvciIsImlkIjoxMH0sImlhdCI6MTczNDQ0OTc4MywiZXhwIjoxNzM0NDUzMzgzfQ.dpQRWzHxbbc6fx5XTcfnFkxsaqpJM3QsVJSK_yGilGw'),(472,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik9sbWVyIiwibGFzdE5hbWUiOiJWaWxsZW5hIExlw7NuIiwiZW1haWwiOiJvdmlsbGVuYUB1YW5kaW5hLmVkdS5wZSIsInJvbGUiOiJjb29yZGluYWRvciIsImlkIjoxMH0sImlhdCI6MTczNDQ2MDgyNiwiZXhwIjoxNzM0NDY0NDI2fQ.cfZhcyYSBWPYXeQ1hz8nrLJbSGIRU10hOlbHH8MZGdU'),(476,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik9sbWVyIiwibGFzdE5hbWUiOiJWaWxsZW5hIExlw7NuIiwiZW1haWwiOiJvdmlsbGVuYUB1YW5kaW5hLmVkdS5wZSIsInJvbGUiOiJjb29yZGluYWRvciIsImlkIjoxMH0sImlhdCI6MTczNDQ4MDc0OSwiZXhwIjoxNzM0NDg0MzQ5fQ.W91_oKZCuTggXI6BAUYqljjLbAybfQN5g1TBdEyQG8c'),(477,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik9sbWVyIiwibGFzdE5hbWUiOiJWaWxsZW5hIExlw7NuIiwiZW1haWwiOiJvdmlsbGVuYUB1YW5kaW5hLmVkdS5wZSIsInJvbGUiOiJjb29yZGluYWRvciIsImlkIjoxMH0sImlhdCI6MTczNDQ4MzU3NiwiZXhwIjoxNzM0NDg3MTc2fQ.p9eIFX2Emp2Pch-UVq-hZmlwklXlN1urSp8zw80wnhA'),(478,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik9sbWVyIiwibGFzdE5hbWUiOiJWaWxsZW5hIExlw7NuIiwiZW1haWwiOiJvdmlsbGVuYUB1YW5kaW5hLmVkdS5wZSIsInJvbGUiOiJjb29yZGluYWRvciIsImlkIjoxMH0sImlhdCI6MTczNDQ4NDM3NiwiZXhwIjoxNzM0NDg3OTc2fQ.99tWi3zf2ZSKMfjUqOAOSTQ1kmqDsN2X5ciwETLBXzU'),(479,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik9sbWVyIiwibGFzdE5hbWUiOiJWaWxsZW5hIExlw7NuIiwiZW1haWwiOiJvdmlsbGVuYUB1YW5kaW5hLmVkdS5wZSIsInJvbGUiOiJjb29yZGluYWRvciIsImlkIjoxMH0sImlhdCI6MTczNDQ4ODA1NSwiZXhwIjoxNzM0NDkxNjU1fQ.YI2iG6cqI6FLGG202Z2jgHj58Dt0qbHlZir0xown80g'),(480,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik9sbWVyIiwibGFzdE5hbWUiOiJWaWxsZW5hIExlw7NuIiwiZW1haWwiOiJvdmlsbGVuYUB1YW5kaW5hLmVkdS5wZSIsInJvbGUiOiJjb29yZGluYWRvciIsImlkIjoxMH0sImlhdCI6MTczNDQ5MDY0NCwiZXhwIjoxNzM0NDk0MjQ0fQ.BucL57Oq-J6SyeIWtzsWooPfg7Zrk3eB1RX84swEmp4'),(483,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzQ1MzM2NDYsImV4cCI6MTczNDUzNzI0Nn0.Owvk1FoJV09RUPRihi_69Iwe_cpo_S8cgSFOE1i78vI'),(484,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzQ1NDAyNzYsImV4cCI6MTczNDU0Mzg3Nn0.cF5S1-GWqJveSd9EHfCcxryiQNdL_svw5WZlbPSD9rA'),(485,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzQ1NzUyMTMsImV4cCI6MTczNDU3ODgxM30.vD7ZV4U5fpIhlViNHwdNVgeNcWCK8YkFqwWWdtCMsXM'),(489,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzM0NTgzMzE0LCJleHAiOjE3MzQ1ODY5MTR9.QemI0By0UL2Udq-3EJW4pnQN7N1h1n-cTTHIT4ZbbpA'),(490,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzM0NjM0MjI0LCJleHAiOjE3MzQ2Mzc4MjR9.7u2kur5zitJIMJkNYkQnsFDrXnPqWIzGvN8w3y7Ygmo'),(493,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzM0NjY0OTkzLCJleHAiOjE3MzQ2Njg1OTN9.XK9YESKL2ORlFI0jeSlJmPNzDczvplljYaLzR8GGvts'),(494,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVzdHVkaWFudGUiLCJsYXN0TmFtZSI6ImFsY2FjaG9mYSIsImVtYWlsIjoiZXN0dWRpYW50ZUBnbWFpbC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlkIjoyfSwiaWF0IjoxNzM0NzEwOTE3LCJleHAiOjE3MzQ3MTQ1MTd9.oJA1ZaKKqOANIPAxHDFz1hUoHiQVe8zkkP_REPJtTmA'),(495,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVzdHVkaWFudGUiLCJsYXN0TmFtZSI6ImFsY2FjaG9mYSIsImVtYWlsIjoiZXN0dWRpYW50ZUBnbWFpbC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlkIjoyfSwiaWF0IjoxNzM0NzExMTUwLCJleHAiOjE3MzQ3MTQ3NTB9.aZSVfeEo8IWIruQ3lszK-1B77ug9fhdl5z13cWCjDAM'),(496,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzQzMDg5NzQ3LCJleHAiOjE3NDMwOTMzNDd9.23S_F8UXauc3ta1mgLW4mWLLw7DUGXCNGLjtmwwGg7Q'),(497,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzQzMDkzODA1LCJleHAiOjE3NDMwOTc0MDV9.Fxl4T3YI-UhHG_GJ3YBE2pTFN1KlN0WYpqMQuOPoBj8'),(498,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzQzMTAwNjI1LCJleHAiOjE3NDMxMDQyMjV9.d2_eLwk5nrL_nLUb8W6gh4FiZpR-dHEHttD8aOrIDzI'),(499,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzQzMTA0ODY0LCJleHAiOjE3NDMxMDg0NjR9.Z7xxVnz1uAaCm21W1_y-m-jp7fjOSpHC9eddum5Egws'),(500,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Im9saXZlciIsImxhc3ROYW1lIjoic29ubmUiLCJlbWFpbCI6ImVncmVzYWRvMUBnbWFpbC5jb20iLCJyb2xlIjoiZWdyZXNhZG8iLCJpZCI6MTF9LCJpYXQiOjE3NDMxMDg2MDcsImV4cCI6MTc0MzExMjIwN30.j4EifMnH5RmixQWdKd0k_6wEPWdKI_ls8FiwT36CbXs'),(508,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Im9saXZlciIsImxhc3ROYW1lIjoic29ubmUiLCJlbWFpbCI6ImVncmVzYWRvMUBnbWFpbC5jb20iLCJyb2xlIjoiZWdyZXNhZG8iLCJpZCI6MTF9LCJpYXQiOjE3NDMxMzEyNjYsImV4cCI6MTc0MzEzNDg2Nn0.5AjE9BRI9jtuc5gTC3t_6Kp2UPPZStyrzwBlAxJRnKY'),(510,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Im9saXZlciIsImxhc3ROYW1lIjoic29ubmUiLCJlbWFpbCI6ImVncmVzYWRvMUBnbWFpbC5jb20iLCJyb2xlIjoiZWdyZXNhZG8iLCJpZCI6MTF9LCJpYXQiOjE3NDMxMzUxMDcsImV4cCI6MTc0MzEzODcwN30.AamjtLLBIrBN7IwmRShEcuhV3936OjEeVyvxBEiNx5Q'),(511,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJlZ3Jlc2FkbyIsImlkIjozfSwiaWF0IjoxNzQzMTM5NTEwLCJleHAiOjE3NDMxNDMxMTB9.x-6AK3qzQscLwE3F1Vb249dbuixj6m_GIw6pio_wfr8'),(512,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImlvbiIsImxhc3ROYW1lIjoiRElBWiIsImVtYWlsIjoiamhvbmRpYXpjaHVyYTEyM0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpZCI6MX0sImlhdCI6MTc0NzQ0MzM3NywiZXhwIjoxNzQ3NDQ2OTc3fQ.fCZDt_scC1UG0EvfT0rS9uzt9V-RXh2T35NhqApM-Ac');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('admin','student','egresado','coordinador','empleador','docente','instructor') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ion','DIAZ','jhondiazchura123@gmail.com','$2b$10$n0YmTrcI/Jwr.DO0svPXXO6.yw922L1gRrZLMgYKQM2c24qFLCP.C','admin'),(2,'estudiante','alcachofa','estudiante@gmail.com','$2b$10$m2FyijVHd.CkjwksmAa6B.eWy2bPGQXWLuWcng8jzt/34H90j7qiK','student'),(3,'egresado','pepino','egresado@gmail.com','$2b$10$w0..PmgyOIPA2GrP3Iz.me3Ipa5fQ8oBpiycR4pwyk27xKFeZOS9.','egresado'),(4,'docente','docente','docente@gmail.com','$2b$10$b8dBsusvDuJ9qbqnKLtd0.Myho6zhte9j0.Q2dPWs.yb7qq.LWzj2','admin'),(5,'DAVID','Alexander','david@gmail.com','$2b$10$VnXKgxa1rWNQm6gJvWCB.Ogq8UAcnNb7RpNDZSLMthcOnVsRVBH/u','admin'),(6,'Jannette','Delgado Obando','jdelgadoo@uandina.edu.pe','$2b$12$U0nWhVHdV9IT7BOGPhMZj.tLMBXgP0dRSp2b9kATxirLQI36DwjQC','admin'),(7,'Velia','Ardiles Romero','vardiles@uandina.edu.pe','$2b$12$bBBQqWYEBknML32LBqs0aO/WNpBEdt1B6YwsJhY6Ab0erAjWJg0IW','coordinador'),(8,'Erick Mijail','Martínez Rojas','emartinez@uandina.edu.pe','$2b$12$FKHBJpEKXykKiyS6v9fk5.VVvxJ7GJCD5E7C.f.7FMRItT9E8f8wm','coordinador'),(9,'Susana','Molleapaza Ugarte','smolleapaza@uandina.edu.pe','$2b$12$iBWAsgK2.ba.FEYRZfuKDONpO1cyFPgGkf1NvKeflVxaP/p2LspIC','coordinador'),(10,'Olmer','Villena León','ovillena@uandina.edu.pe','$2b$12$ZLOM/l6nQQBnfrJ0bMWvwO5B8jsNf9G5Zighsch2QW16I7OZzVx16','coordinador'),(11,'oliver','sonne','egresado1@gmail.com','$2b$10$x2cv43Uj2VgOhjw0dira9O38IYMqI1gct.rzxphmPpp6UFFCNJIau','egresado'),(12,'Juan Alberto','Perez Garcia','empleador@gmail.com','$2b$10$W5Gru1B2VljJ8/tBJJvdru0nTmemLm6m6GfRlDUPb471weh86w5KK','empleador'),(13,'Oliver','Sonne','empleador2@gmail.com','$2b$10$YR2JmVecACzM2A/AojJJCO7ObQ5Q3okqrHgY8uNgSQrfvNu3cItiK','empleador'),(26,'Nombre1','Apellido1','email1@gmail.com','$2b$10$DLiPGuChvxlJcXCx3UqoO.seUw8uK0BOD8m1dCriDsCnkRDKx//qW','instructor'),(27,'Nombre2','Apellido2','email2@gmail.com','$2b$10$AdQgkxZuui0ccpxRkH5/hOMdGqh0y.6Mal3rlBBeqnKY/tHnqMi9O','instructor'),(28,'Nombre3','Apellido3','email3@gmail.com','$2b$10$ezKljgg7wsqFFWyeYNhk7OVbRV013S8KNuLOrOJhsomyNpHZkh9m6','instructor'),(29,'Nombre4','Apellido4','email4@gmail.com','$2b$10$t6Lg1vFVMcnFv0ATPsNR.u/Fhacgc7RBEmHKpUJexMjszbhhD7SNu','instructor'),(30,'Nombre5','Apellido5','email5@gmail.com','$2b$10$emNhWQ4qQog2FbBZ1wXJMepsYuyvDCEJyTF5RIUYIveRFWKoCG88W','instructor'),(31,'Nombre6','Apellido6','email6@gmail.com','$2b$10$7eiLMDYQgbbifodESB5SG.G2f801vTHQ5b4jOVWjwOJYD0.534tZu','instructor'),(32,'Nombre7','Apellido7','email7@gmail.com','$2b$10$UjGj6p.S.ilYA6DulPRTCuoZS8M32ksIB7NkNE0xd6nRzykgTXzlq','instructor'),(33,'Nombre8','Apellido8','email8@gmail.com','$2b$10$RBWvxRySsCSk3hX1nIoW3O8NJsKbHlO7sJRj/tNQvf5TS2mpUg.AW','instructor'),(34,'Nombre9','Apellido9','email9@gmail.com','$2b$10$qjm2oPamCLEjW9x.SdAVoe4.ltSMsej3jMLawvEMF3kvYHhWWOKjm','instructor'),(35,'estudiante2','cueva','estudiante2@gmail.com','$2b$10$m2FyijVHd.CkjwksmAa6B.eWy2bPGQXWLuWcng8jzt/34H90j7qiK','student');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voluntariados`
--

DROP TABLE IF EXISTS `voluntariados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voluntariados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `cupo_maximo` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voluntariados`
--

LOCK TABLES `voluntariados` WRITE;
/*!40000 ALTER TABLE `voluntariados` DISABLE KEYS */;
INSERT INTO `voluntariados` VALUES (17,'Mochilas Solidarias','Apoyo a instituciones educativas con útiles escolares','2024-10-17','2024-10-31','Auditorio UAC',100000,'/uploads/resized-IMAGE-1729209509274-222778301.jpg'),(18,'dasdsa','adsasd','2024-12-05','2024-12-28','dassad',34,'/uploads/resized-IMAGE-1734450652975-163078342.jpg');
/*!40000 ALTER TABLE `voluntariados` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-16 20:01:52
