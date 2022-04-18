use fitness_db;

DROP FUNCTION IF EXISTS userExists;
DELIMITER //
CREATE FUNCTION userExists(username VARCHAR(64)) RETURNS INT
NOT DETERMINISTIC READS SQL DATA
BEGIN
 DECLARE query_count INT;
 SELECT count(*) INTO query_count FROM user_account WHERE username = user_id;
 RETURN query_count;
END//

DROP FUNCTION IF EXISTS loginUser;
CREATE FUNCTION loginUser(username VARCHAR(64), pass VARCHAR(64)) RETURNS INT
NOT DETERMINISTIC READS SQL DATA
BEGIN
 DECLARE query_count INT;
 SELECT count(*) INTO query_count FROM user_account WHERE username = user_id AND pass = password;
 RETURN query_count;
END//

DELIMITER ;
DELETE FROM user_account WHERE user_id = "dannyson900";
INSERT INTO user_account(user_id, password, reg_date, login_streak) VALUES ("dannyson900", "testing1", "2022-04-18",1);
SELECT (userExists("dannyson900")) as user_exists;
SELECT (loginUser("dannyson900", "test-false")) as logged_user;
SELECT (loginUser("dannyson900","testing1")) as logged_user;
