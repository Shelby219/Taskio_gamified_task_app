const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Post schema
const Task = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    create_date: {
        type: Date,
        required: true
    },
    modified_date: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: String
});

module.exports = mongoose.model('Task', Task);

