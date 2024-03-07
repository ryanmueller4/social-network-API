const { User, Thought } = require('../models');

module.exports = {
    // Thought queries
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
                .select('-__v');

            res.json(thoughts);

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID!' });
            };

            res.json(thought);

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thought._id } },
                { new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'Thought created but there is no user with that ID!' });
            };

            res.json(thought);

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true },
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID!' });
            };

            res.json(thought);

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID!' });
            };

            res.json({ message: 'Thought deleted!' });

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // Reaction queries
    async addReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true },
            ).select('-__v');

            if (!reaction) {
                return res.status(404).json({ message: 'No thought with that ID!' });
            };

            res.json(reaction)

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: {reactionId: req.params.reactionId} } },
                { new: true },
            ).select('-__v');

            if (!reaction) {
                return res.status(404).json({ message: 'Either no thought or reaction with that ID!' });
            };

            res.json(reaction)

        } catch (err) {
            return res.status(500).json(err);
        }
    },
};