-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 06, 2024 at 10:36 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`email`, `password`) VALUES
('admin@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `appointment 1`
--

CREATE TABLE `appointment 1` (
  `doctor` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment 1`
--

INSERT INTO `appointment 1` (`doctor`, `department`) VALUES
('Dr.Mike', 'Physician'),
('Dr.Roy', 'Dermatologist'),
('Dr.Willams', 'Psyhologist'),
('Dr.Diya', 'Cosmotologist'),
('Dr.Jhonson', 'Pediatrician');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` bigint(20) NOT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `patient_id` bigint(20) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `doctor_id`, `patient_id`, `date`, `time`) VALUES
(1, 2, 3, '2024-10-20', '17:22:00');

-- --------------------------------------------------------

--
-- Table structure for table `doctoreg`
--

CREATE TABLE `doctoreg` (
  `id` int(2) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `Phone` int(12) NOT NULL,
  `Email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `Locality` varchar(50) NOT NULL,
  `Age` int(2) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Nationality` varchar(10) NOT NULL,
  `DOB` text NOT NULL,
  `EducationQualification` varchar(100) NOT NULL,
  `dept` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctoreg`
--

INSERT INTO `doctoreg` (`id`, `firstName`, `lastName`, `Phone`, `Email`, `password`, `Address`, `Locality`, `Age`, `Gender`, `Nationality`, `DOB`, `EducationQualification`, `dept`, `status`) VALUES
(1, 'Abhay ', 'S Babu', 2147483647, 'abhays.babu88@gmail.', 'asdf', 'Thirumala', 'abc', 20, 'Male', 'Indian', '2006-06-27', 'MBBS', 'MCA', 'rejected'),
(2, 'Vineeth', 'PP', 2147483647, 'vineeth@gmail.com', 'asdf', 'Vellayambalam', 'abc', 20, 'Male', 'Indian', '2024-08-22', 'MBBS', 'Ortho', 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` bigint(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `phone_no` int(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `address` varchar(100) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `password` varchar(30) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `name`, `phone_no`, `email`, `address`, `gender`, `password`, `status`) VALUES
(1, 'Parvathyyy', 790769444, 'parvathy@gmail.com', 'Kollamm', 'female', 'asdf', 'pending'),
(2, 'Fathima', 2147483647, 'fathima@gmail.com', 'Manacaud', 'female', 'asdf', 'pending'),
(3, 'test', 892173193, 'test@gmail.com', 'addre1', 'male', 'test123', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(12, 'abc', 'pass');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`);

--
-- Indexes for table `doctoreg`
--
ALTER TABLE `doctoreg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `doctoreg`
--
ALTER TABLE `doctoreg`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
