const express = require('express');
const passport = require('passport');
const router = express.Router();
require('dotenv').config();
const oidcConfig = require('../configs/oidc');

router.get('', (req, res) => {
    res.render('index', {
        isAuth: req.user ?? false,
        title: 'OIDC ExpressJs App',
    });
});

router.get('/login', passport.authenticate('openidconnect'));
router.get('/oidc/callback', passport.authenticate('openidconnect', {
    successReturnToOrRedirect: oidcConfig.redirectPathAfterLogin,
    failureRedirect: oidcConfig.failureRedirect,
}));

router.get('/dashboard',
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
        console.log(req.user);

        res.render('dashboard', {
            user: req.user,
            title: 'Dashboard',
            isAuth: true,
        });
    });

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        res.redirect(302, oidcConfig.redirectUrlAfterLogout);
    });
});

module.exports = router;
