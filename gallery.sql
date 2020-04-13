-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 28, 2018 at 12:38 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gallery`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_id` bigint(20) NOT NULL,
  `grapher_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `graphers`
--

CREATE TABLE `graphers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `graphers`
--

INSERT INTO `graphers` (`id`, `first_name`, `last_name`, `email`, `password`, `created_at`) VALUES
(1, 'elly', 'willz', 'werty@gmail.com', '12345678', '2018-10-27 00:00:00'),
(2, 'king', 'eli', 'me@gmail.com', '123456', '2018-10-27 00:00:00'),
(3, 'john', 'king', 'him@gmail.com', '123456', '2018-10-28 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint(20) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` bigint(20) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `grapher_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `name`, `description`, `size`, `width`, `height`, `grapher_id`, `created_at`) VALUES
(10, 'public/images/enstein.jpg', 'ok they say. Nyota njema uonekana asubuh, that is enstein over there.', 66273, 440, 720, 1, '2018-10-28 02:17:40'),
(11, 'public/images/enstein.jpg', 'ok they say. Nyota njema uonekana asubuh, that is enstein over there.', 66273, 440, 720, 1, '2018-10-28 02:39:28'),
(12, 'public/images/Do9bQDrVsAA7mz2.jpg', 'spaceX event when lauching falcon heavy', 43470, 1024, 683, 1, '2018-10-28 02:41:47'),
(13, 'public/images/DpT1_xhW0AAE7Iy.jpg', 'Just Mathematics for everyone', 28740, 1200, 675, 1, '2018-10-28 02:43:05'),
(14, 'public/images/eve_online_planet_space_spaceship_21867_1366x768.jpg', 'it all about interstellar', 316481, 1366, 768, 1, '2018-10-28 02:44:49'),
(15, 'public/images/eve_online_planet_space_spaceship_21867_1366x768.jpg', 'it all about interstellar', 316481, 1366, 768, 1, '2018-10-28 02:46:54'),
(16, 'public/images/eve_online_planet_space_spaceship_21867_1366x768.jpg', 'it all about interstellar', 316481, 1366, 768, 1, '2018-10-28 02:47:07'),
(17, 'public/images/eve_online_planet_space_spaceship_21867_1366x768.jpg', 'it all about interstellar', 316481, 1366, 768, 1, '2018-10-28 02:47:42'),
(18, 'public/images/eve_online_planet_space_spaceship_21867_1366x768.jpg', 'it all about interstellar', 316481, 1366, 768, 1, '2018-10-28 02:55:42'),
(19, 'public/images/eve_online_planet_space_spaceship_21867_1366x768.jpg', 'it all about interstellar', 316481, 1366, 768, 1, '2018-10-28 03:17:29'),
(20, 'public/images/eve_online_planet_space_spaceship_21867_1366x768.jpg', 'it all about interstellar', 316481, 1366, 768, 1, '2018-10-28 03:21:36'),
(21, 'public/images/eve_online_planet_space_spaceship_21867_1366x768.jpg', 'it all about interstellar', 316481, 1366, 768, 1, '2018-10-28 03:22:06'),
(22, 'public/images/eve_online_planet_space_spaceship_21867_1366x768.jpg', 'it all about interstellar', 316481, 1366, 768, 1, '2018-10-28 03:22:50'),
(23, 'public/images/eve_online_planet_space_spaceship_21867_1366x768.jpg', 'it all about interstellar', 316481, 1366, 768, 1, '2018-10-28 03:23:37'),
(24, 'public/images/eve_online_planet_space_spaceship_21867_1366x768.jpg', 'it all about interstellar', 316481, 1366, 768, 1, '2018-10-28 03:23:56'),
(25, 'public/images/eve_online_planet_space_spaceship_21867_1366x768.jpg', 'it all about interstellar', 316481, 1366, 768, 1, '2018-10-28 03:26:33'),
(26, 'public/images/eve_online_planet_space_spaceship_21867_1366x768.jpg', 'it all about interstellar', 316481, 1366, 768, 3, '2018-10-28 03:27:41');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` bigint(20) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `grapher_id` int(11) NOT NULL,
  `image_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `image_id` (`image_id`),
  ADD KEY `grapher_id` (`grapher_id`);

--
-- Indexes for table `graphers`
--
ALTER TABLE `graphers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grapher_id` (`grapher_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grapher_id` (`grapher_id`),
  ADD KEY `image_id` (`image_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `graphers`
--
ALTER TABLE `graphers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`grapher_id`) REFERENCES `graphers` (`id`);

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`grapher_id`) REFERENCES `graphers` (`id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`grapher_id`) REFERENCES `graphers` (`id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
