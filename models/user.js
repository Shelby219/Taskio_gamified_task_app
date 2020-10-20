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
        type: String,
        default: "http://www.avatarsinpixels.com/minipix/eyJIYWlyTG93ZXIiOiI4IiwiTW91dGgiOiI0IiwiUGFudHMiOiIxIiwiVG9wIjoiMTAiLCJIYWlyIjoiMjIiLCJleWVzVG9uZSI6IjIyYjJjOCIsImhhaXJUb25lIjoiY2Q4MzVkIiwiaGFpclRvbmUyIjoiOGRkNjhkIiwicGFudHNUb25lIjoiMjU2Y2QzIiwicGFudHNUb25lMiI6ImUzMDRjZCIsInRvcFRvbmUiOiI0NDE1MzYiLCJ0b3BUb25lMiI6ImQyNTVkNiJ9;/5/show.png"
    }


});
User.plugin(require('mongoose-bcrypt'));
module.exports = mongoose.model('user', User);