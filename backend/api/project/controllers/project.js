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
    const project_id  = path.match(regex)[1];

    // query
    const project = await strapi.query('project').findOne({ project_id });

    // if project is found, remove all created_by & updated_by information
    if (project) {
      delete project.created_by;
      delete project.updated_by;

      if (project.hasOwnProperty('main_img')) {
        delete project.main_img.created_by;
        delete project.main_img.updated_by;
      }

      if (project.hasOwnProperty('alt_img')) {
        delete project.alt_img.created_by;
        delete project.alt_img.updated_by;
      }

      if (project.hasOwnProperty('project_category')) {
        delete project.project_category.created_by;
        delete project.project_category.updated_by;
      }

      if (project.hasOwnProperty('galleria_media') && project.galleria_media.length) {
        for (const obj of project.galleria_media) {
          delete obj.created_by;
          delete obj.updated_by;
        }
      }
    }
    return project;
  }
};
