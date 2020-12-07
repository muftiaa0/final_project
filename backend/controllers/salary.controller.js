// package imports
const query = require('../utils/query.js');
const connection = require('../database-config.js');
const { GET_ELEVATED,  } = require('../queries/auth.queries');
const { GET_SALARY, UPDATE_SALARY } = require('../queries/salary.queries');

exports.getSalary = async (req,res) => {
    const employee = req.employee;
    if (employee.id) {
        const con = await connection().catch((err) => {
            throw err;
        });

        const retrievedSalary = await query(con, GET_SALARY, [employee.id]).catch(
            (err) => {
                res.status(500).json({ msg: 'Could not retrieve employee salary at this time.' });
            }
        );


        if (retrievedSalary.length) {
            res.status(200).send(retrievedSalary);
        } else {
            res.status(400).json({ msg: 'Could not retrieve employee salary at this time.' });
        }
    }
};

exports.updateSalary = async (req, res) => {
    const employee = req.employee;
    if (employee.id) {
        const con = await connection().catch((err) => {
            throw err;
        });

        // check to make sure that the employee is elevated
        const elevated = await query(con, GET_ELEVATED, [employee.id]).catch(
            (err) => {
                res.status(500).json({ msg: 'Failed to check if you are an elevated employee' });
            }
        );
        if (elevated[0].elevated == 1) {
            console.log(req.body.yearly_salary);
            console.log(req.body.username);
            const employeeSalaryUpdate = await query(con, UPDATE_SALARY, [req.body.yearly_salary, req.body.username]).catch(
                (err) => {
                    res.status(500).json({ msg: 'This employee does not exist in the system.' });
                }
            );
            res.status(200).json({ msg: 'Salary updated successfully.'});
        } else {
            res.status(500).json({ msg: 'You are not authorized to update employee salaries.' });
        }

    }
};
