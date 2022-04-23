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
INSERT INTO achievements VALUES 
(0, "Fresh Start", "Login once (automatically unlocked upon registration)", 100) ,
(1, "A Dedicated Week", "Login 7 days consecutively", 100),
(2, "A Month of Hard Work", "Login 30 days consecutively", 500),
(3, "Happy Fitness Anniversary", "Login 365 days consecutively", 1000),
(4, "Fitness Guru", "Login for 1000 days consecutively", 2500),
(5, "Baby Steps", "Have a Workout Log that details a workout of at least 10 minutes", 100),
(6, "Breaking a Sweat", "Have a Workout Log that details a workout of at least 30 minutes", 300),
(7, "Getting With the Program", "Have a Workout Log that details a workout of at least an hour", 500),
(8, "Getting Serious", "Have a Workout Log that details a workout of at least 2 hours", 1000);
 

-- achievement subclass table
CREATE TABLE login_streaks
(a_id INT NOT NULL PRIMARY KEY,
FOREIGN KEY (a_id) REFERENCES achievements(a_id)
ON UPDATE CASCADE ON DELETE CASCADE);
INSERT INTO login_streaks VALUES (0), (1), (2), (3), (4);

-- achievement subclass table
CREATE TABLE workout_time
(a_id INT NOT NULL PRIMARY KEY,
FOREIGN KEY (a_id) references achievements(a_id)
ON UPDATE CASCADE ON DELETE CASCADE);
INSERT INTO workout_time VALUES (5),(6),(7),(8);

-- table for achievements unlocked by users

CREATE TABLE user_achievements
(achievement_unlock_id VARCHAR(24) NOT NULL PRIMARY KEY,
user_id VARCHAR(64) NOT NULL,
a_id INT NOT NULL,
time_unlock DATETIME NOT NULL,
FOREIGN KEY (a_id) REFERENCES achievements(a_id)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (user_id) REFERENCES user_account(user_id)
ON UPDATE CASCADE ON DELETE CASCADE);

-- table for workout 
CREATE TABLE workout
(w_id INT NOT NULL PRIMARY KEY,
name VARCHAR(64) NOT NULL,
description VARCHAR(999) NOT NULL,
equipment VARCHAR(999) NOT NULL,
muscle_group VARCHAR(100) NOT NULL,
difficulty VARCHAR(20) NOT NULL,
exercise_type VARCHAR(20) NOT NULL);


-- examples of tuples for workout, the user will only be able to view workouts
INSERT INTO workout VALUES 
(2, "Squat", "Calisthenics exercise that starts from a standing position and is done by lowering the hip", "none", "glutes, hamstrings, quads", "low", "calisthenics"),
(1, "Pull-up", "Calisthenics exercise that starts with the body suspended by holding onto a horizontal bar with the hands and done by pulling the body up so the chin is parallel with the bar", "pull-up bar", "abdominals. back, biceps, forearms, shoulders", "moderate-high", "calisthenics"),
(0, "Pushup", "Calisthenics exercise starting from the prone position and done by raising and lowering the body using the arms", "none", "abdominals, deltoids, pectoral, triceps", "moderate", "calisthenics"),
(3, "Plank", "Isometric exercise that starts at the prone position and is done by maintaining said position for a duration of time", "none", "abdominals, glutes, obliques", "low", "isometric"),
(4, "One-arm concentration curl", "Isolated bicep curl that uses a dumbbell and is done while sitting", "dumbbell", "biceps. forearms", "moderate-low", "weight-training"),
(5, "Barbell reverse curl", "Bicep curl that uses a barbell where the hands are holding the bar from on-top and is done while standing and by tucking the elbows towards the side of the torso while pulling the barbell towards the shoulders", "barbell", "biceps, forearms", "moderate-low", "weight-training"),
(6, "Deadlift", "Exercise that uses a barbell, starts with barbell on the ground and is done by squatting and pulling the bar up to the hips using the legs and core", "barbell", "abdominals, glutes, hamstrings, quads, traps", "moderate", "weight-training");



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
(log_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
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
(meal_id INT NOT NULL PRIMARY KEY,
description VARCHAR(500) NOT NULL,
total_calories INT NOT NULL,
carbs_g INT NOT NULL,
protein_g INT NOT NULL,
fat_g INT NOT NULL); 

-- examples of tuples for meal, the user will be able perform CRUD operation on meals
INSERT INTO meal VALUES 
(0, "Banana oatmeal (1 cup oats) w/ low-fat milk (1 cup)", 490, 97, 7 ,19),
(1, "Tofu scramble", 385, 10, 29,28),
(2, "Egg-white omelet (4 egg whites, 1 whole egg) with spinach (1 cup) and oyster mushrooms (½ cup)", 235.4, 5.3, 26, 12.2),
(3, "Avocado tuna salad", 472, 19, 36, 31),
(4, "Chicken broccoli casserole", 492,39,22,37),
(5, "Chicken caprese sandwich", 275,8,34,11);



-- subclass for log
create table diet_log
(log_id INT NOT NULL,
meal_id INT NOT NULL,
FOREIGN KEY (log_id) REFERENCES `log`(log_id)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (meal_id) REFERENCES meal(meal_id)
ON UPDATE CASCADE ON DELETE CASCADE);





