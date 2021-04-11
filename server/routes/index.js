/* eslint-disable prettier/prettier */
'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');

router.get('/', (req, res, next) => {
    res.json({ type: 'success', data: { title: 'Hello World' } });
});

router.get('/:id', routeGuard, async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({ individual: user });
    } catch (error) {
        next(error);
    }
});

router.patch('/:id/edit', routeGuard, async(req, res, next) => {
    const {
        name,
        email,
        pt_brand,
        pt_maker,
        pt_size,
        pt_width,
        ss_brand,
        ss_size,
        ss_width,
        ss_color,
        dress_size,
        sock_size,
        shoe_size
    } = req.body;
    const id = req.user._id;
    try {
        const user = await User.findByIdAndUpdate(
            id, {
                $set: {
                    name,
                    email,
                    pt_brand,
                    pt_maker,
                    pt_size,
                    pt_width,
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
});

router.get('/private', routeGuard, (req, res, next) => {
    res.json({});
});
module.exports = router;