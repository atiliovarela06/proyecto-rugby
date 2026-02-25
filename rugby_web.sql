-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-02-2026 a las 17:15:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rugby_web`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_jugadores`
--

CREATE TABLE `categorias_jugadores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias_jugadores`
--

INSERT INTO `categorias_jugadores` (`id`, `nombre`) VALUES
(1, 'Infantiles'),
(2, 'Juveniles'),
(3, 'Plantel Superior');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clubes`
--

CREATE TABLE `clubes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `contacto` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clubes`
--

INSERT INTO `clubes` (`id`, `nombre`, `ciudad`, `contacto`, `activo`) VALUES
(1, 'Club Argentino de Rugby', NULL, NULL, 1),
(2, 'Lanus rugby ', NULL, NULL, 1),
(3, 'CUQ', NULL, NULL, 1),
(4, 'Don Bosco', NULL, NULL, 1),
(5, 'San Patricio', NULL, NULL, 1),
(6, 'Liceo Militar', NULL, NULL, 1),
(7, 'Mariano Moreno', NULL, NULL, 1),
(8, 'Banco Nacion', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `divisiones`
--

CREATE TABLE `divisiones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `divisiones`
--

INSERT INTO `divisiones` (`id`, `nombre`) VALUES
(1, 'Top 12'),
(2, 'Primera A'),
(3, 'Primera B'),
(4, 'Primera C');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id` int(11) NOT NULL,
  `club_id` int(11) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `division_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id`, `club_id`, `categoria`, `division_id`) VALUES
(1, 1, 'm19', 3),
(2, 2, 'm19', 3),
(3, 3, 'm19', 3),
(4, 4, 'm19', 3),
(5, 5, 'm19', 3),
(6, 6, 'm19', 3),
(7, 7, 'm19', 3),
(8, 8, 'm19', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `id` int(11) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `posicion` varchar(50) DEFAULT NULL,
  `categoria_id` int(11) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `club_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`id`, `dni`, `nombre`, `apellido`, `fecha_nacimiento`, `posicion`, `categoria_id`, `activo`, `club_id`) VALUES
(3, '34672974', 'pedro', 'sanchezz', '2004-12-12', 'full back', 3, 1, 3),
(4, '34567890', 'juan', 'lopezz', '2010-03-23', 'wing', 2, 1, 3),
(5, '47569680', 'Atilio', 'varela', '2006-11-23', 'centro', 3, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugador_historial`
--

CREATE TABLE `jugador_historial` (
  `id` int(11) NOT NULL,
  `jugador_id` int(11) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidos`
--

CREATE TABLE `partidos` (
  `id` int(11) NOT NULL,
  `torneo_id` int(11) NOT NULL,
  `equipo_local_id` int(11) NOT NULL,
  `equipo_visitante_id` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `cancha` varchar(100) DEFAULT NULL,
  `round` varchar(50) DEFAULT NULL,
  `estado` enum('pendiente','programado','jugado','suspendido') DEFAULT 'pendiente',
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `numero_fecha` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `partidos`
--

INSERT INTO `partidos` (`id`, `torneo_id`, `equipo_local_id`, `equipo_visitante_id`, `fecha`, `cancha`, `round`, `estado`, `fecha_creacion`, `numero_fecha`) VALUES
(85, 1, 1, 8, '2026-02-17 19:05:35', NULL, 'Fecha 1', 'jugado', '2026-02-17 19:05:35', 1),
(86, 1, 2, 7, '2026-02-17 19:05:35', NULL, 'Fecha 1', 'jugado', '2026-02-17 19:05:35', 1),
(87, 1, 3, 6, '2026-02-17 19:05:35', NULL, 'Fecha 1', 'jugado', '2026-02-17 19:05:35', 1),
(88, 1, 4, 5, '2026-02-17 19:05:35', NULL, 'Fecha 1', 'jugado', '2026-02-17 19:05:35', 1),
(89, 1, 7, 1, '2026-02-17 19:05:35', NULL, 'Fecha 2', 'jugado', '2026-02-17 19:05:35', 2),
(90, 1, 6, 8, '2026-02-17 19:05:35', NULL, 'Fecha 2', 'jugado', '2026-02-17 19:05:35', 2),
(91, 1, 5, 2, '2026-02-17 19:05:35', NULL, 'Fecha 2', 'jugado', '2026-02-17 19:05:35', 2),
(92, 1, 4, 3, '2026-02-17 19:05:35', NULL, 'Fecha 2', 'jugado', '2026-02-17 19:05:35', 2),
(93, 1, 1, 6, '2026-02-17 19:05:35', NULL, 'Fecha 3', 'pendiente', '2026-02-17 19:05:35', 3),
(94, 1, 7, 5, '2026-02-17 19:05:35', NULL, 'Fecha 3', 'pendiente', '2026-02-17 19:05:35', 3),
(95, 1, 8, 4, '2026-02-17 19:05:35', NULL, 'Fecha 3', 'pendiente', '2026-02-17 19:05:35', 3),
(96, 1, 2, 3, '2026-02-17 19:05:35', NULL, 'Fecha 3', 'pendiente', '2026-02-17 19:05:35', 3),
(97, 1, 5, 1, '2026-02-17 19:05:35', NULL, 'Fecha 4', 'pendiente', '2026-02-17 19:05:35', 4),
(98, 1, 4, 6, '2026-02-17 19:05:35', NULL, 'Fecha 4', 'pendiente', '2026-02-17 19:05:35', 4),
(99, 1, 3, 7, '2026-02-17 19:05:35', NULL, 'Fecha 4', 'pendiente', '2026-02-17 19:05:35', 4),
(100, 1, 2, 8, '2026-02-17 19:05:35', NULL, 'Fecha 4', 'pendiente', '2026-02-17 19:05:35', 4),
(101, 1, 1, 4, '2026-02-17 19:05:35', NULL, 'Fecha 5', 'pendiente', '2026-02-17 19:05:35', 5),
(102, 1, 5, 3, '2026-02-17 19:05:35', NULL, 'Fecha 5', 'pendiente', '2026-02-17 19:05:35', 5),
(103, 1, 6, 2, '2026-02-17 19:05:35', NULL, 'Fecha 5', 'pendiente', '2026-02-17 19:05:35', 5),
(104, 1, 7, 8, '2026-02-17 19:05:35', NULL, 'Fecha 5', 'pendiente', '2026-02-17 19:05:35', 5),
(105, 1, 3, 1, '2026-02-17 19:05:35', NULL, 'Fecha 6', 'pendiente', '2026-02-17 19:05:35', 6),
(106, 1, 2, 4, '2026-02-17 19:05:35', NULL, 'Fecha 6', 'pendiente', '2026-02-17 19:05:35', 6),
(107, 1, 8, 5, '2026-02-17 19:05:35', NULL, 'Fecha 6', 'pendiente', '2026-02-17 19:05:35', 6),
(108, 1, 7, 6, '2026-02-17 19:05:35', NULL, 'Fecha 6', 'pendiente', '2026-02-17 19:05:35', 6),
(109, 1, 1, 2, '2026-02-17 19:05:35', NULL, 'Fecha 7', 'pendiente', '2026-02-17 19:05:35', 7),
(110, 1, 3, 8, '2026-02-17 19:05:35', NULL, 'Fecha 7', 'pendiente', '2026-02-17 19:05:35', 7),
(111, 1, 4, 7, '2026-02-17 19:05:35', NULL, 'Fecha 7', 'pendiente', '2026-02-17 19:05:35', 7),
(112, 1, 5, 6, '2026-02-17 19:05:35', NULL, 'Fecha 7', 'pendiente', '2026-02-17 19:05:35', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE `resultados` (
  `partido_id` int(11) NOT NULL,
  `puntos_local` int(11) NOT NULL,
  `puntos_visitante` int(11) NOT NULL,
  `bonus_local` int(11) DEFAULT 0,
  `bonus_visitante` int(11) DEFAULT 0,
  `cargado_por` int(11) DEFAULT NULL,
  `fecha_carga` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultados`
--

INSERT INTO `resultados` (`partido_id`, `puntos_local`, `puntos_visitante`, `bonus_local`, `bonus_visitante`, `cargado_por`, `fecha_carga`) VALUES
(85, 28, 26, 0, 0, NULL, '2026-02-17 19:40:29'),
(86, 28, 42, 0, 0, NULL, '2026-02-17 19:35:32'),
(87, 14, 7, 0, 0, NULL, '2026-02-17 20:12:01'),
(88, 21, 42, 0, 0, NULL, '2026-02-19 11:56:08'),
(89, 7, 56, 0, 0, NULL, '2026-02-19 12:14:05'),
(90, 12, 21, 0, 0, NULL, '2026-02-19 12:15:08'),
(91, 14, 5, 0, 0, NULL, '2026-02-19 12:14:26'),
(92, 21, 28, 0, 0, NULL, '2026-02-19 12:14:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(2, 'admin_club'),
(1, 'admin_sistema'),
(3, 'viewer');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tabla_posiciones`
--

CREATE TABLE `tabla_posiciones` (
  `torneo_id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL,
  `pj` int(11) DEFAULT 0,
  `pg` int(11) DEFAULT 0,
  `pe` int(11) DEFAULT 0,
  `pp` int(11) DEFAULT 0,
  `pf` int(11) DEFAULT 0,
  `pc` int(11) DEFAULT 0,
  `dif` int(11) DEFAULT 0,
  `pts` int(11) DEFAULT 0,
  `orden` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tabla_posiciones`
--

INSERT INTO `tabla_posiciones` (`torneo_id`, `equipo_id`, `pj`, `pg`, `pe`, `pp`, `pf`, `pc`, `dif`, `pts`, `orden`) VALUES
(1, 1, 2, 2, 0, 0, 84, 33, 51, 8, NULL),
(1, 2, 2, 0, 0, 2, 33, 56, -23, 0, NULL),
(1, 3, 2, 2, 0, 0, 42, 28, 14, 8, NULL),
(1, 4, 2, 0, 0, 2, 42, 70, -28, 0, NULL),
(1, 5, 2, 2, 0, 0, 56, 26, 30, 8, NULL),
(1, 6, 2, 0, 0, 2, 19, 35, -16, 0, NULL),
(1, 7, 2, 1, 0, 1, 49, 84, -35, 4, NULL),
(1, 8, 2, 1, 0, 1, 47, 40, 7, 4, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneos`
--

CREATE TABLE `torneos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `formato` varchar(50) NOT NULL,
  `temporada` varchar(20) NOT NULL,
  `estado` enum('borrador','activo','finalizado') DEFAULT 'borrador',
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `fixture_generado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `torneos`
--

INSERT INTO `torneos` (`id`, `nombre`, `formato`, `temporada`, `estado`, `fecha_inicio`, `fecha_fin`, `fixture_generado`) VALUES
(1, 'torneo m19', 'copa', '2026', 'borrador', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneo_equipos`
--

CREATE TABLE `torneo_equipos` (
  `torneo_id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `torneo_equipos`
--

INSERT INTO `torneo_equipos` (`torneo_id`, `equipo_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `club_id` int(11) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password_hash`, `rol_id`, `club_id`, `activo`, `created_at`) VALUES
(1, 'Atilio Admin', 'atiliovarela06@gmail.com', '$2b$10$HPmJPnPrj9nxNjpyR.cAD.uVLrH6BVDpHXPanyEjAJevD5T4.uBuC', 1, NULL, 1, '2026-01-28 19:38:49'),
(2, 'Admin Club Cuq', 'clubcuq@gmail.com', '$2b$10$nl4vJvoTZlxvyVUeLZrcxej9U.vrPVd/CQRMTDzX69cfSnxCXmfnC', 2, 3, 1, '2026-02-04 20:19:17'),
(5, 'fabio', 'fabiovarela@gmail.com', '$2b$10$FR1U33eL69DfO2WQlEnfdufNciMNTvwnZVd9AX/6hsbSxZfokQdZm', 2, 1, 1, '2026-02-10 14:57:52'),
(6, 'joaquin', 'joaquinaquino@gmail.com', '$2b$10$tLe/CGD5jvGDbDUhEOF5s.P33/g0bsa4BTkukuzf807YvGGROt1wO', 3, NULL, 1, '2026-02-10 18:26:57'),
(7, 'ramiro', 'ramiro@gmail.com', '$2b$10$50EjHz.Bt9xA9P.NTu2MVOtATl/TlgiRRD9aABEmnAn61Vk3DEnTi', 3, NULL, 1, '2026-02-23 15:14:45');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias_jugadores`
--
ALTER TABLE `categorias_jugadores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clubes`
--
ALTER TABLE `clubes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `divisiones`
--
ALTER TABLE `divisiones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_equipo` (`club_id`,`categoria`),
  ADD KEY `fk_division` (`division_id`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `jugadores_ibfk_categoria` (`categoria_id`);

--
-- Indices de la tabla `jugador_historial`
--
ALTER TABLE `jugador_historial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jugador_id` (`jugador_id`);

--
-- Indices de la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `torneo_id` (`torneo_id`,`equipo_local_id`,`equipo_visitante_id`,`round`),
  ADD KEY `equipo_local_id` (`equipo_local_id`),
  ADD KEY `equipo_visitante_id` (`equipo_visitante_id`);

--
-- Indices de la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD PRIMARY KEY (`partido_id`),
  ADD KEY `fk_resultado_usuario` (`cargado_por`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `tabla_posiciones`
--
ALTER TABLE `tabla_posiciones`
  ADD PRIMARY KEY (`torneo_id`,`equipo_id`),
  ADD KEY `idx_tabla_posiciones` (`torneo_id`,`pts`,`dif`),
  ADD KEY `fk_tabla_equipo` (`equipo_id`);

--
-- Indices de la tabla `torneos`
--
ALTER TABLE `torneos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `torneo_equipos`
--
ALTER TABLE `torneo_equipos`
  ADD PRIMARY KEY (`torneo_id`,`equipo_id`),
  ADD KEY `equipo_id` (`equipo_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias_jugadores`
--
ALTER TABLE `categorias_jugadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `clubes`
--
ALTER TABLE `clubes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `divisiones`
--
ALTER TABLE `divisiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `jugador_historial`
--
ALTER TABLE `jugador_historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `partidos`
--
ALTER TABLE `partidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `torneos`
--
ALTER TABLE `torneos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `clubes` (`id`),
  ADD CONSTRAINT `fk_division` FOREIGN KEY (`division_id`) REFERENCES `divisiones` (`id`);

--
-- Filtros para la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD CONSTRAINT `jugadores_ibfk_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_jugadores` (`id`);

--
-- Filtros para la tabla `jugador_historial`
--
ALTER TABLE `jugador_historial`
  ADD CONSTRAINT `jugador_historial_ibfk_1` FOREIGN KEY (`jugador_id`) REFERENCES `jugadores` (`id`);

--
-- Filtros para la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD CONSTRAINT `partidos_ibfk_1` FOREIGN KEY (`torneo_id`) REFERENCES `torneos` (`id`),
  ADD CONSTRAINT `partidos_ibfk_2` FOREIGN KEY (`equipo_local_id`) REFERENCES `equipos` (`id`),
  ADD CONSTRAINT `partidos_ibfk_3` FOREIGN KEY (`equipo_visitante_id`) REFERENCES `equipos` (`id`);

--
-- Filtros para la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD CONSTRAINT `fk_resultado_usuario` FOREIGN KEY (`cargado_por`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `resultados_ibfk_1` FOREIGN KEY (`partido_id`) REFERENCES `partidos` (`id`),
  ADD CONSTRAINT `resultados_ibfk_2` FOREIGN KEY (`cargado_por`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `tabla_posiciones`
--
ALTER TABLE `tabla_posiciones`
  ADD CONSTRAINT `fk_tabla_equipo` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tabla_posiciones_ibfk_1` FOREIGN KEY (`torneo_id`) REFERENCES `torneos` (`id`);

--
-- Filtros para la tabla `torneo_equipos`
--
ALTER TABLE `torneo_equipos`
  ADD CONSTRAINT `torneo_equipos_ibfk_1` FOREIGN KEY (`torneo_id`) REFERENCES `torneos` (`id`),
  ADD CONSTRAINT `torneo_equipos_ibfk_2` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
