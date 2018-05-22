const ObjectId = require('mongodb').ObjectId;

module.exports = {
	getContacts(req, res, db) {
		db.collection('users').find({ _id: ObjectId(req.params.userId) }).project({ contacts: 1 }).toArray((error, results) => {
			if (error) res.sendStatus(500);
			const contactsDetails = new Array();
			(async function() {
				if (results[0].contacts.length) {
					for (let contact of results[0].contacts) {
						const details = await db.collection('users').findOne({ _id: ObjectId(contact)});
						contactsDetails.push(details);
					}
				}
			})().then(() => res.status(200).send(contactsDetails));
		});
	},

	searchUsers(req, res, db) {
		if (req.body.searchQuery === '') res.sendStatus(200);
		else {
			db.collection('users').find({ $or: [ { username: { $regex: req.body.searchQuery, $options: 'i' } }, { fullName: { $regex: req.body.searchQuery, $options: 'i' } } ] }).toArray((error, results) => {
				if (error) res.sendStatus(500);
				res.status(200).send(results);
			});
		}
	},

	getUserDetails(id, db) {
		return new Promise((resolve, reject) => {
			db.collection('users').find({ _id: ObjectId(id) }).toArray((error, results) => {
				if (error) reject('Cannot get user details');
				resolve(results[0]);
			});
		});
	},

	getInvitations(req, res, db) {
		db.collection('users').find({ _id: ObjectId(req.params.userId) }).project({ invitations: 1, _id: 0 }).toArray((error, results) => {
			if (error) res.send(500);
			const users = new Array();
			for (let i = 0; i < results[0].invitations.length; i++) {
				users.push(this.getUserDetails(results[0].invitations[i], db));
			}
			Promise.all(users)
					.then((users) => {
						res.status(200).send({ invitations: users });
					})
					.catch(() => {
						res.status(200).send({ invitations: [] });
					})
					.catch((error) => {
						res.status(500).send(error);
					});
		});
	},

	acceptInvitation(req, res, db) {
		db.collection('users').find({ _id: ObjectId(req.params.userId), invitations: { $elemMatch: { $in: [ObjectId(req.params.inviterId)]}}}).toArray((error, result) => {
			if (error) res.sendStatus(500);
			if (result.length) {
				db.collection('users').update(
					{ _id: ObjectId(req.params.userId) },
					{ $pull:
						{ 'invitations':
							ObjectId(req.params.inviterId)
						}
					}, (error) => {
						if (error) res.send(500);
						db.collection('users').update(
							{ _id: ObjectId(req.params.userId) },
							{ $push:
								{ 'contacts':
									ObjectId(req.params.inviterId)
								}
							}, (error) => {
								if (error) res.send(500);
								db.collection('users').update(
									{ _id: ObjectId(req.params.inviterId) },
									{ $push:
										{ 'contacts':
											ObjectId(req.params.userId)
										}
									}, (error) => {
										if (error) res.send(500);
										res.status(200).send('Invitation accepted');
									}
								);
							}
						);
					}
				);
			} else {
				res.sendStatus(403);
			}
		});
	},

	declineInvitation(req, res, db) {
		db.collection('users').find({ _id: ObjectId(req.params.userId), invitations: { $elemMatch: { $in: [ObjectId(req.params.inviterId)]}}}).toArray((error, result) => {
			if (error) res.sendStatus(500);
			if (result.length) {
				db.collection('users').update(
					{ _id: ObjectId(req.params.userId) },
					{ $pull:
						{ 'invitations':
							ObjectId(req.params.inviterId)
						}
					}, (error) => {
						if (error) res.send(500);
						res.status(200).send('Invitation declined');
					}
				);
			} else {
				res.sendStatus(403);
			}
		});
	},

	sendInvitation(req, res, db) {
		db.collection('users').find({ _id: ObjectId(req.body.userToInviteId), invitations: { $elemMatch: { $in: [ObjectId(req.params.userId)]}}}, {_id: 1}).limit(1).toArray((error, result) => {
			if (error) res.sendStatus(500);
			console.log(result);
			if (!result.length) {
				db.collection('users').update(
					{ _id: ObjectId(req.body.userToInviteId) },
					{ $push:
						{ 'invitations':
							ObjectId(req.params.userId)
						}
					}, (error) => {
						if (error) res.sendStatus(500);
						res.status(200).send({ message: 'Invitation has been sent', success: true });
					}
				);
			} else {
				res.status(200).send({ message: 'Invitation already sent', success: false });
			}
		});
	}
};