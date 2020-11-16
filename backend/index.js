const express = require('express');
const port = process.env.PORT || 3000;

const employeeRoutes = require('./routes/employee.routes.js');
const authRoutes = require('./routes/auth.routes')
const teamRoutes = require('./routes/team.routes.js');
const managementRoutes = require('./routes/management.routes.js');
const middleware = require('./middleware/errors.middleware');

const bodyParser = require('body-parser');

const app = express(); // startup

// setup parsing of incoming requests
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// routing
app.use('/api/employee', employeeRoutes); // this will be used for general employee functions.
app.use('/api/auth', authRoutes); // this will be used for authentication
app.use('/api/team', teamRoutes); // this will be used for viewing details about your team
app.use('/api/management', managementRoutes); // this will be used to give raises and promotions to people working for you.

// handle bad HTTP response codes
app.use(middleware.error404);
app.use(middleware.error500);


app.listen(port, function() {
    console.log('Server started successfully at http://localhost:%s', port);
});