/* eslint-disable prettier/prettier */
'use strict';

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD
    }
});

const sendEmail = async({ receiver, subject, body }) => {
    const style = `
    h1{
      background-color: #fadd98;
    }
  p {
    font-size: 1.2em;
    padding: 0.5em;
    border: 1px solid #b0bbd1;
    display: flex; 
    justify-content: space-between; 
    flex-wrap: wrap;
  }
  span, small {
    flex-grow: 1;
    padding: 0.5em 0em;
    margin: 0.5em 1em; 
  }
  small{
    padding: 0.3em;
    text-align: center; 
  }
  `;
    const result = await transport.sendMail({
        from: process.env.GMAIL_ADDRESS,
        to: receiver,
        subject,
        html: `
        <html>
          <head>
            <style>
            ${style}
            </style>
          </head>
          <body>
            ${body}
          </body>
        </html>
      `
    });
    return result;
};

module.exports = sendEmail;