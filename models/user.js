const mongoose = require('mongoose')
const crypto = require('crypto')

//schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
  
    password: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
 
 
    profilePicture: {
        type: String,
        default: "",
    },
 

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],

}, {
    timestamps: true,
})




//compile schema to model

const User = mongoose.model("User", userSchema)

module.exports = User;