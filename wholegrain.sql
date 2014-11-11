-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2014 at 12:01 AM
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
  `name` varchar(30) NOT NULL,
  `sex` varchar(20) NOT NULL,
  `weight` varchar(30) NOT NULL,
  `height` varchar(30) NOT NULL,
  `bmr` varchar(30) NOT NULL,
  `acn` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `athlete`
--

INSERT INTO `athlete` (`id`, `name`, `sex`, `weight`, `height`, `bmr`, `acn`) VALUES
(3, 'Ben', 'Male', '79', '172', '1800', '2222');

-- --------------------------------------------------------

--
-- Table structure for table `cardio_complete`
--

CREATE TABLE IF NOT EXISTS `cardio_complete` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `exercise_name` varchar(255) NOT NULL,
  `date_done` varchar(255) NOT NULL,
  `calories_total` int(10) NOT NULL,
  `minutes_quantity` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `cardio_complete`
--

INSERT INTO `cardio_complete` (`id`, `exercise_name`, `date_done`, `calories_total`, `minutes_quantity`) VALUES
(17, 'Walking', 'Tuesday the 11th of November', 476, '34'),
(18, 'Running', 'Tuesday the 11th of November', 1904, '34'),
(19, 'Walking', 'Tuesday the 11th of November', 476, '34'),
(20, 'Running', 'Tuesday the 11th of November', 168, '3'),
(21, 'Dancing', 'Tuesday the 11th of November', 782, '23'),
(22, 'Skateboarding', 'Tuesday the 11th of November', 0, '23');

-- --------------------------------------------------------

--
-- Table structure for table `cardio_exercises`
--

CREATE TABLE IF NOT EXISTS `cardio_exercises` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `exercise_name` varchar(255) NOT NULL,
  `calorie_consumption_per_minute` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `cardio_exercises`
--

INSERT INTO `cardio_exercises` (`id`, `exercise_name`, `calorie_consumption_per_minute`) VALUES
(1, 'Walking', '14'),
(2, 'Running', '56'),
(7, 'Dancing', '23'),
(8, 'Skateboarding', '14'),
(9, 'Zombosis', '34');

-- --------------------------------------------------------

--
-- Table structure for table `diet`
--

CREATE TABLE IF NOT EXISTS `diet` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `date_done` varchar(255) NOT NULL,
  `json` varchar(255) NOT NULL,
  `total_calories` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `diet`
--

INSERT INTO `diet` (`id`, `date_done`, `json`, `total_calories`) VALUES
(1, 'Tuesday the 11th of November', '{"itemnumber1":{"huge burger":"800"},"itemnumber2":{"soup":"300"},"itemnumber3":{"chocolate":"179"}}', '1279');

-- --------------------------------------------------------

--
-- Table structure for table `exercise_calories`
--

CREATE TABLE IF NOT EXISTS `exercise_calories` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `exercise_name` varchar(16) NOT NULL,
  `calories` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `exercise_calories`
--

INSERT INTO `exercise_calories` (`id`, `exercise_name`, `calories`) VALUES
(1, 'running', '26'),
(2, 'cross trainer', '17'),
(3, 'rowing', '67'),
(4, 'stepper', '14'),
(5, 'push ups', '20'),
(6, 'skiing', '3');

-- --------------------------------------------------------

--
-- Table structure for table `workout-mit`
--

CREATE TABLE IF NOT EXISTS `workout-mit` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `week_number` int(8) NOT NULL,
  `day_of_week_number` int(8) NOT NULL,
  `exercise_completed` int(8) NOT NULL,
  `food_and_drink_consumed` int(8) NOT NULL,
  `current_weight` varchar(20) NOT NULL,
  `date` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
