const User = require('../models/User');
const FriendRelation = require('../models/FriendRelation');

// gust4:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjU2N2ZhODdiYTdkMjcwYzQzOGUyNiIsImlhdCI6MTU4ODk0Njk2OH0.8V0GpyoiAjhrLhetvHT_8MH6KEBgZep_BWd7tn5JMNw
// joao: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjU2ODExODdiYTdkMjcwYzQzOGUyNyIsImlhdCI6MTU4OTIzMjk0Mn0.oU2MaazIT4FjCwa8-fho-ita3SysAW15x-GBqWXJ6Ew

module.exports = {
   
    async store(req, res) {
        try{
            const requesterId = req.userId;
            const { userName } = req.query;

            // Check if the user to add exists
            const recipientUser = await User.findOne({ userName }).select('_id');
            if (recipientUser===null) return res.status(404).json({ error: 'Usuário não encontrado.' });
            
            // Check if the user to add is the same user invinting
            const recipientId = recipientUser._id;
            
            if (recipientId==requesterId) return res.status(400).json({ error: "Não é possível adicionar a sí mesmo."});

            // Check if the user to add is already a friend or invited
            const friendshipBetweenUsers = await FriendRelation.findOne({ requester: requesterId, recipient: recipientId });

            if (friendshipBetweenUsers!=null) return res.status(400).json({ error: "Já existe uma solicitação pendente ou o usuário já é seu amigo." });

            // Continue the invitation
            const friendshipDocumentRequester = await FriendRelation.findOneAndUpdate(
                { requester: requesterId, recipient: recipientId },
                { $set: { status: 0 } },
                { new: true, upsert: true, runValidators: true },
            );
            const friendshipDocumentRecipient = await FriendRelation.findOneAndUpdate(
                { recipient: requesterId, requester: recipientId },
                { $set: { status: 1 } },
                { new: true, upsert: true, runValidators: true },
            );

            const user = await User.findOneAndUpdate(
                { _id: requesterId },
                { $push: { friendRelations: friendshipDocumentRequester._id } },
                { runValidators: true, new: true, upsert: true }
            );
            await User.findOneAndUpdate(
                { _id: recipientId },
                { $push: { friendRelations: friendshipDocumentRecipient._id } },
                { runValidators: true, upsert: true }
            );

            // Socket
            const ownerSocketRecipient = req.connectedUsers[recipientId];
            
            if (ownerSocketRecipient) {
                req.io.to(ownerSocketRecipient).emit('friend_invitation', {message: "New invitation"});
            }

            return res.json({ user, message: "Solicitação enviada com sucesso." });  // do I need to return the user?
        } catch (err) {
            console.log(err);
            
            return res.status(400).json({ message: "Erro ao enviar solicitação de amizade. Tente novamente." });
        } 
    },

    
    
}