module.exports = (io, db) => {
    io.on('connection', (socket) => {
        console.log('User connected');
        socket.on('disconnect', function() {
            console.log('User disconnected');
        });

        socket.on('send-message', function (data) {
            // db.collection('threads')
            console.log(data);
        });
    });
};