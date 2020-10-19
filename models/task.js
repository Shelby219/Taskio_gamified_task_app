const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Post schema
const Task = new Schema({
    name: {
        type: String
       
    },
    description: {
        type: String
        
    },
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    create_date: {
        type: Date
    
    },
    modified_date: {
        type: Date
      
    },
    due_date: {
        type: Date
    },
    completed: {
        type: Boolean,
        default: false
    },
    repeating: {
        type: Boolean,
        default: false
    },
    category: {
        type: String
      }
});

module.exports = mongoose.model('Task', Task);

