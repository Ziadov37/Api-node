// security middleware
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const jwt_decode = require('jwt-decode');

// check if user is logged in
const auth = (req, res, next) => {
    // get token from header
    const token = req.cookies.jwt;
    // check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    // verify token
    try {
        const decoded = jwt_decode(token);  
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}

// check if user is admin

const admin = (req, res, next) => {
    // get token from cookies
    const token = req.cookies.jwt;
    // check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    // verify token
    try {
        const decoded = jwt_decode(token);


        if (decoded.role === 'admin') {
            next();
        }
        else {
            return res.status(401).json({ msg: 'You are not an admin' });
        }
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}

// check if user is Serviceman

const serviceman = (req, res, next) => {
    // get token from header
    const token = req.cookies.jwt;
    // check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    // verify token
    try {
        const decoded = jwt_decode(token);
        if (decoded.role === 'serviceman') {
            next();
        }
        else {
            return res.status(401).json({ msg: 'You are not a serviceman' });
        }
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}

// express validator middleware
const expressValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
        return res.status(422).json({ errors: extractedErrors });
    }
    next();
}

// export middlewares
module.exports = {
    auth,
    admin,
    serviceman,
    expressValidator
}