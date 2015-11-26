-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 26 Novembre 2015 à 10:59
-- Version du serveur :  5.5.42
-- Version de PHP :  5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `Lifestyler`
--

-- --------------------------------------------------------

CREATE TABLE `User` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `login` text NOT NULL,
  `password` text NOT NULL,
  `score` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `Review` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fk_user` bigint(20) NOT NULL,
  `fk_area` bigint(20) NOT NULL,
  `rating` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `Area` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `short_description` varchar(255) NOT NULL,
  `long_description` text NOT NULL,
  `rating_cache` float(2,1) unsigned NOT NULL DEFAULT '3.0',
  `rating_count` int(11) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

ALTER TABLE `Review`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD CONSTRAINT fk_user_review
  FOREIGN KEY (fk_user) REFERENCES User (id),
  ADD CONSTRAINT fk_area_review
  FOREIGN KEY (fk_area) REFERENCES Area (id);

ALTER TABLE `Area`
  ADD UNIQUE KEY `id` (`id`),
  ADD PRIMARY KEY (`id`);

