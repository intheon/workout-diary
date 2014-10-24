-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2014 at 05:57 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `athlete`
--

INSERT INTO `athlete` (`id`, `name`, `sex`, `weight`, `height`, `bmr`, `acn`) VALUES
(1, 'test', 'test', 'test', 'test', 'test', 'test'),
(2, 'root', 'Female', '78', '172', '1873', '2204'),
(3, 'Ben', 'Male', '79', '172', '1800', '2222'),
(4, 'blah', 'Male', 'dwedewd', 'wedwed', 'wedwedwe', 'dwed'),
(5, 'Steve', 'Female', 'Man', 'Wow', 'Cheese', 'Hax');

-- --------------------------------------------------------

--
-- Table structure for table `cardio_complete`
--

CREATE TABLE IF NOT EXISTS `cardio_complete` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `session_id` int(10) NOT NULL,
  `e1` varchar(30) NOT NULL,
  `e2` varchar(30) NOT NULL,
  `e3` varchar(15) NOT NULL,
  `e4` varchar(15) NOT NULL,
  `e5` varchar(15) NOT NULL,
  `e6` varchar(15) NOT NULL,
  `e7` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
