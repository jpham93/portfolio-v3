'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Custom findOne with the the use of the Blog's UID instead of the entry ID
   * @param ctx
   * @return {Promise<void>}
   */
  findOneByBlogId: async ctx => {
    // extract blog_id
    const path        = ctx.url;
    const regex       = /^\/blog\/(.*)$/
    const blog_id  = path.match(regex)[1];

    const blog = await strapi.query('blog').findOne({ blog_id });

    // extract firstname & lastname from created_by property before deleting.
    const { firstname, lastname } = blog.created_by;
    blog.author = `${firstname} ${lastname}`;

    // if blog is found, remove all created_by & updated_by information (except in first level)
    if (blog) {
      delete blog.created_by;
      delete blog.updated_by;

      if (blog.hasOwnProperty('main_img')) {
        delete blog.main_img.created_by;
        delete blog.main_img.updated_by;
      }

      if (blog.hasOwnProperty('blog_category')) {
        delete blog.blog_category.created_by;
        delete blog.blog_category.updated_by;
      }
    }

    return blog;
  }
};
