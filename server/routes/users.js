// const { check, validationResult } = require('express-validator/check');
// const { matchedData, sanitize } = require('express-validator/filter');

let users = [];

module.exports = {
    addUser(req, res) {
        users.push(req.body);
        res.sendStatus(201);
        console.log(users);
    },
    deleteUser(req, res) {

    },
    updateUser(req, res) {

    }
};