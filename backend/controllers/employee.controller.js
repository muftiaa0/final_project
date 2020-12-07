// package imports
const query = require('../utils/query.js');
const connection = require('../database-config.js');
const { GET_EMPLOYEE_FROM_USERNAME, UPDATE_EMPLOYEE_LAST_NAME, UPDATE_EMPLOYEE_FIRST_NAME, UPDATE_EMPLOYEE_HOME_ADDRESS, } = require('../queries/employee.queries');

exports.getEmployee = async (req,res) => {
    const employee = req.employee;
    if (employee.id) {
        const con = await connection().catch((err) => {
            throw err;
        });

        const retrievedEmployee = await query(con, GET_EMPLOYEE_FROM_USERNAME, [employee.id]).catch(
            (err) => {
                res.status(500).json({ msg: 'Could not retrieve employee at this time.' });
            }
        );

        if (retrievedEmployee.length) {
            res.status(200).send(retrievedEmployee);
        } else {
            res.status(400).json({ msg: 'Could not retrieve employee at this time.' });
        }
    }
};

exports.updateEmployee = async (req, res) => {
    const employee = req.employee;
    if (employee.id) {
        const con = await connection().catch((err) => {
            throw err;
        });

        if (req.body.last_name != undefined) {
            const updatedLast = await query(con, UPDATE_EMPLOYEE_LAST_NAME, [req.body.last_name, employee.id]).catch(
                (err) => {
                    res.status(500).json({ msg: 'Could not update employee at this time.' });
                }
            );
        }

        if (req.body.first_name != undefined) {
            const updatedFirst = await query(con, UPDATE_EMPLOYEE_FIRST_NAME, [req.body.first_name, employee.id]).catch(
                (err) => {
                    res.status(500).json({ msg: 'Could not update employee at this time.' });
                }
            );
        }

        if (req.body.home_address != undefined) {
            const updatedAddress = await query(con, UPDATE_EMPLOYEE_HOME_ADDRESS, [req.body.home_address, employee.id]).catch(
                (err) => {
                    res.status(500).json({ msg: 'Could not update employee at this time.' });
                }
            );
        }

        console.log(req.body.home_address);
        if (req.body.home_address == undefined && req.body.first_name == undefined && req.body.last_name == undefined) {
            res.status(500).json({ msg: 'Must update at least one value' });
        } else {
            res.status(200).json({ msg: 'Successfully Updated user.' });
        }
    }
};

