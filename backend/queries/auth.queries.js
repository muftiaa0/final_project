exports.CREATE_AUTH_TABLE = 'CREATE TABLE authentication (auth_id int NOT NULL AUTO_INCREMENT, username varchar(255) UNIQUE, password varchar(255) NOT NULL, elevated boolean, PRIMARY KEY (auth_id, password), FOREIGN KEY (username) REFERENCES employee(username))';
exports.CREATE_ADMIN_AUTH = "INSERT INTO authentication (username, password, elevated) VALUES ('admin', ? , true)";

exports.NEW_AUTH = 'INSERT INTO authentication (username, password, elevated) VALUES (?, ?, ?)';
exports.UPDATE_PASSWORD = 'UPDATE authentication SET password = ? where username = ?';

exports.GET_AUTH = 'select * from authentication where username = ?';
exports.GET_ELEVATED = 'select elevated from authentication where username = ?';
exports.GET_HASH_PASSWORD = 'select password from authentication where username = ?';