-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 12, 2024 alle 15:24
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
(1, 18, 1, 'grass-whistle', 'return', 'energy-ball', 'worry-seed', '1'),
(10, 32, 1, 'tackle', 'electroweb', 'snore', 'bug-bite', '1'),
(37, 1, 1, 'body-slam', 'reflect', 'spite', 'frustration', '1'),
(133, 16, 0, 'stored-power', 'sunny-day', 'iron-tail', 'hidden-power', '1'),
(145, 1, 0, 'light-screen', 'discharge', 'double-team', 'hidden-power', '1');

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `Username` varchar(50) NOT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Nome` varchar(50) DEFAULT NULL,
  `Cognome` varchar(50) DEFAULT NULL,
  `DataDiNascita` date DEFAULT NULL,
  `Telefono` varchar(50) DEFAULT NULL,
  `Residenza` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`Username`, `Email`, `Nome`, `Cognome`, `DataDiNascita`, `Telefono`, `Residenza`, `Password`) VALUES
('1', 'prova@gmail.com', 'Prova', 'Prova', '2024-05-09', '1234567890', 'Prova', 'Prova');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `pokemon`
--
ALTER TABLE `pokemon`
  ADD PRIMARY KEY (`Id`),
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
