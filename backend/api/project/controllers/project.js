'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Custom findOne with the the use of the Project's UID instead of the entry ID
   * @param ctx             - Strapi Context
   * @return {Promise<*>}   - HTTP Response (Object or null). Null results in 404.
   */
  findOneByProjectId: async ctx => {

    // extract project_id
    const path        = ctx.url;
    const regex       = /^\/project\/(.*)$/
    const project_id       = path.match(regex)[1];

    // query
    const res         = await strapi.query('project').findOne({ project_id });

    // return res
    return res;
  }
};
