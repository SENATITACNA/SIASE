-- --------------------------------------------------------
-- Host:                         80.241.217.53
-- Versión del servidor:         8.0.45-0ubuntu0.24.04.1 - (Ubuntu)
-- SO del servidor:              Linux
-- HeidiSQL Versión:             12.17.0.7270
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para proyecto_SIASE
CREATE DATABASE IF NOT EXISTS `proyecto_SIASE` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proyecto_SIASE`;

-- Volcando estructura para tabla proyecto_SIASE.asistencia
CREATE TABLE IF NOT EXISTS `asistencia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alumno_id` int NOT NULL,
  `guardia_id` int NOT NULL,
  `fecha` date DEFAULT NULL,
  `hora_ingreso` time DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  `usuario_creacion` varchar(100) DEFAULT NULL,
  `usuario_modificacion` varchar(100) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_asistencia_alumno1_idx` (`alumno_id`),
  KEY `fk_asistencia_guardia1_idx` (`guardia_id`),
  CONSTRAINT `fk_asistencia_datos_alumnos` FOREIGN KEY (`alumno_id`) REFERENCES `datos_alumnos` (`id`),
  CONSTRAINT `fk_asistencia_guardia` FOREIGN KEY (`guardia_id`) REFERENCES `vigilante` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla proyecto_SIASE.asistencia: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_SIASE.carreras
CREATE TABLE IF NOT EXISTS `carreras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `estado` tinyint(1) DEFAULT '1',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` varchar(50) DEFAULT NULL,
  `usuario_modificacion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla proyecto_SIASE.carreras: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_SIASE.datos_alumnos
CREATE TABLE IF NOT EXISTS `datos_alumnos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `idsenati` varchar(20) NOT NULL,
  `semestre` int NOT NULL,
  `carrera_id` int NOT NULL,
  `estado` tinyint(1) DEFAULT '1',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_creacion` varchar(50) DEFAULT NULL,
  `usuario_modificacion` varchar(50) DEFAULT NULL,
  `contra` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carrera_id` (`carrera_id`),
  CONSTRAINT `datos_alumnos_ibfk_1` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla proyecto_SIASE.datos_alumnos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_SIASE.dispositivos_x_alumno
CREATE TABLE IF NOT EXISTS `dispositivos_x_alumno` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `numero_serie` varchar(100) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL,
  `usuario_creacion` varchar(100) DEFAULT NULL,
  `usuario_modificacion` varchar(100) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla proyecto_SIASE.dispositivos_x_alumno: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_SIASE.instructor
CREATE TABLE IF NOT EXISTS `instructor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `instructor_id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `usuario_creacion` varchar(100) DEFAULT NULL,
  `usuario_modificacion` varchar(100) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla proyecto_SIASE.instructor: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_SIASE.registro_dispositivo
CREATE TABLE IF NOT EXISTS `registro_dispositivo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` tinyint(1) NOT NULL,
  `fecha_envio` date NOT NULL DEFAULT (curdate()),
  `fecha_entrada` date NOT NULL,
  `fecha_salida` date NOT NULL,
  `observacion` text,
  `alumno_id` int NOT NULL,
  `instructor_id` int NOT NULL,
  `guardia_id` int NOT NULL,
  `objeto_id` int NOT NULL,
  `usuario_creacion` varchar(100) DEFAULT NULL,
  `usuario_modificacion` varchar(100) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `formulario_objeto_id_foreign` (`objeto_id`),
  KEY `formulario_guardia_id_foreign` (`guardia_id`),
  KEY `formulario_instructor_id_foreign` (`instructor_id`),
  CONSTRAINT `formulario_guardia_id_foreign` FOREIGN KEY (`guardia_id`) REFERENCES `vigilante` (`id`),
  CONSTRAINT `formulario_instructor_id_foreign` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`id`),
  CONSTRAINT `formulario_objeto_id_foreign` FOREIGN KEY (`objeto_id`) REFERENCES `dispositivos_x_alumno` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla proyecto_SIASE.registro_dispositivo: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_SIASE.tokens_vigilante
CREATE TABLE IF NOT EXISTS `tokens_vigilante` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `estado` enum('activo','usado') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'activo',
  `fecha_creacion` timestamp NULL DEFAULT NULL,
  `fecha_modificacion` timestamp NULL DEFAULT NULL,
  `usuario_modificacion` varchar(100) DEFAULT NULL,
  `usuario_creacion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla proyecto_SIASE.tokens_vigilante: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_SIASE.vigilante
CREATE TABLE IF NOT EXISTS `vigilante` (
  `id` int NOT NULL AUTO_INCREMENT,
  `guardia_id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `turno` varchar(50) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `usuario_creacion` varchar(100) DEFAULT NULL,
  `usuario_modificacion` varchar(100) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `contra` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla proyecto_SIASE.vigilante: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
