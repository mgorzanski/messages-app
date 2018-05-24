const ObjectId = require('mongodb').ObjectId;

module.exports = (io, db) => {
    io.on('connection', (socket) => {
        // console.log('User connected');
        // socket.on('disconnect', function() {
        //     console.log('User disconnected');
        // });

        socket.on('send-message', (data) => {
            db.collection('threads').updateOne(
                { _id: ObjectId(data.threadId) },
                { $push: 
                    { 'messages':
                        {
                            _id: ObjectId(),
                            userId: ObjectId(data.userId),
                            date: new Date(),
                            message: data.message,
                            unreadedBy: []
                        }
                    }
                }, (error) => {
                    if (error) console.log(error);
                    console.log(`New message hast been sent to the thread of ID ${data.threadId} with a content: "${data.message}" from a user of ID ${data.userId}.`);
                }
            );

            db.collection('users').findOne({ _id: ObjectId(data.userId) }, (error, user) => {
                io.emit(`new-message-threadId-${data.threadId}`, { userId: user._id, fullName: user.fullName, message: data.message });
            });
        });
    });
};