'use strict';
const nodemailer = require('nodemailer');

const emailTemplate = ({ name, email, details }) => `
  <p>A new message was submitted from your website!</p>
  <h2>Name: </h2><strong>${name}</strong>
  <h2>Email: </h2><strong>${email}</strong>
  <h3>Details: </h3>
  <p>${details}</p>
`

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  sendContactFormSubmission: async ctx => {

    /**
     * Verify that contact fields was properly filled out
     */
    let err = false;

    if (!ctx.request.body.hasOwnProperty('name') || !ctx.request.body.name) {
      err = true;
    }
    if (!ctx.request.body.hasOwnProperty('email') || !ctx.request.body.email) {
      err = true;
    }
    if (!ctx.request.body.hasOwnProperty('details') || !ctx.request.body.details) {
      err = true;
    }

    if (err) {
      ctx.throw(406, 'Contact form submission is missing information.');
    }

    /**
     * If successful, extract payload and send mail...
     */
    const { name, email, details } = ctx.request.body;

    /**
     * Configure Email
     */
    const { SMTP_HOST, SMTP_PORT, EMAIL_ACCOUNT, EMAIL_PASSWORD, SECURE_FLAG } = process.env;

    let senderAccount = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SECURE_FLAG === 'true', // true for 465, false for other ports
      auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASSWORD,
      }
    });

    senderAccount.sendMail({
      from: '"James Pham" <phamj93@gmail.com>', // sender address
      to: "jamespham93@yahoo.com", // list of receivers
      subject: "Portfolio Contact Form Submission ✔", // Subject line
      text: "New Submission", // plain text body
      html: emailTemplate({ name, email, details }), // html body
    });

    return ctx.response;
  }

};
