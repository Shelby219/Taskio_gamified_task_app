const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRouter = require('./routes/posts_routes');

const port = process.env.port || 3009;
// If we are not running in production, load our local .env
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}



const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbConn =  process.env.MONGODB_URI ||  'mongodb://localhost/task_app'

mongoose.connect(
    dbConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database!');
        }
    });

app.use('/posts', postRouter);

app.listen(port, () => {
    console.log(`Blog express app listening on port ${port}`);
});