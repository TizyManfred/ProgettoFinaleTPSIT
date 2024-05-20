-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 20, 2024 alle 15:21
-- Versione del server: 10.4.27-MariaDB
-- Versione PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestorepokemon`
--
CREATE DATABASE IF NOT EXISTS `gestorepokemon` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gestorepokemon`;

-- --------------------------------------------------------

--
-- Struttura della tabella `pokemon`
--

CREATE TABLE `pokemon` (
  `Id` int(50) NOT NULL,
  `Livello` int(50) NOT NULL,
  `Shiny` tinyint(1) NOT NULL,
  `Mossa1` varchar(50) NOT NULL,
  `Mossa2` varchar(50) NOT NULL,
  `Mossa3` varchar(50) NOT NULL,
  `Mossa4` varchar(50) NOT NULL,
  `Username_Utente` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `pokemon`
--

INSERT INTO `pokemon` (`Id`, `Livello`, `Shiny`, `Mossa1`, `Mossa2`, `Mossa3`, `Mossa4`, `Username_Utente`) VALUES
(1, 3, 0, 'hidden-power', 'natural-gift', 'take-down', 'charm', 'gabriele.chini'),
(4, 1, 0, 'scratch', 'substitute', 'counter', 'headbutt', 'gabriele.chini'),
(4, 35, 1, 'fire-spin', 'beat-up', 'crunch', 'swords-dance', 'utente1'),
(7, 2, 1, 'curse', 'return', 'bite', 'iron-tail', 'gabriele.chini'),
(7, 35, 1, 'weather-ball', 'skull-bash', 'rage', 'rock-tomb', 'utente1'),
(21, 1, 1, 'detect', 'whirlwind', 'tri-attack', 'curse', 'utente1'),
(37, 22, 1, 'body-slam', 'reflect', 'hidden-power', 'encore', 'utente1'),
(41, 25, 1, 'twister', 'double-edge', 'snore', 'razor-wind', 'utente1'),
(72, 1, 1, 'bide', 'frustration', 'double-edge', 'aurora-beam', 'utente1'),
(74, 15, 0, 'sleep-talk', 'bulldoze', 'ancient-power', 'dynamic-punch', 'gabriele.chini'),
(74, 2, 1, 'magnitude', 'captivate', 'bulldoze', 'tera-blast', 'utente1'),
(172, 3, 1, 'thunder-punch', 'bestow', 'rollout', 'flail', 'utente1');

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `Username` varchar(50) NOT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`Username`, `Email`, `Password`) VALUES
('gabriele.chini', 'gabriele.chini@gmail.com', '$2b$10$wzlz36wlFCkHAQWZbr.g5.JVlbrEFTXaXK/SSHGRo1mYWEpdP8TRK'),
('utente1', 'utente1@gmail.com', '$2b$10$uPGyaU1B3kQtAZaq1CKV6eS0FdNSQ0jLfu6x3ZbGA6Yy3zvK6gAQi');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `pokemon`
--
ALTER TABLE `pokemon`
  ADD PRIMARY KEY (`Id`,`Username_Utente`),
  ADD KEY `maurizio` (`Username_Utente`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`Username`);

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `pokemon`
--
ALTER TABLE `pokemon`
  ADD CONSTRAINT `maurizio` FOREIGN KEY (`Username_Utente`) REFERENCES `utente` (`Username`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
