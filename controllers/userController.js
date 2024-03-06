const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const  users = await User.find();
            res.json(users);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
                .populate('thoughts')
                .populate('friends');
                
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true },
            );

            if (!user) {
                res.status(404).json({ message: 'No user with that ID!' });
            }

            res.json(user)

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id })

            if (!user) {
                res.status(404).json({ message: 'No user with that ID!' });
            }
            // await Thought.deleteMany({ _id: { $in: user.thoughts }});
            res.json({ message: 'User deleted!' });

        } catch (err) {
            res.status(500).json(err);
        }
    },
};