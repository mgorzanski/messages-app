const { check, validationResult } = require('express-validator/check');
//const { matchedData, sanitize } = require('express-validator/filter');
const bcrypt = require('bcrypt');

module.exports = {
    addUser(req, res, db) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }

        const collection = db.collection('users');

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return err;
            collection.insertOne({username: req.body.username, fullName: req.body.fullName, email: req.body.email, password: hash}, (error, result) => {
                if (error) return process.exit(1);
                console.log('Added new user');
                console.log(result);
            });
        });

        res.sendStatus(201);
    },
    addUserValidations: [
        check('username', "Invalid username").exists(),
        check('fullName', "Invalid full name").exists(),
        check('email', "Invalid email").isEmail(),
        check('password', "Invalid password").exists().custom((value, {req}) => {
            if (value !== req.body.repeatPassword) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        })
    ],
    deleteUser(req, res) {

    },
    updateUser(req, res) {

    }
};