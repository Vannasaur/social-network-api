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
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
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
                { new: true }
            )
                .populate('thoughts')
                .populate('friends')

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
            const userDelete = await User.findOneAndDelete({ _id: req.params.userId });
            // delete thoughts created by deleted user
            const deleteThoughts = await Thought.deleteMany({ _id: req.params.userId })

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
            const filter = { _id: req.params.userId };
            const update = { $push: { friends: req.params.friendId } };

            const findFriendtoAdd = await User.findOneAndUpdate(
                filter,
                update,
                { new: true }
            );

            if (!findFriendtoAdd) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json(findFriendtoAdd);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // remove friend
    async removeFriend(req, res) {
        try {
            const filter = { _id: req.params.userId };
            const update = { $pull: { friends: req.params.friendId } };

            const removeFriend = await User.findOneAndUpdate(
                filter,
                update,
                { new: true }
            );

            if (!removeFriend) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json(removeFriend);
        } catch (err) {
            res.status(500).json(err)
        }
    }
};
