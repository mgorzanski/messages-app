const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('./config');
const verifyToken = require('./verifyToken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

MongoClient.connect(config.mongodb, (err, db) => {
    if (err) return process.exit(1);
    console.log('Connected successfully to MongoDB');

    db = db.db('messages-app');
    
    app.get('/', (req, res) => {
        res.sendStatus(200);
    });

    app.post('/users', verifyToken, routes.users.addUserValidations, (req, res) => routes.users.addUser(req, res, db));
    app.post('/auth/login', routes.auth.authenticateUserValidations, (req, res) => routes.auth.authenticateUser(req, res, db));
});

app.listen(3000, '', () => {
    console.log('Server running at: http://localhost:3000');
});