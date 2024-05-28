-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 28, 2024 alle 21:52
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
(1, 1, 0, 'razor-wind', 'grassy-glide', 'flash', 'headbutt', 'max.fedrizzi'),
(4, 2, 0, 'defense-curl', 'metal-claw', 'body-slam', 'mega-kick', 'gabriele.chini'),
(7, 1, 0, 'rollout', 'aqua-ring', 'foresight', 'withdraw', 'gabriele.chini'),
(37, 1, 0, 'tail-whip', 'curse', 'endure', 'frustration', 'sami.facchinelli'),
(50, 1, 0, 'rock-blast', 'confide', 'ancient-power', 'fissure', 'sami.facchinelli'),
(56, 1, 0, 'metronome', 'rock-smash', 'bide', 'covet', 'sami.facchinelli'),
(172, 1, 0, 'defense-curl', 'round', 'reflect', 'flail', 'max.fedrizzi'),
(287, 3, 0, 'x-scissor', 'chilling-water', 'slack-off', 'after-you', 'gabriele.chini'),
(357, 1, 0, 'earthquake', 'trailblaze', 'bulldoze', 'silver-wind', 'tiziano.manfredi'),
(501, 33, 0, 'sleep-talk', 'confide', 'return', 'tackle', 'gabriele.chini'),
(647, 1, 0, 'giga-impact', 'megahorn', 'swift', 'sunny-day', 'tiziano.manfredi'),
(650, 1, 0, 'rock-smash', 'thunder-punch', 'toxic', 'wood-hammer', 'tiziano.manfredi'),
(659, 1, 0, 'iron-head', 'hidden-power', 'return', 'work-up', 'tiziano.manfredi'),
(906, 1, 0, 'facade', 'bite', 'play-rough', 'tail-whip', 'tiziano.manfredi'),
(960, 1, 0, 'water-gun', 'substitute', 'take-down', 'muddy-water', 'tiziano.manfredi'),
(1007, 1, 0, 'endure', 'u-turn', 'ancient-power', 'agility', 'sami.facchinelli');

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
('max.fedrizzi', 'max.fedrizzi@gmail.com', '$2b$10$Bjjwq8HhdrI.AARci40b3uo2BuqxEFZTx3oWb7N0X5hDnkQKN/eBy'),
('sami.facchinelli', 'sami.facchinelli@gmail.com', '$2b$10$QsxihGmmdt0aPf67ujLtt.SRWzYdUomU2qTHepEbXwsRYFsHN7dHS'),
('tiziano.manfredi', 'tiziano.manfredi@gmail.com', '$2b$10$AOrQFzILqR3o.HU3c6tEA.uH3vTIPwXzqbAnoPsk2RnIivhQa4cqG'),
('user', 'user@gmail.com', '$2b$10$xGIO0a6wvlLij9ACCDxmK.DOzgzMA1K9nkaf9pTRiaC/DNeZlrj2i');

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
