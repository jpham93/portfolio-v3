import React, { useEffect, useState } from 'react';
import './Blog.scss';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import HeaderPropsModel from '../../models/HeaderProps.model';
import Header from '../../components/header/Header';
import ReactMarkdown from 'react-markdown';

const Blog = () => {

  const { blog_id } : { blog_id: string }       = useParams();
  const [loading, setLoading]                   = useState<boolean>(true);
  const [headerProps, setHeaderProps]           = useState<HeaderPropsModel | null>(null);
  const [content, setContent]                   = useState<string | null>(null);

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
         * Extract Blog State
         */
        setContent(data.content);

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
          </>
      }
    </>
  );
}

export default Blog;
