const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.post('/users', routes.users.addUser);

app.listen(3000, '', () => {
    console.log('Server running at: http://localhost:3000');
});