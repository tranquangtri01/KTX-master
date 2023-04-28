-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 24, 2023 lúc 03:54 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ktx`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bill`
--

CREATE TABLE `bill` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `date` text NOT NULL,
  `managerID` int(11) NOT NULL,
  `roomID` int(11) NOT NULL,
  `waterPrice` int(11) NOT NULL,
  `waterNum` int(11) NOT NULL,
  `elecPrice` int(11) NOT NULL,
  `elecNum` int(11) NOT NULL,
  `roomPrice` int(11) NOT NULL,
  `checked` tinyint(1) NOT NULL,
  `studentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bill`
--

INSERT INTO `bill` (`id`, `name`, `date`, `managerID`, `roomID`, `waterPrice`, `waterNum`, `elecPrice`, `elecNum`, `roomPrice`, `checked`, `studentID`) VALUES
(1, 'Hóa đơn thanh toán Phòng A02 tháng 1', '1674978090', 1, 2, 12000, 0, 1500, 360, 600000, 1, 1),
(2, 'Hóa đơn thanh toán Phòng A103 tháng 4', '1681824680', 1, 4, 12000, 5, 1500, 5, 600000, 1, 3),
(3, 'Hóa đơn thanh toán Phòng A103 tháng 4', '1681824680', 1, 4, 12000, 5, 1500, 5, 600000, 1, 4),
(4, 'Hóa đơn thanh toán Phòng A103 tháng 4', '1681828192', 1, 4, 12000, 0, 1500, 3, 600000, 1, 3),
(5, 'Hóa đơn thanh toán Phòng A103 tháng 4', '1681828192', 1, 4, 12000, 0, 1500, 3, 600000, 1, 4),
(6, 'Hóa đơn thanh toán Phòng A103 tháng 4', '1681828192', 1, 4, 12000, 0, 1500, 3, 600000, 0, 5),
(7, 'Hóa đơn thanh toán Phòng A103 tháng 4', '1681828192', 1, 4, 12000, 0, 1500, 3, 600000, 0, 5),
(8, 'Hóa đơn thanh toán Phòng A01 tháng 4', '1682180375', 1, 1, 10000, 10, 1500, 10, 600000, 0, 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `campus`
--

CREATE TABLE `campus` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text DEFAULT NULL,
  `isChecked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `campus`
--

INSERT INTO `campus` (`id`, `name`, `description`, `isChecked`) VALUES
(1, 'Cơ sở 1', 'Có 80 phòng và có 350 sinh viên', 0),
(212222, 'Cơ sở 2', 'Có 12 phòng ', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `config`
--

CREATE TABLE `config` (
  `id` int(11) NOT NULL,
  `waterPrice` int(11) NOT NULL,
  `electricPrice` int(11) NOT NULL,
  `timeNotfication` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `config`
--

INSERT INTO `config` (`id`, `waterPrice`, `electricPrice`, `timeNotfication`) VALUES
(1, 12000, 1000, ''),
(2, 12000, 1500, '1674977630'),
(3, 12000, 1500, '1681790080'),
(4, 10000, 1500, '1682176486');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `manager`
--

CREATE TABLE `manager` (
  `id` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `dob` text DEFAULT NULL,
  `phone` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `campusID` int(11) NOT NULL,
  `sex` int(11) NOT NULL,
  `password` text NOT NULL,
  `managerID` text NOT NULL,
  `managerName` text NOT NULL,
  `img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `manager`
--

INSERT INTO `manager` (`id`, `role`, `dob`, `phone`, `email`, `campusID`, `sex`, `password`, `managerID`, `managerName`, `img`) VALUES
(1, 1, '980010000', '02292939333', 'admin1020@gmail.com', 1, 0, '123456', 'QL001', 'Trần Quang Trí', 'https://res.cloudinary.com/dk2hpdwsd/image/upload/v1671559289/mbvpwxxstyitiu6mkssz.png'),
(2, 1, '980010000', '0963687300', '1405190614@gmail.com', 1, 0, '123456', 'QL003', 'Tri Trần Quang', 'https://res.cloudinary.com/dk2hpdwsd/image/upload/v1681827797/wnzscu1autfl3otesugb.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `registerform`
--

CREATE TABLE `registerform` (
  `id` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `managerID` int(11) NOT NULL,
  `roomID` int(11) NOT NULL,
  `dateStart` text NOT NULL,
  `dateEnd` text NOT NULL,
  `dateRegister` text NOT NULL,
  `isAccepted` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `registerform`
--

INSERT INTO `registerform` (`id`, `studentID`, `managerID`, `roomID`, `dateStart`, `dateEnd`, `dateRegister`, `isAccepted`) VALUES
(1, 1, 1, 2, '1674977856', '1690616256', '1674977856', '1'),
(2, 3, 1, 4, '1681745326', '1697556526', '1681745326', '1'),
(3, 4, 1, 4, '1681824635', '1697635835', '1681824635', '1'),
(7, 5, 1, 4, '1681825581', '1697636781', '1681825581', '1'),
(8, 2, 1, 4, '1681825638', '1697636838', '1681825638', '1'),
(9, 6, 1, 1, '1682180367', '1697991567', '1682180367', '1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `campusID` int(11) NOT NULL,
  `roomTypeID` int(11) NOT NULL,
  `name` text NOT NULL,
  `currentNum` int(11) DEFAULT NULL,
  `studentList` text DEFAULT NULL,
  `electric` text NOT NULL,
  `water` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `room`
--

INSERT INTO `room` (`id`, `campusID`, `roomTypeID`, `name`, `currentNum`, `studentList`, `electric`, `water`) VALUES
(1, 1, 1, 'Phòng A01', 1, '6', '10', '10'),
(2, 1, 1, 'Phòng A02', 1, '1', '400', '50'),
(4, 1, 2, 'Phòng A103', 4, '3,4,5,5', '20', '10'),
(5, 1, 2, 'Phòng A104', 0, NULL, '0', '0'),
(6, 212222, 4, 'Phòng B101', 0, NULL, '0', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roomtype`
--

CREATE TABLE `roomtype` (
  `id` int(11) NOT NULL,
  `quality` int(11) NOT NULL,
  `name` text NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `roomtype`
--

INSERT INTO `roomtype` (`id`, `quality`, `name`, `price`) VALUES
(1, 4, 'Phòng 4 người', 600000),
(2, 6, 'Phòng 6 người', 600000),
(4, 1, 'Phòng 1 người', 600000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `studentID` text NOT NULL,
  `name` text NOT NULL,
  `sex` int(11) NOT NULL,
  `dob` text NOT NULL,
  `cccd` text NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL,
  `hometown` text NOT NULL,
  `img` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `password` text NOT NULL,
  `class` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `student`
--

INSERT INTO `student` (`id`, `studentID`, `name`, `sex`, `dob`, `cccd`, `email`, `phone`, `hometown`, `img`, `note`, `password`, `class`) VALUES
(1, 'SV123', 'Trần Quang Trí', 0, '980010000', '', 'abc@gmail.com', '029229393939', 'Huyện Lộc Hà, Hà Tĩnh', 'https://res.cloudinary.com/dk2hpdwsd/image/upload/v1681136423/lx66mf5oc8o9k1dol3ka.jpg', '', '123456', 'DHCTTCK14A1'),
(2, '14051904321', 'Trần Văn Nguyện', 0, '978800400', '1111111111111122', '1405190000@gmail.com', '0928282829', 'Thạch Hà, Hà Tĩnh', 'https://res.cloudinary.com/dk2hpdwsd/image/upload/v1674965307/hlfestpszsze7wi5zc6a.jpg', 'hhh', '123456', 'DHCTTCK14A1'),
(3, '1405190666', 'Nguyễn Văn Đức', 0, '987699600', '416548478', '1405190666@gmail.com', '016592636256', 'Hà Tĩnh', NULL, 'hihi', '123456', 'DHCTTCK14A1'),
(4, '14051906664', 'Nguyễn Văn Tuấn', 0, '994438800', '01656589', 'nguyentuan@gmail.com', '016589736', 'Hà Tĩnh', NULL, NULL, '123456', 'DHCTTCK14A1'),
(5, '1405190678', 'Bùi Văn Dương', 0, '988650000', '01656595', 'duong@gmail.com', '0659859646', 'Hà Tĩnh', NULL, NULL, '123456', 'DHCTTCK14A1'),
(6, '1405190149', 'Võ Hồng Sơn', 0, '985539600', '06559895263', 'son@gmail.com', '0659656246', 'Nghệ An', NULL, 'không có ghi chú', '123456', 'DHCTTCK14A1');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `id_2` (`id`),
  ADD KEY `managerID` (`managerID`),
  ADD KEY `roomID` (`roomID`),
  ADD KEY `studentID` (`studentID`);

--
-- Chỉ mục cho bảng `campus`
--
ALTER TABLE `campus`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campusID` (`campusID`);

--
-- Chỉ mục cho bảng `registerform`
--
ALTER TABLE `registerform`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `managerID` (`managerID`),
  ADD KEY `roomID` (`roomID`);

--
-- Chỉ mục cho bảng `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campusID` (`campusID`),
  ADD KEY `roomTypeID` (`roomTypeID`);

--
-- Chỉ mục cho bảng `roomtype`
--
ALTER TABLE `roomtype`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `config`
--
ALTER TABLE `config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `manager`
--
ALTER TABLE `manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `registerform`
--
ALTER TABLE `registerform`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `roomtype`
--
ALTER TABLE `roomtype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`managerID`) REFERENCES `manager` (`id`),
  ADD CONSTRAINT `bill_ibfk_2` FOREIGN KEY (`roomID`) REFERENCES `room` (`id`),
  ADD CONSTRAINT `bill_ibfk_3` FOREIGN KEY (`studentID`) REFERENCES `student` (`id`);

--
-- Các ràng buộc cho bảng `manager`
--
ALTER TABLE `manager`
  ADD CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`campusID`) REFERENCES `campus` (`id`);

--
-- Các ràng buộc cho bảng `registerform`
--
ALTER TABLE `registerform`
  ADD CONSTRAINT `registerForm_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `registerForm_ibfk_2` FOREIGN KEY (`managerID`) REFERENCES `manager` (`id`),
  ADD CONSTRAINT `registerForm_ibfk_3` FOREIGN KEY (`roomID`) REFERENCES `room` (`id`);

--
-- Các ràng buộc cho bảng `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`campusID`) REFERENCES `campus` (`id`),
  ADD CONSTRAINT `room_ibfk_2` FOREIGN KEY (`roomTypeID`) REFERENCES `roomtype` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
