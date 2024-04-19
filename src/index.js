const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const appConfig = require('./configs/app');
const dbConfig = require('./configs/database');
const oidcConfig = require('./configs/oidc');
const passport = require('passport');
const Strategy = require('passport-openidconnect').Strategy;
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const Redis = require('ioredis');
const RedisStore = require('connect-redis').default;
const redisClient = new Redis({
    host: dbConfig.connection.redis.host,
});
app.use(require('morgan')('dev'));

app.set('views', path.join(__dirname, '../src/views'));
app.use(expressLayouts);
app.set('layout', './layouts/app');
app.set('view engine', 'ejs');

// Session configuration.
app.use(session({
    store: new RedisStore({
        client: redisClient,
        prefix: dbConfig.connection.redis.cache_prefix
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
    }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Strategy(oidcConfig, (issuer, profile, cb) => {
    // In this example, the user's profile is supplied as the user record.
    // In a production-quality application, the profile should be associated
    // with a user record in the application's database, which allows for
    // account linking and authentication with other identity providers.
    return cb(null, profile);
}));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// Init router.
app.use('', require('./routes'));

app.listen(appConfig.port, () => {
    console.log(`Application is running with port: ${appConfig.port}`);
});

