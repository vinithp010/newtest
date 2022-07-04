const mongoose = require("mongoose"),
Schema = mongoose.Schema

const User = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        enum: [1,0],
        default: 1  
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
        required: true
    },
    profilepic: {
        type: String
    },
    otp: {
        type: String,
        default: "expired"
    },
    otpTime: {
        type: Number
    },
    verified: {
        type: Boolean,
        default: false
    },
    refreshtoken: {
        type: String,
        default: "expired"
    }

}, {
    timestamps: true,
});
module.exports = mongoose.model("User", User)
