import React, { useEffect, useState } from 'react';
import './Blogs.scss';
import HeaderPropsModel from '../../models/HeaderProps.model';
import { ProgressSpinner } from 'primereact/progressspinner';
import Header from '../../components/header/Header';
import validateColor from 'validate-color';
import BlogCardsPropsModel from '../../models/BlogCardsProps.model';
import BlogCards from '../../components/blogCards/BlogCards';
import { CSSTransition } from 'react-transition-group';
import Loading from '../../components/loading/Loading';

const Blogs = () => {

  const [loading, setLoading]               = useState<boolean>(true);
  const [headerProps, setHeaderProps]       = useState<HeaderPropsModel | null>(null);
  const [blogCardsProps, setBlogCardsProps] = useState<BlogCardsPropsModel[] | null>(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/blogs-page`)
      .then(res => res.json())
      .then(async data => {
        /**
         * Extract Blogs Page content
         */
        const { header_title, header_img, header_color } = data;

        let hProps: HeaderPropsModel = { title: { text: header_title, style: 'default' }, headerType: 'default' };
        // add additional content if they exist
        if (header_img) {
          hProps.header_img = header_img;
        }
        if (header_color && validateColor(header_color)) {
          hProps.header_color = header_color;
        }

        setHeaderProps(hProps);

        /**
         * Extract individual Blogs
         */
        const blogsRes  = await fetch(`${process.env.REACT_APP_API_URL}/blogs`);
        const blogs     = await blogsRes.json();

        const bCardsProps = blogs.map((blog: any) => ({
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

        if (bCardsProps.length) {
          setBlogCardsProps(bCardsProps);
        }

        setLoading(false);
      });
  }, []);

  return(
    <>
      <CSSTransition in={ loading } timeout={ 400 } classNames="Loading" unmountOnExit>
        <Loading headerType="default" />
      </CSSTransition>
      <CSSTransition in={ !loading } timeout={ 500 } classNames="Content" mountOnEnter>
        <>
        <Header { ...headerProps! } />
          <div className="BlogsContent">
            <div className="BlogCardsContainer">
              {
                blogCardsProps === null
                  ?
                    <h2 className="NoBlogsHeader">No Blogs Available. Coming Soon...</h2>
                  :
                    <BlogCards blogCardsProps={ blogCardsProps } />
              }
            </div>
          </div>
        </>
      </CSSTransition>
    </>
  );
}

export default Blogs;
