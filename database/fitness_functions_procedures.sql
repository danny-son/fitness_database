use fitness_db;

# Checks to see if a user Exists in the database
DROP PROCEDURE IF EXISTS userExists;
DELIMITER //
CREATE PROCEDURE userExists(IN username VARCHAR(64))
BEGIN
	SELECT * FROM user_account WHERE username = user_id;
END//


#Function to see if when logging in a user, the credentials are valid or not
DELIMITER ;
DROP FUNCTION IF EXISTS loginUser;
DELIMITER //
CREATE FUNCTION loginUser(username VARCHAR(64), pass VARCHAR(64)) RETURNS INT
NOT DETERMINISTIC READS SQL DATA
BEGIN
	DECLARE query_count INT;
	SELECT count(*) INTO query_count FROM user_account WHERE username = user_id AND pass = password;
	RETURN query_count;
END//

#Inserts a user into user account
DELIMITER ;
DROP PROCEDURE IF EXISTS insertUser;
DELIMITER //
CREATE PROCEDURE insertUser(IN username VARCHAR(64), IN pass VARCHAR(64), IN date DATE)
BEGIN
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
		SELECT CONCAT("user ('", username, "'), already exists") AS ERROR;
    END;
    
	INSERT INTO user_account(user_id, password, reg_date, login_streak) VALUES (username, pass, date, 1);
	INSERT INTO user_achievements(user_id,a_id, date_unlock) VALUES (username, 0, date);
END//


# Updates a user
DELIMITER ;
DROP PROCEDURE IF EXISTS updateUser;
DELIMITER //
CREATE PROCEDURE updateUser(IN username VARCHAR(64), IN pass VARCHAR(64))
BEGIN
	UPDATE user_account SET password = pass WHERE user_id = username;
END//

DELIMITER ;
DROP PROCEDURE IF EXISTS deleteUser;
DELIMITER // 
CREATE PROCEDURE deleteUser(IN username VARCHAR(64))
BEGIN
	-- deletes all tuples in our logs, user_achievements, and user account
    DELETE FROM user_achievements WHERE user_id = username;
    DELETE FROM `log` WHERE user_id = username;
	DELETE FROM user_account WHERE user_id = username;
END//


### Programming objects based on workout objects
# Returns a workout if it exists (from name)
DELIMITER ;
DROP PROCEDURE IF EXISTS workOutExists;
DELIMITER //
CREATE PROCEDURE workOutExists(IN workoutname VARCHAR(20))
BEGIN
	SELECT * FROM workout WHERE workoutname = name;
END//


# Finds a workout based on the difficulty
DELIMITER ;
DROP PROCEDURE IF EXISTS findWorkOutByDifficulty;
DELIMITER //
CREATE PROCEDURE findWorkOutByDifficulty(IN difficulty_p INT)
BEGIN
	SELECT * FROM workout WHERE difficulty_p = diffIculty;
END//

# Finds a workout based on what equipment is needed
DELIMITER ;
DROP PROCEDURE IF EXISTS findWorkOutByEquipment;
DELIMITER //
CREATE PROCEDURE findWorkOutByEquipment(IN equipment_p VARCHAR(999))
BEGIN

	SELECT * FROM workout WHERE equipment LIKE CONCAT('%', equipment_p, '%');
    
END//

# Finds a workout based on what the muscle group that is worked out
DELIMITER ;
DROP PROCEDURE IF EXISTS findWorkOutByMuscleGroup;
DELIMITER //
CREATE PROCEDURE findWorkOutByMuscleGroup(IN muscle_group_p VARCHAR(999))
BEGIN
	SELECT * FROM workout WHERE muscle_group LIKE CONCAT('%', muscle_group_p, '%');
END//

# Finds a workout based on what type of exercise
DELIMITER ;
DROP PROCEDURE IF EXISTS findWorkOutByExercise;
DELIMITER //
CREATE PROCEDURE findWorkOutByExercise(IN exercise_type_p VARCHAR(999))
BEGIN
	SELECT * FROM workout WHERE exercise_type LIKE CONCAT('%', exercise_type_p, '%');
END//

# reads all the achievements shown
DELIMITER ; 
DROP PROCEDURE IF EXISTS viewAchievements;
DELIMITER // 
CREATE PROCEDURE viewAchievements()
BEGIN
	SELECT * FROM achievements;
END // 

# Gets the achievements earned by a specified user
DELIMITER ;
DROP PROCEDURE IF EXISTS findUserAchievements;
DELIMITER //
CREATE PROCEDURE findUserAchievements(IN user_p VARCHAR(64))
BEGIN
    SELECT user_id, achievements.* FROM user_achievements 
		JOIN achievements ON user_achievements.a_id = achievements.a_id
		WHERE user_p = user_id;
END//



### Programming objects based on workout objects
# Returns a workout if it exists (from name)
DELIMITER ;
DROP PROCEDURE IF EXISTS workOutExists;
DELIMITER //
CREATE PROCEDURE workOutExists(IN workoutname VARCHAR(20))
BEGIN
  SELECT * FROM workout WHERE workoutname = name;
END//



# Returns all workouts
DELIMITER ;
DROP PROCEDURE IF EXISTS viewAllWorkouts;
DELIMITER //
CREATE PROCEDURE viewAllWorkouts()
BEGIN
  SELECT * FROM workout;
END//

# Logs and creates a workout log and log
DELIMITER ;
DROP PROCEDURE IF EXISTS logWorkout;
DELIMITER //
CREATE PROCEDURE logWorkout(d_date DATE,IN d_description VARCHAR(500), IN username VARCHAR(64), IN work_id INT,IN len INT) 
BEGIN
    DECLARE l_id INT;
    
    -- else create the log and return true to indicate success
    INSERT INTO log(date,description,user_id) VALUES (d_date,d_description,username);
    SELECT log_id INTO l_id FROM `log` WHERE date = d_date AND description = d_description AND user_id = username;
    INSERT INTO workout_log VALUES (l_id,work_id,len);
END//

# Gets all workout logs from a user
DELIMITER ; 
DROP PROCEDURE IF EXISTS getWorkoutLogsFromUser;
DELIMITER //
CREATE PROCEDURE getWorkoutLogsFromUser(IN user_p VARCHAR(64))
BEGIN
	SELECT log.date, log.description, workout_log.*, workout.name FROM log 
    JOIN workout_log ON log.log_id = workout_log.log_id
    JOIN workout ON workout.w_id = workout_log.w_id WHERE user_id = user_p ORDER BY log.log_id DESC;
END //

#Deletes a workout log and log from a user
DELIMITER ; 
DROP PROCEDURE IF EXISTS deleteWorkoutLog;
DELIMITER //
CREATE PROCEDURE deleteWorkoutLog(IN l_id INT)
BEGIN
	DELETE FROM workout_log WHERE l_id = log_id;
    DELETE FROM log WHERE l_id = log_id;
END //

#Updates a workout log and log from a user
DELIMITER ; 
DROP PROCEDURE IF EXISTS updateWorkoutLog;
DELIMITER //
CREATE PROCEDURE updateWorkoutLog(IN l_id INT, IN user_p VARCHAR(64), IN d_desc VARCHAR(500), IN d_date DATE, IN len INT)
BEGIN
	UPDATE log SET date = d_date, description = d_desc WHERE user_id = user_p AND log_id = l_id;
    UPDATE workout_log SET workout_length = len WHERE log_id = l_id;
END //

# reads all the achievements shown
DELIMITER ; 
DROP PROCEDURE IF EXISTS viewAchievements;
DELIMITER // 
CREATE PROCEDURE viewAchievements()
BEGIN
	SELECT * FROM achievements;
END // 

# Gets the achievements earned by a specified user
DELIMITER ;
DROP PROCEDURE IF EXISTS findUserAchievements;
DELIMITER //
CREATE PROCEDURE findUserAchievements(IN user_p VARCHAR(64))
BEGIN
    SELECT user_id, achievements.*, user_achievements.date_unlock AS date_unlock FROM user_achievements 
		JOIN achievements ON user_achievements.a_id = achievements.a_id
		WHERE user_p = user_id;
END//


### Programing objects based on achievements

# Gets the amount of points of a user based on their achievements
DELIMITER ;
DROP FUNCTION IF EXISTS getUserPoints;
DELIMITER //
CREATE FUNCTION getUserPoints(user_p VARCHAR(64))
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
	DECLARE total_points INT;

    WITH user_p_achievements AS
    (SELECT user_id, achievements.* FROM user_achievements 
		JOIN achievements ON user_achievements.a_id = achievements.a_id
		WHERE user_p = user_id)
		SELECT SUM(user_p_achievements.points) FROM user_p_achievements
        INTO total_points;
	
    RETURN total_points;
END//


DELIMITER ;
DROP PROCEDURE IF EXISTS findAllMeals;
DELIMITER //
CREATE PROCEDURE findAllMeals()
BEGIN 
	SELECT * FROM meal;
END //

# Finds a meal based on specified calories, can specify operators
DELIMITER ;
DROP PROCEDURE IF EXISTS findMealByCalories;
DELIMITER //
CREATE PROCEDURE findMealByCalories(
	IN total_calories_p INT, IN op_cal_p VARCHAR(2)
)
BEGIN
	IF op_cal_p = '=' THEN
		SELECT * FROM meal WHERE meal.total_calories = total_calories_p;
	ELSEIF op_cal_p = '<' THEN
		SELECT * FROM meal WHERE meal.total_calories < total_calories_p;
	ELSEIF op_cal_p = '>' THEN
		SELECT * FROM meal WHERE meal.total_calories > total_calories_p;
	END IF;
END //

# Finds a meal based on carbs count, can specify operators
DELIMITER ;
DROP PROCEDURE IF EXISTS findMealByCarbs;
DELIMITER //
CREATE PROCEDURE findMealByCarbs(
	IN carbs_p INT, IN op_carbs_p VARCHAR(2)
)
BEGIN
	IF op_carbs_p = '=' THEN
		SELECT * FROM meal WHERE meal.carbs_g = carbs_p;
	ELSEIF op_carbs_p = '<' THEN
		SELECT * FROM meal WHERE meal.carbs_g < carbs_p;
	ELSEIF op_carbs_p = '>' THEN
		SELECT * FROM meal WHERE meal.carbs_g > carbs_p;
	END IF;
END //


#Editing meals

DELIMITER ;
DROP PROCEDURE IF EXISTS addMeal;
DELIMITER //
CREATE PROCEDURE addMeal(IN d_description VARCHAR(500), IN cals INT, IN carbs INT, IN protein INT, IN fat INT)
BEGIN
	 INSERT INTO meal(description, total_calories, carbs_g, protein_g, fat_g) VALUES (d_description, cals, carbs, protein,fat);
END//

DELIMITER ;
DROP PROCEDURE IF EXISTS editMeal;
DELIMITER //
CREATE PROCEDURE editMeal(IN id INT, IN d_description VARCHAR(500), IN cals INT, IN carbs INT, IN protein INT, IN fat INT)
BEGIN 
	UPDATE meal
    SET description = d_description, total_calories = cals, carbs_g = carbs, protein_g = protein, fat_g = fat
    WHERE meal_id = id;
END//

DELIMITER ;
DROP PROCEDURE IF EXISTS deleteMeal;
DELIMITER //
CREATE PROCEDURE deleteMeal(IN id INT)
BEGIN 
	DELETE FROM meal WHERE id = meal_id;
END//

# Finds a meal based on protein count, can specify operators
DELIMITER ;
DROP PROCEDURE IF EXISTS findMealByProtein;
DELIMITER //
CREATE PROCEDURE findMealByProtein(
	IN pro_p INT, IN op_pro_p VARCHAR(2)
)
BEGIN
	IF op_pro_p = '=' THEN
		SELECT * FROM meal WHERE meal.protein_g = pro_p;
	ELSEIF op_pro_p = '<' THEN
		SELECT * FROM meal WHERE meal.protein_g < pro_p;
	ELSEIF op_pro_p = '>' THEN
		SELECT * FROM meal WHERE meal.protein_g > pro_p;
	END IF;
END //

# Finds a meal based on fat content, can specify operators
DELIMITER ;
DROP PROCEDURE IF EXISTS findMealByFat;
DELIMITER //
CREATE PROCEDURE findMealByFat(
	IN fat_p INT, IN op_fat_p VARCHAR(2)
)
BEGIN
	IF op_fat_p = '=' THEN
		SELECT * FROM meal WHERE meal.fat_g = fat_p;
	ELSEIF op_fat_p = '<' THEN
		SELECT * FROM meal WHERE meal.fat_g < fat_p;
	ELSEIF op_fat_p = '>' THEN
		SELECT * FROM meal WHERE meal.fat_g > fat_p;
	END IF;
END //

# Logs and creates a workout log and log
DELIMITER ;
DROP PROCEDURE IF EXISTS logDiet;
DELIMITER //
CREATE PROCEDURE logDiet(IN d_date DATE, IN d_description VARCHAR(500), IN username VARCHAR(64), IN m_id INT)
BEGIN
    DECLARE l_id INT;
    
    -- else create the log and return true to indicate success
    INSERT INTO `log`(date,description,user_id) VALUES (d_date,d_description,username);
    SELECT log_id INTO l_id FROM `log` WHERE date = d_date AND description = d_description AND user_id = username;
    INSERT INTO diet_log VALUES (l_id,m_id);
    -- possibly modify to check for len to add achievements?
END//


DELIMITER ; 
DROP PROCEDURE IF EXISTS viewDietLog;
DELIMITER //
CREATE PROCEDURE viewDietLog(IN username VARCHAR(64))
BEGIN 
	SELECT log.date, log.description, log.log_id, meal.description AS meal_description FROM log 
    JOIN diet_log ON log.log_id = diet_log.log_id
    JOIN meal ON meal.meal_id = diet_log.meal_id WHERE user_id = username ORDER BY log.log_id DESC;
END //

# deletes a diet log
DELIMITER ; 
DROP PROCEDURE IF EXISTS deleteDietLog;
DELIMITER //
CREATE PROCEDURE deleteDietLog(IN l_id INT)
BEGIN
	DELETE FROM diet_log WHERE l_id = log_id;
    DELETE FROM log WHERE l_id = log_id;
END //

#Updates a workout log and log from a user
DELIMITER ; 
DROP PROCEDURE IF EXISTS updateDietLog;
DELIMITER //
CREATE PROCEDURE updateDietLog(IN l_id INT, IN user_p VARCHAR(64), IN d_desc VARCHAR(500), IN d_date DATE)
BEGIN
	UPDATE log SET date = d_date, description = d_desc WHERE user_id = user_p AND log_id = l_id;
END //

