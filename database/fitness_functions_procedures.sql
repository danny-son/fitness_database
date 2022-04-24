use fitness_db;

### Programming objects based on user login/registration
DROP PROCEDURE IF EXISTS userExists;
DELIMITER //
CREATE PROCEDURE userExists(IN username VARCHAR(64))
BEGIN
 SELECT * FROM user_account WHERE username = user_id;
END//

DROP FUNCTION IF EXISTS loginUser;
CREATE FUNCTION loginUser(username VARCHAR(64), pass VARCHAR(64)) RETURNS INT
NOT DETERMINISTIC READS SQL DATA
BEGIN
 DECLARE query_count INT;
 SELECT count(*) INTO query_count FROM user_account WHERE username = user_id AND pass = password;
 RETURN query_count;
END//

DROP PROCEDURE IF EXISTS insertUser;
CREATE PROCEDURE insertUser(IN username VARCHAR(64), IN pass VARCHAR(64), IN date DATE)
BEGIN
 INSERT INTO user_account(user_id, password, reg_date, login_streak) VALUES (username, pass, date, 1);
END//

### Programming objects based on workout objects
# Returns a workout if it exists (from name)
DROP PROCEDURE IF EXISTS workOutExists;
CREATE PROCEDURE workOutExists(IN workoutname VARCHAR(20))
BEGIN

  SELECT * FROM workout WHERE workoutname = name;

END//

# Finds a workout based on the difficulty
DROP PROCEDURE IF EXISTS findWorkOutByDifficulty;
CREATE PROCEDURE findWorkOutByDifficulty(IN difficulty_p INT)
BEGIN

	SELECT * FROM workout WHERE difficulty_p = diffIculty;
    
END//

# Finds a workout based on what equipment is needed
DROP PROCEDURE IF EXISTS findWorkOutByEquipment;
CREATE PROCEDURE findWorkOutByEquipment(IN equipment_p VARCHAR(999))
BEGIN

	SELECT * FROM workout WHERE equipment LIKE CONCAT('%', equipment_p, '%');
    
END//

# Finds a workout based on what the muscle group that is worked out
DROP PROCEDURE IF EXISTS findWorkOutByMuscleGroup;
CREATE PROCEDURE findWorkOutByMuscleGroup(IN muscle_group_p VARCHAR(999))
BEGIN

	SELECT * FROM workout WHERE muscle_group LIKE CONCAT('%', muscle_group_p, '%');
    
END//

# Finds a workout based on what type of exercise
DROP PROCEDURE IF EXISTS findWorkOutByExercise;
CREATE PROCEDURE findWorkOutByExercise(IN exercise_type_p VARCHAR(999))
BEGIN

	SELECT * FROM workout WHERE exercise_type LIKE CONCAT('%', exercise_type_p, '%');
    
END//

# Gets the achievements earned by a specified user
DROP PROCEDURE IF EXISTS findUserAchievements;
CREATE PROCEDURE findUserAchievements(IN user_p VARCHAR(64))
BEGIN

    SELECT user_id, achievements.* FROM user_achievements 
		JOIN achievements ON user_achievements.a_id = achievements.a_id
		WHERE user_p = user_id;
END//







/*
DELIMITER ;
# Tests related to login management
DELETE FROM user_account WHERE user_id = "dannyson900";
INSERT INTO user_account(user_id, password, reg_date, login_streak) VALUES ("dannyson900", "testing1", "2022-04-18",1);
SELECT * FROM user_account;
CALL userExists("dannyson900");
SELECT (loginUser("dannyson900", "test-false")) as logged_user;
SELECT (loginUser("dannyson900","testing1")) as logged_user;
SELECT * FROM user_account;

# Tests related to workouts
-- workOutExists(...)
INSERT INTO workout(w_id, name, description, equipment, muscle_group, difficulty, exercise_type)
	VALUES (0, 'pushup', 'Calisthenics exercise starting from the prone position and done by raising and lowering the body using the arms',
			'none', 'abdominals, deltoids, pectoral, triceps', '5', 'calisthenics');
CALL workOutExists('pushup');
CALL workOutExists('coffee');
DELETE FROM workout WHERE w_id = 0;
CALL workOutExists('pushup');

-- findWorkOutByDifficulty/Equipment/MuscleGroup/Exercise(...)
INSERT INTO workout(w_id, name, description, equipment, muscle_group, difficulty, exercise_type)
	VALUES (0, 'pushup', 'Calisthenics exercise starting from the prone position and done by raising and lowering the body using the arms',
			'none', 'abdominals, deltoids, pectoral, triceps', 5, 'calisthenics');
INSERT INTO workout(w_id, name, description, equipment, muscle_group, difficulty, exercise_type)
	VALUES (1, 'test', 'test', 'none', 'none', 0, 'nothing');
INSERT INTO workout(w_id, name, description, equipment, muscle_group, difficulty, exercise_type)
	VALUES (2, 'hard_workout_1', 'hardest workout ever', 'none', 'every muscle', 10, 'everything');
INSERT INTO workout(w_id, name, description, equipment, muscle_group, difficulty, exercise_type)
	VALUES (3, 'moderate_workout', 'a moderate workout', 'none', 'legs', 5, 'cardio');
INSERT INTO workout(w_id, name, description, equipment, muscle_group, difficulty, exercise_type)
	VALUES (4, 'many_equipments', 'a workout with a lot of equipments',
    'pullup_bar, dumbbell, towel, headband, chicken', 'legs', 5, 'cardio');
INSERT INTO workout(w_id, name, description, equipment, muscle_group, difficulty, exercise_type)
	VALUES (5, 'one_equipment', 'a workout with 1 equipment', 'dumbbell', 'arms', 5, 'cardio');
SELECT * FROM workout;  

CALL findWorkOutByDifficulty(5);
CALL findWorkOutByEquipment('dumbbell');
CALL findWorkOutByMuscleGroup('legs');
CALL findWorkOutByExercise('cardio');

DELETE FROM workout WHERE w_id >= 0;  

# Tests related to achievements

-- findUserAchievements(...)
INSERT INTO user_account(user_id, password, reg_date, login_streak) VALUES ("dannyson900", "testing1", "2022-04-18", 1);
INSERT INTO user_account(user_id, password, reg_date, login_streak) VALUES ("swagman4", "testing3", "2022-04-18", 1);
INSERT INTO user_account(user_id, password, reg_date, login_streak) VALUES ("obama", "password", "2022-04-18", 1);
INSERT INTO user_account(user_id, password, reg_date, login_streak) VALUES ("travis", "penutbutter7", "2022-04-18", 100);
SELECT * FROM user_account;

INSERT INTO achievements(a_id, name, description, points) VALUES (0, 'test1', 'winrar', 10);
INSERT INTO achievements(a_id, name, description, points) VALUES (1, 'test2', 'biggerwinrar', 20);
INSERT INTO achievements(a_id, name, description, points) VALUES (2, 'test3', 'superbwinrar', 100);
INSERT INTO achievements(a_id, name, description, points) VALUES (3, 'test4', 'hugewinrar', 1000);
SELECT * FROM achievements;

INSERT INTO user_achievements(achievement_unlock_id, user_id, a_id, time_unlock) VALUES(0, 'dannyson900', 0, '2022-04-19');
INSERT INTO user_achievements(achievement_unlock_id, user_id, a_id, time_unlock) VALUES(1, 'dannyson900', 1, '2022-04-20');
INSERT INTO user_achievements(achievement_unlock_id, user_id, a_id, time_unlock) VALUES(2, 'dannyson900', 2, '2022-04-21');
INSERT INTO user_achievements(achievement_unlock_id, user_id, a_id, time_unlock) VALUES(3, 'obama', 0, '2022-04-20');
INSERT INTO user_achievements(achievement_unlock_id, user_id, a_id, time_unlock) VALUES(4, 'dannyson900', 3, '2022-04-21');
INSERT INTO user_achievements(achievement_unlock_id, user_id, a_id, time_unlock) VALUES(5, 'travis', 2, '2022-04-19');
SELECT * FROM user_achievements;

SELECT * FROM user_achievements JOIN achievements ON user_achievements.a_id = achievements.a_id;

CALL findUserAchievements('dannyson900');
CALL findUserAchievements('obama');
CALL findUserAchievements('stacy');
/*

