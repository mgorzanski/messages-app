const { check, validationResult } = require('express-validator/check');
//const { matchedData, sanitize } = require('express-validator/filter');

module.exports = {
    addUser(req, res, db) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.mapped() });
        }

        const collection = db.collection('users');

        collection.insertOne({username: req.body.username, fullName: req.body.fullName, email: req.body.email, password: req.body.password}, (error, result) => {
            if (error) return process.exit(1);
            console.log('Added new user');
        });
        res.sendStatus(201);
    },
    addUserValidations: [
        check('username', "Invalid username").exists(),
        check('fullName', "Invalid full name").exists(),
        check('email', "Invalid email").isEmail(),
        check('password', "Invalid password").exists().custom((value, {req, loc, path}) => {
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