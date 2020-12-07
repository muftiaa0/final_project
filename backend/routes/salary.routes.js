const express = require('express');
const { getSalary, updateSalary } = require('../controllers/salary.controller');
const canAccess = require('../middleware/auth.middleware')

const salaryRoutes = express.Router();

salaryRoutes
    .get('/', canAccess, getSalary)
    .put('/update', canAccess, updateSalary) 

module.exports = salaryRoutes;