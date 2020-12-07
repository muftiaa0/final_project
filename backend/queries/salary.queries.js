exports.CREATE_SALARY_TABLE = 'CREATE TABLE salary (username varchar(255), yearly_salary decimal(15, 2), PRIMARY KEY employee(username))';

exports.NEW_SALARY = 'INSERT INTO salary (username, yearly_salary) values (?, ?)';

exports.GET_SALARY = 'SELECT * from salary where username = ?';
exports.UPDATE_SALARY = 'UPDATE salary SET yearly_salary = ? where username = ?';