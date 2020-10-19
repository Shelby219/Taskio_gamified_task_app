const LocalStrategy = require("passport-local");
const RememberMeStrategy = require("passport-remember-me").Strategy;
const passport = require("passport");
const UserModel = require('../models/user');

//start with user end up with ID
//user ID is serialized to the session, keeping the amount of data stored within the session small
passport.serializeUser((user, done) => {
    done(null, user._id);
});

//start with ID end up with user
passport.deserializeUser((userId, done) => {
UserModel.findById(userId)
    .then((user) => done(null, user))
    .catch(done)
})


const canLogin = (user, password) => {
    if(user){
        return user.verifyPasswordSync(password) //mongoose bcrypt
    } else {
        return false
    }
}

const verifyCallback = (email, password, done) => {
UserModel.findOne({email})
.then((user) => {
    if(canLogin(user, password)){
        return done(null, user)
    } else {
        return done(null, false)
    }
})
.catch(done)
}
// this is setting passport username to email as passport local accepts username and password
const fields = { usernameField: "email"}

passport.use(new LocalStrategy(fields, verifyCallback))

passport.use(new RememberMeStrategy(
    function(token, done) {
      Token.consume(token, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
    },
    function(user, done) {
      const token = utils.generateToken(64);
      Token.save(token, { userId: user.id }, function(err) {
        if (err) { return done(err); }
        return done(null, token);
      });
    }
  ));

