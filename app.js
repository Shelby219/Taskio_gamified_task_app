const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require("passport")
const exphbs = require('express-handlebars');
const rememberMe = require('passport-remember-me')
const cookieParser = require('cookie-parser')

const taskRouter = require('./routes/tasks_routes');
const pageRouter = require("./routes/page_routes");
const authRouter = require("./routes/auth_routes");





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



app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



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


app.use('/tasks', taskRouter);
app.use('/user', authRouter);
app.use('/', pageRouter);


app.listen(port, () => {
    console.log(`Task express app listening on port ${port}`);
});
