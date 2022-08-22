const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// REGISTRO
router.get('/signup', isNotLoggedIn, (req,res) => {
    res.redirect('/#empezar');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/#empezar',
    failureFlash: true
}));

// INICIAR SESIÓN
router.get('/login', isNotLoggedIn, (req,res) => {
    res.render('auth/login');
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/#inicio-sesion',
        failureFlash: true
    })(req,res,next);
});

// PROFILE
router.get('/profile', isLoggedIn, (req,res) => {
    res.render('profile');
});

// LOGOUT
router.get('/logout', isLoggedIn, (req,res,next) => {
    
    req.logOut(function(err) {
        if(err) { return next(err); }
        res.redirect('/#inicio-sesion');
    });
    
});

module.exports = router;