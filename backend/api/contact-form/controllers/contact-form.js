'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  sendContactFormSubmission: async ctx => {

    let err = false;

    if (!ctx.request.body.hasOwnProperty('name')) {
      err = true;
    }
    if (!ctx.request.body.hasOwnProperty('email')) {
      err = true;
    }
    if (!ctx.request.body.hasOwnProperty('details')) {
      err = true;
    }

    if (err) {
      ctx.throw(400, 'Contact form submission is missing information.');
    }

    return ctx.response;
  }

};
