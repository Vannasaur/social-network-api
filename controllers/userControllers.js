const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find()
                .populate('thoughts')
                .populate('friends');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('thoughts')
                .populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create new user
    async createUser(req, res) {
        try {
            const createUser = await User.create({
                username: req.body.username,
                email: req.body.email
            });
            res.json(createUser);
            console.log('User successfully created!');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update user
    async updateUser(req, res) {
        try {
            const filter = { _id: req.params.userId };
            const update = { $set: req.body };

            const userUpdate = await User.findOneAndUpdate(
                filter,
                update,
                { runValidators: true, new: true }
            )
                .populate('thoughts')
                .populate('friends')

            if (!userUpdate) {
                return res.status(404).json({ message: 'No user found with this ID' })
            }

            res.status(200).json(userUpdate);
            console.log('User successfully updated!');
        } catch (err) {
            console.log('Uh-oh, something went wrong');
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    // delete user
    async deleteUser(req, res) {
        try {
            const findUsertoDelete = await User.findById(req.params.userId);
            // delete thoughts created by deleted user
            const deleteThoughts = await Thought.deleteMany({ username: findUsertoDelete.username });
            const userDelete = await User.findOneAndDelete({ _id: req.params.userId });


            if (!userDelete) {
                return res.status(404).json({ message: 'No user found with this ID' })
            }

            res.status(200).json(userDelete);
            console.log('User successfully deleted.');
        } catch (err) {
            console.log('Uh-oh, something went wrong');
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    // add friend
    async addFriend(req, res) {
        try {
            const filterOne = { _id: req.params.userId };
            const updateOne = { $push: { friends: req.params.friendId } };

            const findFriendtoAdd = await User.findOneAndUpdate(
                filterOne,
                updateOne,
                { new: true }
            )
                .populate('thoughts')
                .populate('friends');

            const filterTwo = { _id: req.params.friendId };
            const updateTwo = { $push: { friends: req.params.userId } };

            const addFriendBack = await User.findOneAndUpdate(
                filterTwo,
                updateTwo,
                { new: true }
            )
                .populate('thoughts')
                .populate('friends');

            const friendsAdded = { findFriendtoAdd, addFriendBack }

            if (!findFriendtoAdd) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json(friendsAdded);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // remove friend
    async removeFriend(req, res) {
        try {
            const filterOne = { _id: req.params.userId };
            const updateOne = { $pull: { friends: req.params.friendId } };

            const removeFriend = await User.findOneAndUpdate(
                filterOne,
                updateOne,
                { new: true }
            )
                .populate('thoughts')
                .populate('friends')

            const filterTwo = { _id: req.params.friendId };
            const updateTwo = { $pull: { friends: req.params.userId } };

            const removeFriendBack = await User.findOneAndUpdate(
                filterTwo,
                updateTwo,
                { new: true }
            )
                .populate('thoughts')
                .populate('friends')

                const friendsRemoved = { removeFriend, removeFriendBack }

            if (!removeFriend) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json(friendsRemoved);
        } catch (err) {
            res.status(500).json(err)
        }
    }
};
