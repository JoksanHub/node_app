const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

router.get('/signup',(req,res) => {
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', (req,res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req,res,next);
});

router.get('/profile', isLoggedIn, (req,res) => {
    res.render('profile');
});

router.post('/logout', (req,res,next) => {
    req.logOut(req.user, err => {
        if(err) {
            return next(err);
        } else {
            res.redirect('/signin');
        }
    });
    res.redirect('/signin');
});

module.exports = router;