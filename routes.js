const passport = require('passport');
const express = require('express');
var router = express.Router();

function isLoggedIn(req, res, next) {
  console.log('isLoggedIn:', req.isAuthenticated());
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

router.get('/', (req, res) => {
  res.render('pages/index.ejs'); // load the index.ejs file
});

router.get('/profile', isLoggedIn, (req, res) => {
  console.log('User:', req.user);
  res.render('pages/profile.ejs', {
    user: req.user // get the user out of session and pass to template
  });
});

router.get('/auth/linkedin', passport.authenticate('linkedin', {
  scope: ['r_emailaddress', 'r_liteprofile', 'r_fullprofile'],
}));

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;