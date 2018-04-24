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

    //User authentication routes
    app.post('/auth/login', routes.auth.authenticateUserValidations, (req, res) => routes.auth.authenticateUser(req, res, db));
    app.post('/auth/register', routes.auth.registerUserValidations, (req, res) => routes.auth.registrerUser(req, res, db));
    app.post('/auth/forgot-password', routes.auth.forgotPasswordValidations, (req, res) => routes.auth.forgotPassword(req, res, db));
    app.post('/auth/logout', verifyToken, (req, res) => routes.auth.logout(req, res));
    
    //User data routes
    app.get('/users/:userId/contacts', verifyToken, (req, res) => routes.users.contacts.getContacts(req, res, db));
    app.put('/users/:userId/contacts/invitations/:invitationId', verifyToken, routes.users.contacts.acceptInvitationValidations, (req, res) => routes.users.acceptInvitation(req, res, db));
    app.post('/users/:userId/contacts/invitations', verifyToken, routes.users.contacts.sendInvitationValidations, (req, res) => routes.users.sendInvitation(req, res, db));
    app.delete('/users/:userId/contacts/invitations/:invitationId', verifyToken, routes.users.contacts.declineInvitationValidations, (req, res) => routes.users.declineInvitation(req, res, db));

    //User profile routes
    app.get('/users/:userId/profile', verifyToken, (req, res) => routes.users.profile.getProfile(req, res, db));
    app.put('/users/:userId/profile', verifyToken, routes.users.profile.updateProfileValidations, (req, res) => routes.users.profile.updateProfile(req, res, db));

    //Additional
    app.get('/app/informations', (req, res) => routes.app.informations(req, res, db));
});

app.listen(3000, '', () => {
    console.log('Server running at: http://localhost:3000');
});