const { check } = require('express-validator/check');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config');

module.exports = {
    authenticateUser(req, res, db) {
        const collection = db.collection('users');
        collection.findOne({email: req.body.email}, (error, user) => {
            if (error) return process.exit(1);
            if(!user) {
                res.sendStatus(400);
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result === true) {
                        const token = jwt.sign({ id: user._id }, config.secret, {
                            expiresIn: 86400
                        });
                        res.status(200).send({ auth: true, token: token });
                    } else {
                        res.sendStatus(400);
                    }
                });
            }
        });
    },
    authenticateUserValidations: [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password').exists()
    ]
};