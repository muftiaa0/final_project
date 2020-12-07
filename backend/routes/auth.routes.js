const { 
    newEmployee,
    login,
    updatePassword,
    logout, 
} = require('../controllers/auth.controller.js');

const canAccess = require('../middleware/auth.middleware')

const express = require('express');

const authRoutes = express.Router();

authRoutes
    .post('/newEmployee', newEmployee)
    .post('/login', login)
    .put('/updatePassword', canAccess, updatePassword)
    .post('/logout', logout);

module.exports = authRoutes;