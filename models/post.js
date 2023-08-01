const mongoose = require('mongoose');

//schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type:String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
},{
    timestamps: true,
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals: true
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post