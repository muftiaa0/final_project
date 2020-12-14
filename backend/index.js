const express = require('express');
const port = process.env.PORT || 3001;

const employeeRoutes = require('./routes/employee.routes.js');
const authRoutes = require('./routes/auth.routes');
const salaryRoutes = require('./routes/salary.routes');
const logger = require('morgan');
const logLevel = process.env.LOG_LEVEL || 'dev';

const { error404, error500 } = require('./middleware/errors.middleware');

const bodyParser = require('body-parser');

const app = express(); // startup

// CORS
var cors = require('cors');
app.use(cors());

// setup basic logging
app.use(logger(logLevel));

// setup parsing of incoming requests
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// routing
app.use('/api/employee', employeeRoutes); // this will be used for general employee functions.
app.use('/api/auth', authRoutes); // this will be used for authentication
app.use('/api/salary', salaryRoutes); // this will be used for salary related information

// handle bad HTTP response codes
app.use(error404);
app.use(error500);

app.listen(port, function() {
    console.log('Server started successfully at http://localhost:%s', port);
});