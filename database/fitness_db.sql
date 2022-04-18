DROP DATABASE IF EXISTS `fitness_db`;
CREATE DATABASE IF NOT EXISTS `fitness_db`;

USE `fitness_db`;

-- table for user account
CREATE TABLE user_account
(user_id VARCHAR(64) NOT NULL PRIMARY KEY,
password VARCHAR(64) NOT NULL,
reg_date DATE NOT NULL,
login_streak INT NOT NULL);

-- table for acheievements and subclasses representing the types of achievements
CREATE TABLE achievements
(a_id INT NOT NULL PRIMARY KEY,
name VARCHAR(64) NOT NULL,
description VARCHAR(500) NOT NULL,
points INT NOT NULL);

-- achievement subclass table
CREATE TABLE login_streaks
(a_id INT NOT NULL PRIMARY KEY,
FOREIGN KEY (a_id) REFERENCES achievements(a_id)
ON UPDATE CASCADE ON DELETE CASCADE);

-- achievement subclass table
CREATE TABLE workout_time
(a_id INT NOT NULL PRIMARY KEY,
FOREIGN KEY (a_id) references achievements(a_id)
ON UPDATE CASCADE ON DELETE CASCADE);

-- table for achievements unlocked by users

CREATE TABLE user_achievements
(achievement_unlock_id VARCHAR(24) NOT NULL PRIMARY KEY,
user_id VARCHAR(24) NOT NULL,
a_id INT NOT NULL,
time_unlock DATETIME NOT NULL,
FOREIGN KEY (a_id) REFERENCES achievements(a_id)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (user_id) REFERENCES user_account(user_id)
ON UPDATE CASCADE ON DELETE CASCADE);

-- table for workout 
CREATE TABLE workout
(w_id INT NOT NULL PRIMARY KEY,
name VARCHAR(20) NOT NULL,
description VARCHAR(999) NOT NULL,
equipment VARCHAR(999) NOT NULL,
muscle_group VARCHAR(20) NOT NULL,
difficulty VARCHAR(20) NOT NULL,
exercise_type VARCHAR(20) NOT NULL);

/*
CREATE TABLE equipment
(e_id INT NOT NULL PRIMARY KEY,
name VARCHAR(24) NOT NULL,
brand VARCHAR(24) NOT NULL,
cost FLOAT NOT NULL,
description VARCHAR(500) NOT NULL,
w_id INT NOT NULL,
FOREIGN KEY (w_id) REFERENCES workout(w_id)
ON UPDATE CASCADE ON DELETE CASCADE);
*/

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

-- create table for meal
CREATE TABLE meal
(meal_id INT PRIMARY KEY,
description VARCHAR(500) NOT NULL,
total_calories INT NOT NULL,
carbs_g INT NOT NULL,
protein_g INT NOT NULL,
fat_g INT NOT NULL); 

-- subclass for log
create table diet_log
(log_id INT NOT NULL,
meal_id INT NOT NULL,
FOREIGN KEY (log_id) REFERENCES `log`(log_id)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (meal_id) REFERENCES meal(meal_id)
ON UPDATE CASCADE ON DELETE CASCADE);



