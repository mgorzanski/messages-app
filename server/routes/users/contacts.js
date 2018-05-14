const ObjectId = require('mongodb').ObjectId;

module.exports = {
	getContacts(req, res, db) {
		db.collection('users').find({ _id: ObjectId(req.params.userId) }).project({ contacts: 1 }).toArray((error, contacts) => {
			if (error) res.sendStatus(500);
			const contactsDetails = new Array();
			(async function() {
				for (let contact of contacts) {
					const details = await db.collection('users').findOne({ _id: ObjectId(contact._id)});
					contactsDetails.push(details);
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

	getInvitations(req, res, db) {
		db.collection('users').find({ _id: ObjectId(req.params.userId) }).project({ invitations: 1 }).toArray((error, invitations) => {
			if (error) res.send(500);
			res.status(200).send(invitations);
		});
	},

	acceptInvitation(req, res, db) {
		db.collection('users').find({ _id: ObjectId(req.params.userId), invitations: { $elemMatch: { $in: [ObjectId(req.params.inviterId)]}}}).toArray((error, result) => {
			if (error) res.sendStatus(500);
			if (result.length) {
				db.collection('users').update(
					{ _id: ObjectId(req.params.userId) },
					{ $pull:
						{ "invitations":
							ObjectId(req.params.inviterId)
						}
					}, (error) => {
						if (error) res.send(500);
						db.collection('users').update(
							{ _id: ObjectId(req.params.userId) },
							{ $push:
								{ "contacts":
									ObjectId(req.params.inviterId)
								}
							}, (error) => {
								if (error) res.send(500);
								db.collection('users').update(
									{ _id: ObjectId(req.params.inviterId) },
									{ $push:
										{ "contacts":
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
						{ "invitations":
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
			if (!result.length) {
				db.collection('users').update(
					{ _id: ObjectId(req.body.userToInviteId) },
					{ $push:
						{ "invitations":
							ObjectId(req.params.userId)
						}
					}, (error, result) => {
						if (error) res.send(500);
						res.status(200).send({message: "Invitation has been sent"}, result);
					}
				);
			} else {
				res.sendStatus(403);
			}
		});
	}
};