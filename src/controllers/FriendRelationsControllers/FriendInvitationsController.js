const FriendRelation = require('../../models/FriendRelation');

module.exports = {
    async index(req, res) {
        try {
            const userId = req.userId;
            const { page=1 } = req.query;
            
            const invitations = await FriendRelation.paginate(
                { requester: userId, status: 1 },
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

            return res.json({ invitations })


        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível listar os convites pendentes." });
        }
    },
    
}