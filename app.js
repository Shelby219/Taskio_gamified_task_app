const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRouter = require('./routes/posts_routes');
const passport = require("passport")
const pageRouter = require("./routes/page_routes");
const authRouter = require("./routes/auth_routes");
const exphbs = require('express-handlebars');
const rememberMe = require('passport-remember-me')
const cookieParser = require('cookie-parser')




const port = process.env.port || 3009;
// If we are not running in production, load our local .env
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}



const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({
    extended:true   
}));


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


app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');


require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));


app.use('/posts', postRouter);
app.use('/user', authRouter);
app.use('/', pageRouter);


app.listen(port, () => {
    console.log(`Blog express app listening on port ${port}`);
});

