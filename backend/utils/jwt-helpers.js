const jwt = require('jsonwebtoken');

// secrets
const jwtconfig = {
    access: 'final_access',
    refresh: 'final_refresh',
};

// store for refresh tokens created
const refreshTokens = [];

// create new auth-token
const generateAccessToken = (id, expiresIn) =>
    jwt.sign({ id }, jwtconfig.access, expiresIn);

// create new refresh token
const generateRefreshToken = (id, expiresIn) =>
    jwt.sign({ id }, jwtconfig.refresh, expiresIn);

// valid token check
const verifyToken = (token, secret, res) => {
    try {
        return jwt.verify(token, secret);
    } catch {
        res.status(500).send({ auth: false, message: 'Token is invalid.' });
    }
};

module.exports = {
    jwtconfig,
    refreshTokens,
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
};