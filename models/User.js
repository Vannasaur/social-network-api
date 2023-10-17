const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [ /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/, 'Please enter a valid email'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// virtual property 'friendCount' that gets the amount of friends per user
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

// initialize User model
const User = model('user', userSchema);

module.exports = User;