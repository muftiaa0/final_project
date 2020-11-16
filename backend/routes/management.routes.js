const controllers = require('../controllers/management.controller');
const express = require('express');

const managementRoutes = express.Router();

managementRoutes
    .get('/', controllers.getEmployee)
    .put('/', controllers.updateEmployee) // update certain information
    .put('/promote', controllers.promotion)
    .get('/team', controllers.getTeamInfo)

module.exports = managementRoutes;