const mongoose = require('mongoose');
const User = require('../../models/User');
const FriendRelation = require('../../models/FriendRelation');


module.exports = {
    async index(req, res) {
        try {
            const userId = req.userId;
            const { page=1 } = req.query;

            const friends = await FriendRelation.paginate(
                { requester: userId, status: 2 },
                {
                    page,
                    limit: 15, 
                    select: 'recipient',
                    populate: {
                        path: 'recipient',
                        select: 'userName',
                    },
                },
            );

          
            return res.json({ friends })
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível listar os seus amigos." });
        }
    },

    async store(req, res) { // Send invitation to a friend
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

            // Socket
            const ownerSocketRecipient = req.connectedUsers[recipientId];
            
            if (ownerSocketRecipient) {
                req.io.to(ownerSocketRecipient).emit('friend_invitation', {message: "New invitation"});
            }

            return res.json({ message: "Solicitação enviada com sucesso." });  // do I need to return the user?
        } catch (err) {
            console.log(err);
            
            return res.status(400).json({ message: "Erro ao enviar solicitação de amizade. Tente novamente." });
        } 
    },

    async destroy(req, res) {
        try {
            const userId = req.userId;
            const { relationId } = req.params;

            const deletedFriendRelation = await FriendRelation.findByIdAndDelete(relationId);
            
            // Remove friendship from both users
            await FriendRelation.findOneAndDelete({ 
                requester: deletedFriendRelation.recipient,  
                recipient: userId,
            });

            return res.json({ message: "Usuário removido da lista de amigos." });   
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Erro ao tentar remover o amigo" });
        }
    }
    
    
}