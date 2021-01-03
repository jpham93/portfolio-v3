'use strict';
const nodemailer = require('nodemailer');

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

    const { name, email, details } = ctx.request.body;
    console.log(process.env.EMAIL_ACCOUNT);

    // /**
    //  * Configure Email
    //  */
    // let senderAccount = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: testAccount.user, // generated ethereal user
    //     pass: testAccount.pass, // generated ethereal password
    //   }
    // });

    return ctx.response;
  }

};
