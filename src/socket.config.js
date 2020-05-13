const FriendRelation = require('./models/FriendRelation');

module.exports = function configureSocket (io, app) {
    const connectedUsers = [];

    io.on('connection', socket => {
        const { userId } = socket.handshake.query;
        connectedUsers[userId] = socket.id;

        console.log('connected ', connectedUsers);

        FriendRelation.find({ requester: userId, status: 1 }).select('requester recipient status')
            .then(pendingInvitations => {
                io.to(socket.id).emit('friend_invitation', pendingInvitations);
            })
            .catch(err => {});


        socket.on('disconnect', () => {
            delete connectedUsers.userId;
            console.log('disconnected ', connectedUsers);
        });
    });


    app.use((req, res, next) => {
        req.io = io;
        req.connectedUsers = connectedUsers;
    
        return next();
    });

}