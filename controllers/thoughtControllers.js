const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
                .populate('reactions');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get one thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .populate('reactions');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create thought
    async createThought(req, res) {
        try {
            const createThought = await Thought.create(req.body);
            res.json(createThought);
            console.log('Thought created successfully!')
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // update thought
    async updateThought(req, res) {
        try {
            const filter = { _id: req.params.thoughtId };
            const update = { $set: req.body };

            const updateThought = await Thought.findOneAndUpdate(
                filter,
                update,
                { new: true }
            )
                .populate('reactions')

            if (!updateThought) {
                res.status(404).json({ message: 'No thought with that id' });
            }

            res.json(updateThought);
            console.log('Thought updated successfully!');
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // delete thought
    async deleteThought(req, res) {
        try {
            const deleteThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!deleteThought) {
                res.status(404).json({ message: 'No thought with that id' });
            }

            res.json(deleteThought);
            console.log('Thought deleted successfully!');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create reaction
    async createReaction(req, res) {
        try {
            const filter = { _id: req.params.thoughtId };
            const update = { $push: { reactions: req.body } };

            const createReaction = await Thought.findOneAndUpdate(
                filter,
                update,
                { new: true }
            );

            if (!createReaction) {
                res.status(400).json({ message: 'Reaction unable to be created'});
            }

            res.json(createReaction);
            console.log('Reaction created successfully!');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove reaction
    async removeReaction(req, res) {
        try {
            const filter = { _id: req.params.thoughtId };
            const update = { $pull: { reactions: { reactionId: req.params.reactionId } } };

            const removeReaction = await Thought.findOneAndUpdate(
                filter,
                update,
                { new: true }
            );

            if (!removeReaction) {
                res.status(404).json({ message: 'No reaction with that ID'});
            }

            res.json(removeReaction);
            console.log('Reaction removed successfully!');
        } catch (err) {
            res.status(500).json(err)
        }
    }
};