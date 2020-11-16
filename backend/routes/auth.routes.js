const controllers = require('../controllers/auth.controller.js');
const express = require('express');

const authRoutes = express.Router();

authRoutes
    .post('/newEmployee', controllers.createPerson)
    .post('/login', controllers.login)
    .post('/updatePassword', controllers.updatePerson);

module.exports = authRoutes;