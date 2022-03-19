DROP DATABASE IF EXISTS `fitness_db`;
CREATE DATABASE IF NOT EXISTS `fitness_db`;

USE `fitness_db`;

-- table for user account
CREATE TABLE user_account
(user_id VARCHAR(24) NOT NULL PRIMARY KEY,
email VARCHAR(64) NOT NULL,
password VARCHAR(64) NOT NULL);

-- table for acheievements and subclasses representing the types of achievements
CREATE TABLE achievements
(a_id INT NOT NULL PRIMARY KEY,
description VARCHAR(500) NOT NULL,
points INT NOT NULL,
user_id VARCHAR(24) NOT NULL,
FOREIGN KEY (user_id) REFERENCES user_account(user_id)
ON UPDATE CASCADE ON DELETE CASCADE);

-- achievement subclass table
CREATE TABLE login_streaks
(a_id INT NOT NULL PRIMARY KEY,
FOREIGN KEY (a_id) REFERENCES achievements(a_id)
ON UPDATE CASCADE ON DELETE CASCADE);

-- achievement subclass table
CREATE TABLE personal_record
(a_id INT NOT NULL PRIMARY KEY,
FOREIGN KEY (a_id) references achievements(a_id)
ON UPDATE CASCADE ON DELETE CASCADE);

-- achievement subclass table
CREATE TABLE workout_time
(a_id INT NOT NULL PRIMARY KEY,
FOREIGN KEY (a_id) references achievements(a_id)
ON UPDATE CASCADE ON DELETE CASCADE);

-- table for workout 
CREATE TABLE workout
(w_id INT NOT NULL PRIMARY KEY,
muscle_group VARCHAR(20) NOT NULL,
difficulty VARCHAR(20) NOT NULL,
exercise_type VARCHAR(20) NOT NULL,
user_id VARCHAR(24) NOT NULL,
FOREIGN KEY (user_id) REFERENCES user_account(user_id)
ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE equipment
(e_id INT NOT NULL PRIMARY KEY,
name VARCHAR(24) NOT NULL,
brand VARCHAR(24) NOT NULL,
cost FLOAT NOT NULL,
description VARCHAR(500) NOT NULL,
w_id INT NOT NULL,
FOREIGN KEY (w_id) REFERENCES workout(w_id)
ON UPDATE CASCADE ON DELETE CASCADE);

-- table for log
CREATE TABLE `log`
(log_id INT NOT NULL PRIMARY KEY,
datetime DATETIME NOT NULL,
description VARCHAR(500) NOT NULL,
user_id VARCHAR(24) NOT NULL,
FOREIGN KEY (user_id) REFERENCES user_account(user_id)
ON UPDATE CASCADE ON DELETE CASCADE);

-- subclass for log
CREATE TABLE workout_log
(log_id INT NOT NULL,
w_id INT NOT NULL,
workout_length INT NOT NULL,
FOREIGN KEY (log_id) REFERENCES `log`(log_id)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (w_id) REFERENCES workout(w_id)
ON UPDATE CASCADE ON DELETE CASCADE);

-- subclass for log
create table diet_log
(log_id INT NOT NULL,
FOREIGN KEY (log_id ) REFERENCES `log`(log_id)
ON UPDATE CASCADE ON DELETE CASCADE);

-- create table for meal
CREATE TABLE meal
(meal_id INT PRIMARY KEY,
description VARCHAR(500) NOT NULL,
total_calories INT NOT NULL,
log_id INT NOT NULL,
FOREIGN KEY (log_id) REFERENCES diet_log(log_id)
ON UPDATE CASCADE ON DELETE CASCADE); 


