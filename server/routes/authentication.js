/* eslint-disable prettier/prettier */
'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const fileUploadMiddleware = require('./../middleware/file-upload');

const router = new Router();

router.post(
    '/sign-up',
    fileUploadMiddleware.single('picture'),
    async(req, res, next) => {
        let picture;
        if (req.file) {
            picture = req.file.path;
        } else {
            picture = req.body.picture;
        }
        const { name, email, password, admin } = req.body;

        try {
            const hash = await bcryptjs.hash(password, 10);
            const user = await User.create({
                name,
                email,
                passwordHashAndSalt: hash,
                isAdministrator: admin,
                profilePicture: picture
            });
            console.log(user);
            req.session.userId = user._id;
            res.json({ user });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
);

router.post('/sign-in', (req, res, next) => {
    let user;
    console.log(process.env.ALLOWED_CORS_ORIGIN, process.env.GMAIL_ADDRESS);
    const { email, password } = req.body;
    console.log(req.body);
    User.findOne({ email })
        .then((document) => {
            if (!document) {
                return Promise.reject(new Error("There's no user with that email."));
            } else {
                user = document;
                return bcryptjs.compare(password, user.passwordHashAndSalt);
            }
        })
        .then((result) => {
            if (result) {
                req.session.userId = user._id;
                res.json({ user });
            } else {
                return Promise.reject(new Error('Wrong password.'));
            }
        })
        .catch((error) => {
            next(error);
        });
});

router.post('/sign-out', (req, res, next) => {
    req.session.destroy();
    res.json({});
});

router.get('/verify', (req, res) => {
    const user = req.user || null;
    res.json({ user: user });
});

module.exports = router;