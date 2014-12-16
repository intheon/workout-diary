-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2014 at 12:15 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `athlete`
--

INSERT INTO `athlete` (`id`, `username`, `name`, `email`, `gender`, `age`, `activity`, `weight`, `height`, `calories`, `gym_visits_per_week`) VALUES
(20, 'Ashbury', 'Ben Smith', 'allobon@gmail.com', 'male', 24, 'light', 75, '171', 2133.0216, 4),
(21, 'intheon', 'Ben', 'allobon@gmail.com', 'male', 24, 'light', 74, '171', 2116.9452, 4);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `username`, `password`, `athlete_id`) VALUES
(22, 'Ashbury', '$2y$10$ihVc33fZdLzt8TxSh4exaO7KLIRdfGhBdo1YkPerXuF8RW.I7qv06', 20),
(23, 'intheon', '$2y$10$55V836ntg6KY.pOAXA4Gb.8IRc7WF1eLG14njkei7G7Cg1XRgRZ3i', 21);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=45 ;

--
-- Dumping data for table `cardio_complete`
--

INSERT INTO `cardio_complete` (`id`, `exercise_name`, `date_done`, `calories_total`, `minutes_quantity`) VALUES
(17, 'Walking', 'Tuesday the 11th of November', 476, '34'),
(18, 'Running', 'Tuesday the 11th of November', 1904, '34'),
(19, 'Walking', 'Tuesday the 11th of November', 476, '34'),
(20, 'Running', 'Tuesday the 11th of November', 168, '3'),
(21, 'Dancing', 'Tuesday the 11th of November', 782, '23'),
(22, 'Skateboarding', 'Tuesday the 11th of November', 0, '23'),
(23, 'Walking', 'Friday the 14th of November', 56, '4'),
(24, 'Skateboarding', 'Friday the 14th of November', 448, '32'),
(25, 'Running', 'Friday the 14th of November', 1904, '34'),
(26, 'Waterboarding', 'Thursday the 20th of November', 342, '234'),
(38, 'Skateboarding', 'Thursday the 20th of November', 240, '22'),
(39, 'Golfing', 'Thursday the 20th of November', 34, '1'),
(40, 'Climbing', 'Thursday the 20th of November', 400, '2'),
(41, 'Skateboarding', 'Friday the 21st of November', 18900, '45'),
(42, 'Waterboarding', 'Friday the 21st of November', 2829, '23'),
(43, 'Running', 'Thursday the 27th of November', 120, '10'),
(44, 'Walking', 'Friday the 5th of December 2014', 0, '3');

-- --------------------------------------------------------

--
-- Table structure for table `cardio_exercises`
--

CREATE TABLE IF NOT EXISTS `cardio_exercises` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `exercise_name` varchar(255) NOT NULL,
  `calorie_consumption_per_minute` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `cardio_exercises`
--

INSERT INTO `cardio_exercises` (`id`, `exercise_name`, `calorie_consumption_per_minute`) VALUES
(1, 'Running', '12'),
(2, 'Skateboarding', '15'),
(7, 'Rowing', '6'),
(8, 'PushUps', '2'),
(9, 'Crosstrainer', '10'),
(10, 'Walking', '4');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

--
-- Dumping data for table `diet`
--

INSERT INTO `diet` (`id`, `date_done`, `json`, `total_calories`, `owner`) VALUES
(1, 'Tuesday the 11th of November', '{"itemnumber1":{"huge burger":"800"},"itemnumber2":{"soup":"300"},"itemnumber3":{"chocolate":"179"}}', '1279', ''),
(2, 'Monday the 17th of November', '{"itemnumberNaN":{"Apple":"50"}}', '50', ''),
(6, 'Tuesday the 18th of November', '{"itemnumber1":{"Beef":"140"},"itemnumber2":{"Chicken":"200"}}', '340', ''),
(7, 'Tuesday the 18th of November', '{"itemnumber1":{"Coffee":"324"}}', '324', ''),
(8, 'Tuesday the 18th of November', '{"itemnumber1":{"Cheese":"783"}}', '783', ''),
(9, 'Tuesday the 18th of November', '{"itemnumber1":{"Beer":"234"}}', '234', ''),
(10, 'Tuesday the 18th of November', '{"itemnumber1":{"cheese":"687"},"itemnumber2":{"beef":"234"}}', '921', ''),
(11, 'Wednesday the 19th of November', '{"itemnumber1":{"Bru":"187"}}', '187', ''),
(12, 'Wednesday the 19th of November', '{"itemnumber1":{"Sand":"34"},"itemnumber2":{"Pigs":"674"}}', '708', ''),
(13, 'Wednesday the 19th of November', '{"itemnumber1":{"Milk":"321"}}', '321', ''),
(14, 'Thursday the 20th of November', '{"itemnumber1":{"Coffee":"234"}}', '234', ''),
(15, 'Thursday the 20th of November', '{"itemnumber1":{"2 Mexican Veg Burgers":"456"}}', '456', ''),
(16, 'Friday the 21st of November', '{"itemnumber1":{"food":"222"},"itemnumber2":{"cheese":"342"}}', '564', ''),
(17, 'Monday the 24th of November', '{"itemnumber2":{"cake":"231"}}', '231', ''),
(18, 'Thursday the 27th of November', '{"itemnumber1":{"big soup":"450"}}', '450', ''),
(19, 'Friday the 5th of December 2014', '{"itemnumber1":{"crumpets":"378"},"itemnumber2":{"coffee":"230"}}', '608', ''),
(20, 'Friday the 5th of December 2014', '{"itemnumber1":{"banana":"89"}}', '89', ''),
(21, 'Friday the 5th of December 2014', '{"itemnumber1":{"More Coffee":"200"}}', '200', ''),
(22, 'Friday the 5th of December 2014', '{"itemnumber1":{"Cheese Bread":"230"}}', '230', ''),
(23, 'Friday the 5th of December 2014', '{"itemnumber1":{"Big Soup":"200"}}', '200', ''),
(24, 'Friday the 5th of December 2014', '{"itemnumber1":{"2 Shortbread":"200"},"itemnumber2":{"Banana":"100"}}', '300', ''),
(25, 'Monday the 8th of December 2014', '{"itemnumber1":{"Coffee":"200"}}', '200', ''),
(26, 'Monday the 8th of December 2014', '{"itemnumber1":{"Feet":"89"}}', '89', 'Ashbury'),
(27, 'Monday the 8th of December 2014', '{"itemnumber1":{"Chicken Nugger":"346"},"itemnumber2":{"Soy Sauwes":"85"}}', '431', 'intheon');

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
-- Table structure for table `exercise_tracker`
--

CREATE TABLE IF NOT EXISTS `exercise_tracker` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `exercises_done` varchar(255) NOT NULL,
  `gym_visits_left` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `exercise_tracker`
--

INSERT INTO `exercise_tracker` (`id`, `user_id`, `date`, `exercises_done`, `gym_visits_left`) VALUES
(15, 'intheon', 'Sunday the 7th of December', '', 3),
(16, 'intheon', 'Friday the 5th of December 2014', '', 3),
(17, 'intheon', 'Monday the 8th of December 2014', '', 3);

-- --------------------------------------------------------

--
-- Table structure for table `picture`
--

CREATE TABLE IF NOT EXISTS `picture` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `week_number` varchar(255) NOT NULL,
  `picture_path` varchar(255) NOT NULL,
  `picture_taken` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `picture`
--

INSERT INTO `picture` (`id`, `week_number`, `picture_path`, `picture_taken`) VALUES
(5, '1', 'C:/wamp/www/workout-diary/img/uploads/img_avocado1.png', 1),
(6, '2', 'C:/wamp/www/workout-diary/img/uploads/img_artisanal2.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `testdata`
--

CREATE TABLE IF NOT EXISTS `testdata` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `usr` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `testdata`
--

INSERT INTO `testdata` (`id`, `usr`, `pwd`) VALUES
(1, 'bon', 'bon'),
(2, 'cheese', 'cheese');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `timings`
--

INSERT INTO `timings` (`id`, `week_number`, `date`, `days_in`, `user_name`) VALUES
(28, 1, 'Sunday the 23rd of November 2014', 327, 'intheon'),
(30, 1, 'Monday the 8th of December 2014', 342, 'Ashbury');

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
