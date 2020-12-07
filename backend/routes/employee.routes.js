const express = require('express');
const { getEmployee, updateEmployee } = require('../controllers/employee.controller');
const canAccess = require('../middleware/auth.middleware')

const employeeRoutes = express.Router();

employeeRoutes
    .get('/me', canAccess, getEmployee)
    .put('/me/update', canAccess, updateEmployee) 

module.exports = employeeRoutes;