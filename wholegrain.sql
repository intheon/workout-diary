-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2015 at 06:00 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wholegrain`
--

-- --------------------------------------------------------

--
-- Table structure for table `athlete`
--

CREATE TABLE IF NOT EXISTS `athlete` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `age` int(10) NOT NULL,
  `activity` varchar(30) NOT NULL,
  `weight` int(10) NOT NULL,
  `height` varchar(40) NOT NULL,
  `calories` double NOT NULL,
  `gym_visits_per_week` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `athlete`
--

INSERT INTO `athlete` (`id`, `username`, `name`, `email`, `gender`, `age`, `activity`, `weight`, `height`, `calories`, `gym_visits_per_week`) VALUES
(26, 'intheon', 'Ben', 'allobon@gmail.com', 'male', 24, 'light', 78, '172', 2505.9485000000004, 4);

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE IF NOT EXISTS `auth` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `athlete_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=29 ;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `username`, `password`, `athlete_id`) VALUES
(28, 'intheon', '$2y$10$PAmuQhU4T4kEOk2bkd2P/.UOHZcWK1f.7t6Ejfsfeyr25RXgMRkqy', 26);

-- --------------------------------------------------------

--
-- Table structure for table `diet`
--

CREATE TABLE IF NOT EXISTS `diet` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `date_done` varchar(255) NOT NULL,
  `json` varchar(255) NOT NULL,
  `total_calories` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `diet`
--

INSERT INTO `diet` (`id`, `date_done`, `json`, `total_calories`, `owner`) VALUES
(1, 'Wednesday the 24th of December 2014', '{"itemnumber1":{"Chees":"234"},"itemnumber2":{"Chicken Wings":"234"}}', '468', 'intheon'),
(2, 'Monday the 5th of January 2015', '{"itemnumber1":{"Cheese and Onion Pasty":"500"}}', '500', 'intheon'),
(3, 'Monday the 5th of January 2015', '{"itemnumber1":{"Chicken":"234"},"itemnumber2":{"Ham Sandwiches":"342"}}', '576', 'intheon'),
(4, 'Monday the 5th of January 2015', '{"itemnumber1":{"Coffee":"243"},"itemnumber2":{"Snickers":"21"}}', '264', 'intheon'),
(5, 'Tuesday the 6th of January 2015', '{"itemnumber1":{"cunts":"231"},"itemnumber2":{"ham":"234"}}', '465', 'intheon'),
(6, 'Tuesday the 13th of January 2015', '{"itemnumber1":{"Coffee":"234"},"itemnumber2":{"More Coffee":"214"}}', '448', 'intheon');

-- --------------------------------------------------------

--
-- Table structure for table `exercises_log`
--

CREATE TABLE IF NOT EXISTS `exercises_log` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `exercise_name` varchar(255) NOT NULL,
  `date_done` varchar(255) NOT NULL,
  `calories_total` int(10) NOT NULL,
  `minutes_quantity` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `exercise_index`
--

CREATE TABLE IF NOT EXISTS `exercise_index` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `exercises_done` varchar(255) NOT NULL,
  `gym_visited` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `exercise_index`
--

INSERT INTO `exercise_index` (`id`, `user_id`, `date`, `exercises_done`, `gym_visited`) VALUES
(1, 'intheon', 'Wednesday the 24th of December 2014', '', 0),
(2, 'intheon', 'Monday the 5th of January 2015', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `picture`
--

CREATE TABLE IF NOT EXISTS `picture` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `week_number` varchar(255) NOT NULL,
  `picture_path` varchar(255) NOT NULL,
  `picture_taken` tinyint(1) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `picture`
--

INSERT INTO `picture` (`id`, `week_number`, `picture_path`, `picture_taken`, `user_id`) VALUES
(21, '2', '../img/uploads/img_email_iphone.png', 1, 'intheon');

-- --------------------------------------------------------

--
-- Table structure for table `timings`
--

CREATE TABLE IF NOT EXISTS `timings` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `week_number` int(10) NOT NULL,
  `date` varchar(255) NOT NULL,
  `days_in` int(10) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=37 ;

--
-- Dumping data for table `timings`
--

INSERT INTO `timings` (`id`, `week_number`, `date`, `days_in`, `user_name`) VALUES
(36, 1, 'Monday the 5th of January 2015', 5, 'intheon');

-- --------------------------------------------------------

--
-- Table structure for table `types_cardio`
--

CREATE TABLE IF NOT EXISTS `types_cardio` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `exercise_name` varchar(255) NOT NULL,
  `calorie_consumption_per_minute` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `types_cardio`
--

INSERT INTO `types_cardio` (`id`, `exercise_name`, `calorie_consumption_per_minute`) VALUES
(1, 'Crosstrainer', '16.6'),
(2, 'Skateboarding', '18'),
(3, 'Running', '10');

-- --------------------------------------------------------

--
-- Table structure for table `types_weights`
--

CREATE TABLE IF NOT EXISTS `types_weights` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `exercise_name` varchar(16) NOT NULL,
  `calorie_consumption_per_minute` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `types_weights`
--

INSERT INTO `types_weights` (`id`, `exercise_name`, `calorie_consumption_per_minute`) VALUES
(1, 'Barbell', '5'),
(2, 'Chestpress', '6');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
