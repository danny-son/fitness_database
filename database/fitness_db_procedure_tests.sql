USE 'fitness_db'

# Testing our functions / procedures
DELIMITER ;
DELETE FROM user_account WHERE user_id = "dannyson900";
INSERT INTO user_account(user_id, password, reg_date, login_streak) VALUES ("dannyson900", "testing1", "2022-04-18",1);
CALL userExists("testing");
SELECT (loginUser("dannyson900", "test-false")) as logged_user;
SELECT (loginUser("dannyson900","testing1")) as logged_user;
SELECT * FROM user_account;

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
SELECT * FROM achievements;
INSERT INTO user_achievements(user_id, a_id, date_unlock) VALUES('dannyson900', 0, '2022-04-19');
INSERT INTO user_achievements(user_id, a_id, date_unlock) VALUES('dannyson900', 1, '2022-04-20');
INSERT INTO user_achievements(user_id, a_id, date_unlock) VALUES('dannyson900', 2, '2022-04-21');
INSERT INTO user_achievements(user_id, a_id, date_unlock) VALUES('obama', 0, '2022-04-20');
INSERT INTO user_achievements(user_id, a_id, date_unlock) VALUES('dannyson900', 3, '2022-04-21');
INSERT INTO user_achievements(user_id, a_id, date_unlock) VALUES('travis', 2, '2022-04-19');
SELECT * FROM user_achievements;
SELECT * FROM user_achievements JOIN achievements ON user_achievements.a_id = achievements.a_id;
CALL findUserAchievements('dannyson900');
CALL findUserAchievements('obama');
CALL findUserAchievements('stacy');

SELECT getUserPoints('dannyson900');

DELETE FROM user_achievements WHERE achievement_unlock_id >= 0;

# Tests related to meals
CALL findMealByCalories(1000, "<");
CALL findMealByCalories(50, "<");
CALL findMealByCalories(385, "<=");
CALL findMealByCalories(385, ">=");

CALL findMealByCarbs(10, ">");
CALL findMealByCarbs(10, "<");
CALL findMealByCarbs(8, "<=");
CALL findMealByCarbs(8, ">=");

CALL findMealByProtein(30, ">");
CALL findMealByCarbs(30, "<");
CALL findMealByCarbs(22, "<=");
CALL findMealByCarbs(22, ">=");

SELECT * FROM user_account;

# Tests relating to logs
INSERT INTO log(datetime, description, user_id) VALUES("2022-04-19", "good workout day", "dannyson900");
INSERT INTO log(datetime, description, user_id) VALUES("2022-04-20", "goodish workout day", "dannyson900");
INSERT INTO log(datetime, description, user_id) VALUES("2022-04-21", "bad workout day", "dannyson900");
INSERT INTO log(datetime, description, user_id) VALUES("2022-04-22", "mid workout day", "dannyson900");
INSERT INTO log(datetime, description, user_id) VALUES("2022-04-19", "im obama", "obama");

CALL getLatestLog("dannyson900");
CALL getLatestLog("obama");
CALL getLogsFromUser("dannyson900");
CALL getLogsFromUser("obama");

DELETE FROM log WHERE log_id >= 0;

### Testing error handling

CALL insertUser("bobdylan", "abc", "2022-04-30");
CALL insertUser("bobdylan", "acc", "2022-05-01");
