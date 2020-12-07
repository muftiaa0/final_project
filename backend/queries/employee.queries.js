exports.CREATE_EMPLOYEE_TABLE = 'CREATE TABLE employee (employee_id int NOT NULL AUTO_INCREMENT, last_name varchar(255), first_name varchar(255), username varchar(255) UNIQUE, home_address varchar(255), PRIMARY KEY (employee_id, username))';
exports.CREATE_ADMIN_EMPLOYEE = "INSERT INTO employee (username) VALUES ('admin')";

exports.CREATE_EMPLOYEE = 'INSERT INTO employee (last_name, first_name, username, home_address) VALUE (?, ?, ?, ?)';
exports.GET_EMPLOYEE_FROM_USERNAME = 'select * from employee where username = ?';

exports.UPDATE_EMPLOYEE_LAST_NAME = 'UPDATE employee SET last_name = ? where username = ?';
exports.UPDATE_EMPLOYEE_FIRST_NAME = 'UPDATE employee SET first_name = ? where username = ?';
exports.UPDATE_EMPLOYEE_HOME_ADDRESS = 'UPDATE employee SET home_address = ? where username = ?';