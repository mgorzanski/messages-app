const ObjectId = require('mongodb').ObjectId;

module.exports = {
    getThreads(req, res, db) {
        db.collection('users').find({ _id: ObjectId(req.params.userId)}, { threads: 1, _id: 0 }).toArray((error, result) => {
        	if (error) res.send(500);
        	if (result.threads && result.threads.length) {
	        	for (let i = 0; i < result.threads; i++) {
	        		db.collection('threads').find({ _id: ObjectId(result.threads[i])}).limit(1).toArray((error, result) => {
	        			if (error) res.send(500);
	        			res.status(200).send(result);
	        		});
	        	}
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
    }
}