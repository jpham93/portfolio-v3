import React, { useEffect, useState } from 'react';
import './Blog.scss';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import HeaderPropsModel from '../../models/HeaderProps.model';
import Header from '../../components/header/Header';
import ReactMarkdown from 'react-markdown';
import BlogCards from '../../components/blogCards/BlogCards';
import BlogCardsPropsModel from '../../models/BlogCardsProps.model';
import ProjectCardsPropsModel from '../../models/ProjectCardsProps.model';

const Blog = () => {

  const { blog_id } : { blog_id: string }       = useParams();
  const [loading, setLoading]                   = useState<boolean>(true);
  const [headerProps, setHeaderProps]           = useState<HeaderPropsModel | null>(null);
  const [content, setContent]                   = useState<string | null>(null);
  const [blogCardsProps, setBlogCardsProps]     = useState<{ blogCardsProps: BlogCardsPropsModel[] } | null>(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/blog/${blog_id}`)
      .then(res => res.json())
      .then(async data => {
        /**
         * Extract Header Props
         */
        const { title, header_color, main_img, date, author, blog_category: { type, color } } = data;

        const subtitleText = { author, type, date: moment(date).format('MMM D, YYYY') };

        let hProps: HeaderPropsModel = {
          title: {
            text: title, style: 'default'
          },
          headerType: 'large',
          subtitle: {
            text: subtitleText
          }
        };

        // optional content
        if (header_color) {
          hProps.header_color = header_color;
        }
        if (main_img) {
          hProps.header_img = main_img;
        }

        setHeaderProps(hProps);

        /**
         * Extract Blog content
         */
        setContent(data.content);

        /**
         * Extract Recent Blogs
         */
        /**
         * Fetch Projects 3 recent Projects (excluding this project) for Recent Projects cards
         * @Note - can't use Strapi filter because they don't have reverse built-in. May want to write this into our custom endpoint.
         */
        const blogsRes = await fetch(`${process.env.REACT_APP_API_URL}/blogs?blog_id_ne=${blog_id}`);
        const blogs    = await blogsRes.json();

        const recentBlogs: BlogCardsPropsModel[] = blogs.reverse().slice(0,3).map((blog: any) => ({
          title:        blog.title,
          main_img:     blog.main_img,
          blog_category: {
            type:       blog.blog_category.type,
            color:      blog.blog_category.color
          },
          blog_id:      blog.blog_id,
          description:  blog.description,
          date:         blog.published_at
        }));

        setBlogCardsProps({ blogCardsProps: recentBlogs });

        setLoading(false);
      });
  }, []);

  return(
    <>
      {
        loading
          ?
          <h1>Loading...</h1>
          :
          <>
            <Header { ...headerProps! } />
            <div className="BlogContent LargeHeaderOverlap">
              <ReactMarkdown>
                { content! }
              </ReactMarkdown>
            </div>
            <div className="RecentBlogsContainer">
              <h2 className="RecentBlogHeader">Recent Blogs</h2>
              <div className="SmallDivider" />
              <BlogCards { ...blogCardsProps! } />
            </div>
          </>
      }
    </>
  );
}

export default Blog;
