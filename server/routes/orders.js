/* eslint-disable prettier/prettier */
'use strict';

const { Router } = require('express');

const Order = require('./../models/order');
const User = require('./../models/user')

const router = new Router();

router.get('/list', async(req, res, next) => {
    try {
        const orderList = await Order.find({});
        res.json({ orderList });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.patch('/:id/status', async(req, res, next) => {
    const { inProcess, received } = req.body;
    const id = req.params.id;
    try {
        const order = await Order.findByIdAndUpdate(
            id, {
                $set: { inProcess, received }
            }, { new: true }
        );
        res.json({ order });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async(req, res, next) => {
    try {
        const singleOrder = await Order.findById(req.params.id);
        res.json({ singleOrder });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.patch('/:id', async(req, res, next) => {
    const {
        item,
        brand,
        maker,
        model,
        size,
        width,
        color,
        quantity,
        comments
    } = req.body;
    const id = req.params.id;
    try {
        const order = await Order.findByIdAndUpdate(
            id, {
                $set: {
                    item,
                    brand,
                    maker,
                    model,
                    size,
                    width,
                    color,
                    quantity,
                    comments
                }
            }, { new: true }
        );
        res.json({ order });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({});
    } catch (error) {
        console.log(error);
        next(error);
    }
});
router.post('/create', async(req, res, next) => {
    console.log(req.body);
    const {
        item,
        brand,
        maker,
        model,
        size,
        width,
        color,
        quantity,
        comments,
        userRef
    } = req.body;
    const creator = await User.findById(userRef); 
    const creator_name = creator.name;
    try {
        const order = await Order.create({
            item,
            brand,
            maker,
            model,
            size,
            width,
            color,
            quantity,
            comments,
            creator,
            creator_name
        });
        
        res.json({ order });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;