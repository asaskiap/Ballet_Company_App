/* eslint-disable prettier/prettier */
'use strict';

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });

const sendEmail = require('./../utilities/send-email');
const RECEIVER = 'alannapfeiffer@gmail.com';
const Order = require('./../models/order');
const User = require('./../models/user');

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

const sendWeeklyEmail = async() => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        });
    } catch (error) {
        console.log(error);
    }

    const orderList = await Order.find({});
    console.log(orderList);

    const EmailBody =
        `<div> <h1>A summary of last weeks' orders</h1>` +
        orderList
        .map((order) => {
            return `<p key=${order._id}>
        <span > From: <br><b>${order.creator_name.toUpperCase()}</b></span>
        <span>Item:<br> <b>${order.item.toUpperCase()}</b></span>
        <span>Brand:<br> <b>${order.brand.toUpperCase()}</b></span>
        <span>
          Size|Width:<br> <b>${order.size} | ${order.width}</b>
        </span>
        <span>Quantity: <br><b>${order.quantity}</b></span>
        <br>
        <small>Comments:<br> ${order.comments || '-'}</small>
      </p>`;
        })
        .join('') +
        `</div>`;

    console.log(EmailBody);

    try {
        await sendEmail({
            receiver: RECEIVER,
            subject: `Weekly order summary`,
            body: EmailBody
        });
    } catch (error) {
        console.log(error);
    }

    await mongoose.disconnect();
};

sendWeeklyEmail();