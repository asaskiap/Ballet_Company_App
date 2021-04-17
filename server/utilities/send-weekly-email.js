/* eslint-disable prettier/prettier */
'use strict';
const sendEmail = require('./../utilities/send-email');
const RECEIVER = 'alannapfeiffer@gmail.com';
const Order = require('./../models/order');

const sendWeeklyEmail = async() => {
    // const orders = await Order.find({});
    // console.log('orders', orders);
    // const EmailBody = orders.map((order) => {
    //     return `<p key=${order._id}>
    //     <span> From: ${order.creator_name}</span>
    //     <span>Item: ${order.item}</span>
    //     <span>Brand: ${order.brand}</span>
    //     <span>
    //       Size | Width : ${order.size} | {order.width}
    //     </span>
    //     <span>Quantity: ${order.quantity}</span>
    //     <span>Comments: ${order.comments}</span>
    //   </p>`;
    // });
    const EmailBody = `<div> This is a trial email</div>`;
    console.log(EmailBody);

    await sendEmail({
        receiver: RECEIVER,
        subject: `Weekly order summary`,
        body: EmailBody
    });
};

sendWeeklyEmail();