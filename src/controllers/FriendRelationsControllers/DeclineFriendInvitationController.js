const User = require('../../models/User');
const FriendRelation = require('../../models/FriendRelation');

module.exports = {
    async store(req, res) {
        try {
            const requesterId = req.userId;
            const recipientId = req.params.recipientId;

            const friendshipDocumentRequester = await FriendRelation.findOneAndRemove(
                { requester: requesterId, recipient: recipientId }  // add status at the query later
            );
            const friendshipDocumentRecipient = await FriendRelation.findOneAndRemove(
                { recipient: requesterId, requester: recipientId }
            );
            
            if (friendshipDocumentRequester===null || friendshipDocumentRecipient===null) 
                return res.status(404).json({ error: "There's no friend request do decline." });

            const user = await User.findOneAndUpdate(
                { _id: requesterId },
                { $pull: { friendRelations: friendshipDocumentRequester._id } },
                { runValidators: true, new: true }
            );
            await User.findOneAndUpdate(
                { _id: recipientId },
                { $pull: { friendRelations: friendshipDocumentRecipient._id } },
                { runValidators: true, }
            );

            return res.json({ user, message: "Solicitação recusada." });  // Do I need to return the user?
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível recusar o pedido de amizade. Tente novamente." });
        }
    }
}