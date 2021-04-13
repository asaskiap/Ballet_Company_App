'use strict';


const nodemailer = require('nodemailer');
let cron = require('node-cron');

const receiver = 'alannapfeiffer@gmail.com'; 
const subject = 'BC - Weekly order summary'; 
const Order = require('./../models/order')

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD
    }
});

const sendWeeklyEmail = cron.schedule('* * * * *', async() => {
    const orders = await Order.find({}); 
  // Send e-mail
  const body =  `
  <div>
  <h1>Orders</h1>
        <div>
              
              ${orders.map((order) => {
                return (
                   `<p><span >{order.creator_name}   ||  </span>
                    <span >{order.item}     || </span>
                    <span >{order.brand}    ||  </span>
                    <span>{order.size} | {order.width}    ||  </span>
                    <span >{order.quantity}   ||  </span>
                    <span >{order.comments}   ||  </span></p>`
                );
              })}
        </div>
  `
  
  transport.sendMail({
        from: process.env.GMAIL_ADDRESS,
        to: receiver,
        subject,
        html: `
        <html>
          <head>
          </head>
          <body>
            ${body}
          </body>
        </html>
      `
    });
  });



module.export = {
    cronService: cronService
}