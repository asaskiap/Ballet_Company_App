/* eslint-disable prettier/prettier */
'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const fileUploadMiddleware = require('./../middleware/file-upload');
const bcryptjs = require('bcryptjs');

const User = require('./../models/user');
const Order = require('./../models/order');
const Announcement = require('./../models/announcement');

router.get('/:id', async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({ individual: user });
    } catch (error) {
        next(error);
    }
});

router.get('/:id/orders', async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const orders = await Order.find({ creator: user });
        orders.sort((a, b) =>
            a.editDate > b.editDate ? -1 : b.editDate > a.editDate ? 1 : 0
        );
        res.json({ orders });
    } catch (error) {
        next(error);
    }
});

router.get('/:id/announcements', async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const announcements = await Announcement.find({ creator: user });
        announcements.sort((a, b) =>
            a.editDate > b.editDate ? -1 : b.editDate > a.editDate ? 1 : 0
        );
        res.json({ announcements });
    } catch (error) {
        next(error);
    }
});

router.patch(
    '/:id/edit',
    routeGuard,
    fileUploadMiddleware.single('picture'),
    async(req, res, next) => {
        const {
            name,
            email,
            password,
            pt_brand,
            pt_maker,
            pt_model,
            pt_size,
            pt_width,
            pt_color,
            ss_brand,
            ss_size,
            ss_width,
            ss_color,
            dress_size,
            sock_size,
            shoe_size
        } = req.body;
        const id = req.user._id;

        let picture;
        if (req.file) {
            picture = req.file.path;
        } else {
            picture = req.body.picture;
        }

        try {
            //check if user wants to update password:

            if (password) {
                const hash = await bcryptjs.hash(password, 10);
                await User.findByIdAndUpdate(id, {
                    $set: {
                        passwordHashAndSalt: hash
                    }
                });
            }
            const user = await User.findByIdAndUpdate(
                id, {
                    $set: {
                        name,
                        email,
                        profilePicture: picture,
                        pt_brand,
                        pt_maker,
                        pt_model,
                        pt_size,
                        pt_width,
                        pt_color,
                        ss_brand,
                        ss_size,
                        ss_width,
                        ss_color,
                        dress_size,
                        sock_size,
                        shoe_size
                    }
                }, { new: true }
            );

            res.json({ user });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;