const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');

module.exports = {
  getProfile(req, res, db) {
    db.collection('users').findOne({ _id: ObjectId(req.params.userId) }, { username: 1, fullName: 1, email: 1 }, (error, result) => {
      if (error) res.sendStatus(500);
      res.status(200).send(result);
    });
  },

  updateProfile(req, res, db) {
    const emailAlreadyUsedPromise = db.collection('users').findOne({ email: req.body.email });
    const usernameAlreadyUsedPromise = db.collection('users').findOne({ username: req.body.username });

    const updateFullName = () => db.collection('users').updateOne({ _id: ObjectId(req.params.userId) }, { $set: { fullName: req.body.fullName } });
    const updateEmail = () => db.collection('users').updateOne({ _id: ObjectId(req.params.userId) }, { $set: { email: req.body.email } });
    const updateUsername = () => db.collection('users').updateOne({ _id: ObjectId(req.params.userId) }, { $set: { username: req.body.username } });
    const updatePassword = (password) => db.collection('users').updateOne({ _id: ObjectId(req.params.userId) }, { $set: { password: password } });

    const passwordChanged = req.body.password !== null || req.body.repeatPassword !== null ? true : false;
    const passwordMatches = req.body.password === req.body.repeatPassword ? true : false;

    let message = 'Account has been successfully updated';

    let cannotUpdateEmail = false;
    let cannotUpdateUsername = false;

    Promise.all([emailAlreadyUsedPromise, usernameAlreadyUsedPromise])
      .then((values) => {
        const emailAlreadyUsed = values[0];
        const usernameAlreadyUsed = values[1];

        if (emailAlreadyUsed._id !== undefined && emailAlreadyUsed._id.toString() !== req.params.userId) {
          message = 'Email has been already used';
          cannotUpdateEmail = true;
        } else if (usernameAlreadyUsed._id !== undefined && usernameAlreadyUsed._id.toString() !== req.params.userId) {
          message = 'Username has been already used';
          cannotUpdateUsername = true;
        }
      })
      .catch(() => {})
      .then(() => {
        if (!cannotUpdateEmail && !cannotUpdateUsername) {
          if (passwordChanged) {
            if (passwordMatches) {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) res.send(500);
                updatePassword(hash);
              });
            } else {
              message = 'Passwords are different';
            }
          }
          updateFullName();
          updateEmail();
          updateUsername();
        }

        res.status(200).send({ message });
      });
  }
};