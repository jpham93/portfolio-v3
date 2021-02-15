import React, { useEffect, useState } from 'react';
import './Blog.scss';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import HeaderPropsModel from '../../models/HeaderProps.model';
import Header from '../../components/header/Header';
import ReactMarkdown from 'react-markdown';
import BlogCards from '../../components/blogCards/BlogCards';
import BlogCardsPropsModel from '../../models/BlogCardsProps.model';
import { CSSTransition } from 'react-transition-group';
import Loading from '../../components/loading/Loading';

const Blog = () => {

  const { blog_id } : { blog_id: string }       = useParams();
  const [loading, setLoading]                   = useState<boolean>(true);
  const [headerProps, setHeaderProps]           = useState<HeaderPropsModel | null>(null);
  const [content, setContent]                   = useState<string | null>(null);
  const [blogCardsProps, setBlogCardsProps]     = useState<{ blogCardsProps: BlogCardsPropsModel[] } | null>(null);
  const [lastUpdated, setLastUpdated]           = useState<string | undefined | null>(null);

  useEffect(() => {
    // scroll to the top. Works with reloading.
    window.scrollTo(0, 0);

    // set to loading again if blog_id changes
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/blog/${blog_id}`)
      .then(res => res.json())
      .then(async data => {
        console.log(data);
        /**
         * Extract Header Props
         */
        const { title, header_color, main_img, published_at, updatedAt, author, blog_category: { type, color } } = data;

        /**
         * Set lastUpdated state (if exists & different day than published date)
         */
        if (moment(published_at).format('MMM D, YYYY') !== moment(updatedAt).format('MMM D, YYYY')) {
          setLastUpdated(updatedAt);
        }

        const subtitleText = { author, type, date: moment(published_at).format('MMM D, YYYY') };

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
  }, [blog_id]);

  return(
    <>
      <CSSTransition in={ loading } timeout={ 400 } classNames="Loading" unmountOnExit>
        <Loading headerType="large" />
      </CSSTransition>
      <CSSTransition in={ !loading } timeout={ 500 } classNames="Content" mountOnEnter>
        <>
          <Header { ...headerProps! } />
          <div className="BlogContent LargeHeaderOverlap">
            {
              lastUpdated
                ?
                <em className="LastUpdated">
                  Lasted Updated: { moment(lastUpdated).format('MMM D, YYYY') }
                </em>
                :
                ''
            }
            <ReactMarkdown>
              { content! }
            </ReactMarkdown>
          </div>
          <div className="RecentBlogsContainer">
            <h2 className="RecentBlogHeader">Recent Blogs</h2>
            <div className="SmallDivider" />
            {
              blogCardsProps?.blogCardsProps.length
                ? <BlogCards { ...blogCardsProps! } />
                : <h2 style={{ textAlign: 'center' }}>No recent blogs available...</h2>
            }
          </div>
        </>
      </CSSTransition>
    </>
  );
}

export default Blog;
