const { check, assert } = require('express-validator/check');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config');

module.exports = {
    authenticateUser(req, res, db) {
        const collection = db.collection('users');
        collection.findOne({email: req.body.email}, (error, user) => {
            if (error) return process.exit(1);
            if(!user) {
                res.status(400).send({ auth: false, token: null });
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result === true) {
                        const token = jwt.sign({ id: user._id }, config.secret);
                        res.status(200).send({ auth: true, token: token, userId: user._id, username: user.username, fullName: user.fullName, email: user.email });
                    } else {
                        res.status(400).send({ auth: false, token: null });
                    }
                });
            }
        });
    },

    authenticateUserValidations: [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password').exists()
    ],

    registerUser(req, res, db) {
        //assert('passwordRepeat', 'Passwords must match').equals(req.body.password);
        const collection = db.collection('users');

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) res.send(500);
            collection.insertOne(
                {username: req.body.username, fullName: req.body.fullName, email: req.body.email, password: hash}, (error, result) => {
                    if (error) res.send(406);
                    res.status(201).send(result);
                }); 
        });
    },

    registerUserValidations: [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password cannot be empty').exists().isLength(5),
        check('username').exists(),
        check('fullName').exists()
    ],

    forgotPassword(req, res, db) {
        const collection = db.collection('users');
        
        collection.find({email: req.body.email}).limit(1).toArray((error, docs) => {
            if (error) res.send(404);
            // execute mechanism
            res.status(200).send(docs);
        });
    },

    forgotPasswordValidations: [
        check('email').exists()
    ],

    logout(req, res) {
        res.status(200).send({ auth: false, token: null });
    },
};