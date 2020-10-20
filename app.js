const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require("passport")
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession);
const methodOverride = require('method-override')
const fetch = require('node-fetch')

const taskRouter = require('./routes/tasks_routes');
const pageRouter = require("./routes/page_routes");
const authRouter = require("./routes/auth_routes");


//
const port = process.env.PORT || 3009;
// If we are not running in production, load our local .env
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.json());

app.use(express.urlencoded({
    extended:true   
}));
//app.use(fetch)

// serve files from the public directory


const path = require('path');
app.set('views', path.join(__dirname, '/views'));

app.set('view engine', 'pug');
// static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
    secret: "dogs",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


const dbConn =  process.env.MONGODB_URI ||  'mongodb://localhost/task_app'

mongoose.connect(
    dbConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) {
            console.log(`Error connecting to database ${dbConn}`, err);
        } else {
            console.log('Connected to database!');
        }
});


require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());



app.use('/tasks', taskRouter);
app.use('/user', authRouter);
app.use('/', pageRouter);


app.listen(port, () => {
    console.log(`Task express app listening on port ${port}`);
});
