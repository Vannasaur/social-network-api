const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const { format_date } = require('../utils/helpers');

// Schema to create Thought model
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: [280, 'Uh-oh, too many characters!'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAt => format_date (createdAt)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// virtual property 'reactionCount' that gets the amount of friends per user
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

// initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;