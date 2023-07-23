// paspport dependencies
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require('./keys.json');
const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
const routes = require('./routes.js');

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: keys.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

// linkedin app settings
const LINKEDIN_CLIENT_ID = keys.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = keys.LINKEDIN_CLIENT_SECRET;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new LinkedInStrategy({
  clientID: LINKEDIN_CLIENT_ID,
  clientSecret: LINKEDIN_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/linkedin/callback',
  scope: ['r_emailaddress', 'r_liteprofile'],
}, (token, tokenSecret, profile, done) => {
  return done(null, profile);
}));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});