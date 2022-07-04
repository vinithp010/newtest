const mongoose = require("mongoose"),
Schema = mongoose.Schema

const Follow = new Schema({
    userId: {
        type: String,
        required: true
    },
    followId: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});
module.exports = mongoose.model("Follow", Follow)
