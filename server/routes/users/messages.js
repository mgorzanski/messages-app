const ObjectId = require('mongodb').ObjectId;

module.exports = {
    getThreads(req, res, db) {
      db.collection('threads').find({ users: { $elemMatch: { $in: [ObjectId(req.params.userId)] } } }).toArray((error, result) => {
      	if (error) res.sendStatus(500);
      	if (result && result.length) {
	      	(async function () {
	      		let threads = new Array();
	      		for (const thread of result) {
	      			if (thread.users.length === 2) {
	      				for (const user of thread.users) {
	      					if (user.toString() !== req.params.userId.toString()) {
	      						const findUser = await db.collection('users').find({ _id: ObjectId(user) }).limit(1).toArray();
	      						threads.push({ _id: thread._id, name: findUser[0].fullName, userId: findUser[0]._id });
	      					}
	      				}
	      			} else {
	      				threads.push({ _id: thread._id, name: thread.name, userId: null });
	      			}
	      		}
	      		return threads;
	      	})().then((threads) => res.status(200).send(threads)).catch((e) => {
	      		console.log(e)
	      		res.sendStatus(500);
	      	});
	  	} else {
	  		res.status(200).send('No threads');
	  	}
      });
    },

    createThread(req, res, db) {
    	db.collection('threads').find(
    		{ users: { $elemMatch: { $in:
    			[
	    			ObjectId(req.body.firstUserId),
	    			ObjectId(req.body.secondUserId)
	    		]
	    	}}}
	    ).limit(1).toArray((error, result) => {
			if (error) res.sendStatus(500);
			if (!result.length) {
				const thread = {
		    		name: '',
		    		thumbnail: '',
		    		createdAt: new Date(),
		    		users: [
		    			ObjectId(req.body.firstUserId),
		    			ObjectId(req.body.secondUserId)
		    		],
		    		messages: []
		    	}

		    	db.collection('threads').insertOne(thread, (error, result) => {
		    		if (error) res.send(500);
		    		const attachThread = { 
		    			$push: { "threads":
		    				ObjectId(thread._id)
		    			}
		    		};

					db.collection('users').updateOne(
			    		{ _id: ObjectId(req.body.firstUserId)},
			    		attachThread, (error) => {
			    			if (error) res.send(500);
			    			db.collection('users').updateOne(
			    				{ _id: ObjectId(req.body.secondUserId)},
			    				attachThread, (error) => {
			    					if (error) res.send(500);
			    					res.status(201).send('Thread created');
			    				}
			    			);
			    		}
			    	);
		    	});
			} else {
				res.sendStatus(403);
			}
		});
    },

    updateThread(req, res, db) {
    	db.collection('threads').updateOne(
    		{ _id: ObjectId(req.params.threadId) },
    		{ $set: {
    			name: req.body.name,
    			thumbnail: req.body.name,

    		}}
    	);
    },

    deleteThread(req, res, db) {
    	db.collection('threads').find({ _id: ObjectId(req.params.threadId) }, { users: 1, _id: 1 }).limit(1).toArray((error, thread) => {
    		if (error) res.sendStatus(500);
    		if (thread && thread.length) {
    			db.collection('threads').deleteOne({ _id: ObjectId(req.params.threadId) }, (error) => {
		    		if (error) res.sendStatus(500);
		    		for (let i = 0; i < thread[0].users.length; i++) {
		    			db.collection('users').updateOne(
		    				{ threads: { $elemMatch: { $in: [ObjectId(req.params.threadId)] } } },
		    				{ $pull: { "threads":
			    				ObjectId(req.params.threadId)
			    			}}, (error) => {
			    				if (error) res.send(500);
			    				res.status(200).send('Thread deleted');
			    			}
		    			);
		    		}
		    	});
    		} else {
    			res.sendStatus(403);
    		}
    	});
    },

    addUserToThread(req, res, db) {

    },

    removeUserFromThread(req, res, db) {

    }
}