const controllers = require('../controllers/employee.controller');
const express = require('express');

const employeeRoutes = express.Router();

employeeRoutes
    .get('/', controllers.getEmployee)
    .put('/', controllers.updateEmployee) // only information 

module.exports = employeeRoutes;