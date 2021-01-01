'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  sendContactFormSubmission: async ctx => {

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

    console.log(ctx.request.body);

    if (err) {
      ctx.throw(406, 'Contact form submission is missing information.');
    }

    return ctx.response;
  }

};
