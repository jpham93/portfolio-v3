import React, { useEffect, useState } from 'react';
import './Blog.scss';
import { useParams } from 'react-router-dom';
import HeaderPropsModel from '../../models/HeaderProps.model';
import Header from '../../components/header/Header';
import ReactMarkdown from 'react-markdown';

const Blog = () => {

  const { blog_id } : { blog_id: string }       = useParams();
  const [loading, setLoading]                   = useState<boolean>(true);
  const [headerProps, setHeaderProps]           = useState<HeaderPropsModel | null>(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/blog/${blog_id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        /**
         * Extract Header Props
         */
        const { title, header_color, main_img } = data;

        let hProps: HeaderPropsModel = { title: {text: title, style: 'default'} , headerType: 'large' }

        // optional content
        if (header_color) {
          hProps.header_color = header_color;
        }
        if (main_img) {
          hProps.header_img = main_img;
        }

        setHeaderProps(hProps);

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
                # Blog Page
              </ReactMarkdown>
            </div>
          </>
      }
    </>
  );
}

export default Blog;
