use fitness_db;

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


/* Testing our functions / procedures
DELIMITER ;
DELETE FROM user_account WHERE user_id = "dannyson900";
INSERT INTO user_account(user_id, password, reg_date, login_streak) VALUES ("dannyson900", "testing1", "2022-04-18",1);
CALL userExists("testing");
SELECT (loginUser("dannyson900", "test-false")) as logged_user;
SELECT (loginUser("dannyson900","testing1")) as logged_user;
SELECT * FROM user_account;

*/
