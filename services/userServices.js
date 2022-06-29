const User = require('../models/userModel');
const DeliveryMan = require("../models/serviceManModel");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// create new user
exports.createUser = (req, res, next) => {



    bcrypt.hash(req.body.password, 10)


        .then(hash => {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                role: req.body.role,
                registerDate: new Date()
            });

            

            // if role is serviceman, create new serviceman
            if (req.body.role === "serviceman") {
                const serviceMan = new ServiceMan({
                    _id: new mongoose.Types.ObjectId(),
                    userId: user._id,
                });
                serviceMan.save()
                    .then(result => {
                        console.log(result);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "User created!",
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: "User not created!",
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

// update user
exports.updateUser = (req, res, next) => {
    User.updateOne({ _id: req.params.id }, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    })
        .then(result => {
            res.status(200).json({
                message: "User updated!",
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
// delete user 
exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: "User deleted!",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}
// get user by id
exports.getUserById = (req, res, next) => {
    User.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                message: "User found!",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
// get all users
exports.getAllUsers = async (req, res, next) => {
    await User.find()
        .then(result => {
            res.status(200).json({
                message: "Users found!",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
// login user
exports.loginUser = (req, res, next) => {
    console.log(req.body.email);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed!"
                });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(result => {
                    if (!result) {
                        return res.status(401).json({
                            message: "Auth failed!"
                        });
                    }
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id,
                        role: user.role
                    },
                        "secret",
                        {
                            expiresIn: "12h"
                        }
                    );
                    generateToken(user, 200, res);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
// get user by email
exports.getUserByEmail = (req, res, next) => {
    User.findOne({ email: req.params.email })
        .then(result => {
            res.status(200).json({
                message: "User found!",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
// get user by role
exports.getUserByRole = (req, res, next) => {
    User.find({ role: req.params.role })
        .then(result => {
            res.status(200).json({
                message: "Users found!",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
// get user by register date
exports.getUserByRegisterDate = (req, res, next) => {
    User.find({ registerDate: req.params.registerDate })
        .then(result => {
            res.status(200).json({
                message: "Users found!",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
// get user by firstname
exports.getUserByFirstname = (req, res, next) => {
    User.find({ firstname: req.params.firstname })
        .then(result => {
            res.status(200).json({
                message: "Users found!",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
// get user by lastname
exports.getUserByLastname = (req, res, next) => {
    User.find({ lastname: req.params.lastname })
        .then(result => {
            res.status(200).json({
                message: "Users found!",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};


// generate token
function generateToken(user, statusCode, res) {
    const token = jwt.sign({
        email: user.email,
        userId: user._id,
        role: user.role
    },
        "secret",
        {
            expiresIn: "12h"
        }
    );
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    res.cookie("jwt", token, cookieOptions);
    res.status(statusCode).json({
        status: "success",
        token: token,
        userId: user._id
    });
}
