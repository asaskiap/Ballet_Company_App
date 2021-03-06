/* eslint-disable prettier/prettier */
'use strict';

const { Router } = require('express');
const ADMINPIN = process.env.ADMINPIN;

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
        const { name, email, password, admin, adminpin } = req.body;

        try {
            //check admin pin

            if (admin === true) {
                if (!(adminpin === ADMINPIN)) {
                    console.log('wrong admin pin');
                    res.json({});
                    return;
                }
            }
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
    const { email, password } = req.body;
    console.log(req.body);

    User.findOne({ email })
        .then((document) => {
            if (!document) {
                res.json({});

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
                res.json({});
                // console.log('wrong password');
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