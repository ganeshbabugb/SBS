-- Create the table for storing user registration data
CREATE TABLE register (
  id INT PRIMARY KEY AUTO_INCREMENT,
  register_id VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL UNIQUE,
  email_id VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the table for storing student details
CREATE TABLE student_details (
  id INT PRIMARY KEY AUTO_INCREMENT,
  register_id VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  email_id VARCHAR(50) NOT NULL,
  course VARCHAR(50) NOT NULL,
  course_selected VARCHAR(50) NOT NULL,
  department VARCHAR(50) NOT NULL,
  phone_no VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the table for storing available unaided courses 
CREATE TABLE unaided_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  register_count INT NOT NULL DEFAULT 0,
  available_seats INT NOT NULL DEFAULT 60
);

-- Create the table for storing available aided courses 
CREATE TABLE aided_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  register_count INT NOT NULL DEFAULT 0,
  available_seats INT NOT NULL DEFAULT 60
);

INSERT INTO aided_courses (label, value) VALUES
("English - English for Life Skills", "English"),
("History - Elements of Journalism", "History"),
("Mathematics - ICT Tools for Teaching and Learning", "Mathematics"),
("Physics - Energy Management", "Physics"),
("Chemistry - Chemistry of Milk and Milk Products", "Chemistry"),
("Botany - Herbs and Health Care", "Botany"),
("Zoology - Ornamental Fish Culture", "Zoology"),
("Nutrition And Dietetics - Food Chemistry", "Nutrition and Dietetics"),
("Computer Science - Data Analysis for Biological Applications Lab", "Computer Science"),
("Commerce - Women Entrepreneurship Development", "Commerce");

INSERT INTO unaided_courses (label, value)
VALUES
("Tamil - Thiraipadakalai", "Tamil"),
("English - English for Life Skills", "English"),
("Mathematics - ICT Tools for Teaching and Learning", "Mathematics"),
("Physics -  Energy Management", "Physics"),
("Computer Science - Data Analysis for Biological Applications Lab", "Computer Science"),
("Computer Applications - Data Analysis for Biological Applications Lab", "Computer Application"),
("Information Technology - Data Analysis for Biological Applications Lab", "Information Technology"),
("Computer Technology - Data Analysis for Biological Applications Lab", "Computere Technology"),
("Computer Science with Data Analytics - Data Analysis for Biological Applications Lab", "Computer Science with Data Analytics"),
("Commerce -  Women Entrepreneurship Development", "Commerece"),
("Commerce [CA] - Tax System in India", "Commerce [CA]"),
("Commerce [E-Commerce] - Information Technology", "Commerce [E-Commerce]"),
("Commerce [CS] - Financial Markets", "Commerce [CS]"),
("Commerce [PA] - Brand Management", "Commerce [PA]"),
("Commerce [A&F] - Management Information System", "Commerce [A&F]"),
("Commerce [B&I] - Financial Services", "Commerce [B&F]"),
("Commerce [Cooperation] - Women Entrepreneurship and Skill Development", "Commerce [Cooperation]"),
("Business Administration [CA] -  Executive Leadership", "Bussiness Administraction"),
("Biochemistry - Natural Remedies", "Biochemistry"),
("Costume Design & Fashion - Fashion Accessories ", "Costume Design & Fashion"),
("Geography - Basics of Remote Sensing", "Geography");