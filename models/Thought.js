const { Schema, model, Types } = require("mongoose");

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
);

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method
        },
    }
)

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;