const controllers = require('../controllers/team.controller');
const express = require('express');

const teamRoutes = express.Router();

teamRoutes
    .get('/', controllers.getTeamInformation)  
    // we might be able to remove this route and migrate it to the employee route

module.exports = teamRoutes;