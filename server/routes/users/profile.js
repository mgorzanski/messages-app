const ObjectId = require('mongodb').ObjectId;

module.exports = {
  getProfile(req, res, db) {
    db.collection('users').findOne({ _id: ObjectId(req.params.userId) }, { username: 1, fullName: 1, email: 1 }, (error, result) => {
      if (error) res.sendStatus(500);
      res.status(200).send(result);
    });
  }
};