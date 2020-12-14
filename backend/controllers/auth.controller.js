// package imports 
const bcrypt = require('bcryptjs');
const { NEW_AUTH, GET_AUTH, UPDATE_PASSWORD } = require('../queries/auth.queries');
const { CREATE_EMPLOYEE, GET_EMPLOYEE_FROM_USERNAME } = require('../queries/employee.queries');
const { NEW_SALARY } = require('../queries/salary.queries');

const query = require('../utils/query.js');
const { refreshTokens, generateRefreshToken, generateAccessToken } = require('../utils/jwt-helpers');
const connection = require('../database-config.js');

exports.login = async (req, res) => {
    const con = await connection().catch((err) => {
        throw err;
    });

    // does this username exist in the auth table?
    const auth = await query(con, GET_AUTH, [req.body.username]).catch(
        (err) => {
            res.status(500);
            res.send({
                msg: 'Username does not exist.'
            });
        }
    );

    if (auth.length < 1) {
        res.status(403).send({
            msg: 'Username does not exist.'
        });
    } else {
        const validPassword = await bcrypt
            .compare(req.body.password, auth[0].password)
            .catch((err) => {
                res.json(500).json({
                    msg: 'Invalid Password'
                });
            });

        if (!validPassword) {
            res.status(403).send({
                 msg: 'Invalid password'
                 });
        } else {
            const employee = await query(con, GET_EMPLOYEE_FROM_USERNAME, [req.body.username]).catch(
                (err) => {
                    res.status(500);
                    res.send({
                        msg: 'Employee does not exist.'
                    });
                }
            );

            const accessToken = generateAccessToken(employee[0].username, { expiresIn: 86400 });
            const refreshToken = generateRefreshToken(employee[0].username, { expiresIn: 86400 });
            refreshTokens.push(refreshToken);
            
            res
                .header('access_token', accessToken)
                .json({ auth: true, 
                        msg: 'Logged in!',
                        token_type: 'bearer',
                        access_token: accessToken,
                        expires_in: 86400,
                        refresh_token: refreshToken,
                     });
        }
    }
};

exports.newEmployee = async (req, res) => {
    // hash password for use
    const passwordHash = bcrypt.hashSync(req.body.password);
    var isElevated = req.body.elevated == 'true';

    const con = await connection().catch((err) => {
        throw err;
    });


    if (req.body.last_name && req.body.first_name && req.body.username && req.body.home_address && req.body.yearly_salary) {
    // the new employee and newauth queries can happen at the same time independently but we want to make sure they occur before we retrieve the new employee.
    const newEmployee = await query(con, CREATE_EMPLOYEE, [req.body.last_name, req.body.first_name, req.body.username, req.body.home_address]).catch(
        (err) => {
            res.status(500).send({
                msg: 'Could not create employee because this username exists already'
            });
        }
    );

    const newAuth = await query(con, NEW_AUTH, [req.body.username, passwordHash, isElevated]).catch(
        (err) => {
            res.status(500).send({
                msg: 'Could not create authentication information.'
            });
        }
    );

    const newSalary = await query(con, NEW_SALARY, [req.body.username, req.body.yearly_salary]).catch(
        (err) => {
            res.status(500).send({
                msg: 'Invalid salary amount.'
            });
        }
    );

    if (newEmployee.affectedRows >= 1 && newAuth.affectedRows >= 1 && newSalary.affectedRows >= 1) {
        const employee = await query(con, GET_EMPLOYEE_FROM_USERNAME, [req.body.username]).catch(
            (err) => {
                res.status(500).send({
                    msg: 'Could not retrieve the employee created.'
                });
            }
        );
        res.send({ employee, msg: 'Created new account!' });
    } else {
        res.send({
            msg: 'New employee was not created successfully.'
        });
    }

    } else {
        res.status(500).send({
            msg: 'Not all required fields were submitted.'
        });
    }
    
}

exports.updatePassword = async (req, res) => {
    const employee = req.employee;

    if (req.body.password) {
        const passwordHash = bcrypt.hashSync(req.body.password);
        if (employee.id) {
            const con = await connection().catch((err) => {
                throw err;
            });
    
            // does this username exist in the auth table?
            const retrievedAuth = await query(con, GET_AUTH, [employee.id]).catch(
                (err) => {
                    res.status(500).json({ msg: 'Could not retrieve authentication information at this time.' });
                }
            );
    
            if (!!retrievedAuth.length) {
                const updatePassword = await query(con, UPDATE_PASSWORD, [passwordHash, employee.id]).catch(
                    (err) => {
                        res.status(500).json({ msg: 'Failed to update password.' });
                    }
                );
    
                console.log(updatePassword);
                if (!updatePassword.length) {
                    res.send({ msg: 'Employee password updated successfully!' });
                } else {
                    res.status(500).json({ msg: 'Failed to update password.' });
                }
            } else {
                res.status(500).json({ msg: 'Failed to retrieve authentication information.' });
            }
        } else {
            res.status(403).json({ msg: 'Invalid Token' });
        }
    } else {
        res.status(500).json({ msg: 'Please specify a valid new password.' });
    }
};


exports.logout = async (req, res) => {
    const refreshToken = req.body.token;
    var tokenIndex = refreshTokens.indexOf(refreshToken);
    refreshTokens.splice(tokenIndex, 1);

    res.json({
        msg: 'Logout Successful.'
    });
};



