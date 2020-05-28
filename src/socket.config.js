const FriendRelation = require('./models/FriendRelation');

module.exports = function configureSocket (io, app) {
    const connectedUsers = [];

    io.on('connection', socket => {
        const { userId } = socket.handshake.query;
        connectedUsers[userId] = socket.id;

        console.log('connected ', connectedUsers);
        socket.to(socket.id).emit('connect'); // Works as a flag indicating that the connection has been made and client should loadNotificationInfo

        // FriendRelation.find({ requester: userId, status: 1 }).select('requester recipient status')
        //     .then(pendingInvitations => {
        //         socket.to(socket.id).emit('friend_invitation', pendingInvitations);
        //     })
        //     .catch(err => {});
        // io.to(socket.id).emit('a', {message: 'd'});
        // socket.on('')
        socket.on('reconnected', ({ userId }) => {
            console.log('reconnected', userId );
            
            connectedUsers[userId] = socket.id;
            console.log('connected ', connectedUsers);
        });

        socket.on('disconnect', () => {
            delete connectedUsers[userId];
            console.log('disconnected ', connectedUsers);
        });
    });


    app.use((req, res, next) => {
        req.io = io;
        req.connectedUsers = connectedUsers;
    
        return next();
    });

}