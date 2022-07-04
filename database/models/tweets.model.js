const mongoose = require("mongoose"),
Schema = mongoose.Schema

const Tweets = new Schema({
    userId: {
        type: String,
        required: true
    },
    tweet: {
        type: String,
        required: true
    },
    hashTag: {
        type: Array,
    },
    status: {
        type: Number,
        enum: [1,0],
        default: 1
    }
}, {
    timestamps: true,
});
module.exports = mongoose.model("Tweets", Tweets)
