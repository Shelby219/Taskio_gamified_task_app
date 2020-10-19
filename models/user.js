const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    avatar: {
        type: String
    }


});
User.plugin(require('mongoose-bcrypt'));
module.exports = mongoose.model('user', User);