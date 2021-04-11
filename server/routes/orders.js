/* eslint-disable prettier/prettier */
'use strict';

const { Router } = require('express');
const EMAIL = 'alannapfeiffer@gmail.com';

const routeGuard = require('./../middleware/route-guard');
const bcryptjs = require('bcryptjs');
const Order = require('./../models/order');
const sendEmail = require('./../utilities/send-email');

const router = new Router();

router.get('/list', routeGuard, async(req, res, next) => {
    try {
        const orderList = await Order.find({});
        res.json({ orderList });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.patch('/:id/status', routeGuard, async(req, res, next) => {
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
        console.log('loading single order in router');
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
        console.log('deleting in router');
        await Order.findByIdAndDelete(req.params.id);
        res.json({});
    } catch (error) {
        console.log(error);
        next(error);
    }
});
router.post('/create', routeGuard, async(req, res, next) => {
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
    const creator = req.user;
    const creator_name = req.user.name;
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
        console.log(order);
        await sendEmail({
            receiver: EMAIL,
            subject: `A new order was submitted`,
            body: `
            <div>
            <h2>A new order from ${creator_name}: </h2>
            <p>
            <span> ${item}    |</span>
            <span> ${brand}   |</span>
            <span> ${model}   |</span>
            <span> Maker: ${maker}   | </span>
            <span> Size: ${size} | ${width}    |</span>
            <span> ${color}    |</span>
            <span> Quantity: ${quantity}   |</span>
            <span> Comments: ${comments}    |</span>
            </p>
            </div>
              
             
            `
        });
        res.json({ order });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;