// Database info
const mysql = require('mysql');
const { CREATE_EMPLOYEE_TABLE, CREATE_ADMIN_EMPLOYEE } = require('./queries/employee.queries');
const { CREATE_AUTH_TABLE, CREATE_ADMIN_AUTH } = require('./queries/auth.queries');
const { CREATE_SALARY_TABLE } = require('./queries/salary.queries');
const query = require('./utils/query');
const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PW || 'password';
const database = process.env.DB_NAME || 'hr_primary';
const bcrypt = require('bcryptjs');

// Database connection string
const connection = async () =>
    new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host,
            user,
            password,
            database,
        });

        con.connect((err) => {
            if (err) {
                reject(err);
                return;
            }
        });

        resolve(con);
    });

// Create the connection with required details
(async () => {
    const _con = await connection().catch((err) => {
        throw err;
    });

    const employeeTableCreated = await query(_con, CREATE_EMPLOYEE_TABLE).catch(
        (err) => {
            console.log(err);
            
        }
    );

    const authTableCreated = await query(_con, CREATE_AUTH_TABLE).catch(
        (err) => {
            console.log(err);
        }
    );

    const salaryTableCreated = await query(_con, CREATE_SALARY_TABLE).catch(
        (err) => {
            console.log(err);
        }  
    );

    if (!!employeeTableCreated && !!authTableCreated && !!salaryTableCreated) {
        console.log('Tables Created!');
    }

    // create admin account
    const passwordHash = bcrypt.hashSync("admin");
    const employeeAdminCreated = await query(_con, CREATE_ADMIN_EMPLOYEE).catch(
        (err) => {
            console.log(err);
            
        }
    );

    const authAdminCreated = await query(_con, CREATE_ADMIN_AUTH, [passwordHash]).catch(
        (err) => {
            console.log(err);
        }
    );

    if (!!employeeAdminCreated && !!authAdminCreated) {
        console.log('Admin user created');
    }
})();

module.exports = connection;

