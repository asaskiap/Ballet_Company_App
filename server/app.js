'use strict';

const path = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const serveFavicon = require('serve-favicon');
const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');

const cors = require('cors');

const baseRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const ordersRouter = require('./routes/orders');
const profileRouter = require('./routes/profile');
const announcementRouter = require('./routes/announcement');
const commentsRouter = require('./routes/comments');

//const emailService = require('./utilities/send-weekly-email');
const app = express();

//middleware
app.use(serveFavicon(path.join(__dirname, 'public/images', 'ballerina.png')));
app.use(logger('dev'));
app.use(
    cors({
        origin: [process.env.ALLOWED_CORS_ORIGIN],
        credentials: true
    })
);

app.use(express.json());
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        proxy: true, // Should allow cookie-setting with heroku proxied requests
        cookie: {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : false, // Can be used cross-site
            secure: process.env.NODE_ENV === 'production' // App is running on heroku
        },
        store: new(connectMongo(expressSession))({
            mongooseConnection: mongoose.connection,
            ttl: 24 * 60 * 60
        })
    })
);
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

app.use('/', baseRouter);
app.use('/authentication', authenticationRouter);
app.use('/orders', ordersRouter);
app.use('/profile', profileRouter);
app.use('/announcement', announcementRouter);
app.use('/comments', commentsRouter);

//emailService.sendWeeklyEmail();

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;