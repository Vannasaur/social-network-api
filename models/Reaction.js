const { Schema, Types } = require('mongoose');
const { format_date } = require('../utils/helpers');

// Schema for reaction (subdocument to Thought model)
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max: [280, 'Uh-oh, too many characters!'],
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAt => format_date (createdAt)
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;