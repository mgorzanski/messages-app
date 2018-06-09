const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('./config');
const verifyToken = require('./verifyToken');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socket = require('./socket');

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
    app.post('/auth/register', routes.auth.registerUserValidations, (req, res) => routes.auth.registerUser(req, res, db));
    app.post('/auth/forgot-password', routes.auth.forgotPasswordValidations, (req, res) => routes.auth.forgotPassword(req, res, db));
    app.post('/auth/logout', verifyToken, (req, res) => routes.auth.logout(req, res));

    //User messages routes
    app.get('/users/:userId/messages/threads', verifyToken, (req, res) => routes.users.messages.getThreads(req, res, db));
    app.post('/users/:userId/messages/threads', verifyToken, (req, res) => routes.users.messages.createThread(req, res, db));
    //app.put('/users/:userId/messages/threads/:threadId', verifyToken, (req, res) => routes.users.messages.updateThread(req, res, db));
    app.get('/users/:userId/messages/threads/:threadId', verifyToken, (req, res) => routes.users.messages.getMessagesFromThread(req, res, db));
    app.delete('/users/:userId/messages/threads/:threadId', verifyToken, (req, res) => routes.users.messages.deleteThread(req, res, db));
    app.put('/users/:userId/messages/threads/:threadId/add/:userToAddId', verifyToken, (req, res) => routes.users.messages.addUserToThread(req, res, db));
    app.put('/users/:userId/messages/threads/:threadId/remove/:userToRemoveId', verifyToken, (req, res) => routes.users.messages.removeUserFromThread(req, res, db));

    //User data routes
    app.get('/users/:userId/contacts', verifyToken, (req, res) => routes.users.contacts.getContacts(req, res, db));
    app.get('/users/:userId/contacts/:contactId', verifyToken, (req, res) => routes.users.contacts.getThreadIdByContactId(req, res, db));
    app.delete('/users/:userId/contacts/:contactId', verifyToken, (req, res) => routes.users.contacts.deleteContact(req,res, db));
    app.get('/users/:userId/contacts/invitations', verifyToken, (req, res) => routes.users.contacts.getInvitations(req, res, db));
    app.put('/users/:userId/contacts/invitations/:inviterId', verifyToken, (req, res) => routes.users.contacts.acceptInvitation(req, res, db));
    app.put('/users/:userId/contacts/invitations', verifyToken, (req, res) => routes.users.contacts.sendInvitation(req, res, db));
    app.delete('/users/:userId/contacts/invitations/:inviterId', verifyToken, (req, res) => routes.users.contacts.declineInvitation(req, res, db));
    app.post('/users/:userId/contacts/search', verifyToken, (req, res) => routes.users.contacts.searchUsers(req, res, db));

    //User profile routes
    // app.get('/users/:userId/profile', verifyToken, (req, res) => routes.users.profile.getProfile(req, res, db));
    // app.put('/users/:userId/profile', verifyToken, routes.users.profile.updateProfileValidations, (req, res) => routes.users.profile.updateProfile(req, res, db));

    //Additional
    app.get('/app/informations', (req, res) => routes.app.informations(req, res, db));

    //Socket
    socket(io, db);
});

http.listen(3000, '', () => {
    console.log('Server running at: http://localhost:3000');
});
