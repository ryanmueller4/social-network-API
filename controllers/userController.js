const { User, Thought } = require('../models');

module.exports = {
    // User queries
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .select('-__v');

            res.json(users);

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('thoughts')
                .populate('friends')
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            };

            res.json(user);

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);

            res.json(user);

        } catch (err) {
            return res.status(500).json(err);
        }
    },
    
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            };

            res.json(user);

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            };

            await Thought.deleteMany({ _id: { $in: user.thoughts }});
            res.json({ message: `User and user's thoughts deleted!` });

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // Friend queries
    async addFriend(req, res) {
        try {
            const userFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true },
            ).select('-__v');

            if (!userFriend) {
                return res.status(404).json({ message: 'No user with that ID!' });
            };

            res.json(userFriend);

        } catch (err) {
            return res.status(500).json(err);
        }
    },
    
    async removeFriend(req, res) {
        try {
            const userFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true },
            ).select('-__v');

            if (!userFriend) {
                return res.status(404).json({ message: 'No user with that ID!' });
            };

            res.json(userFriend);

        } catch (err) {
            return res.status(500).json(err);
        }
    },
};