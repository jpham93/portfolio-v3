import React, { useState, useEffect } from 'react';
import './About.scss';
import Header from '../../components/header/Header';
import HeaderPropsModel from '../../models/HeaderProps.model';
import ReactMarkdown from 'react-markdown';

const About = (props: any) => {

  const [loading, setLoading]           = useState(true);
  const [headerProps, setHeaderProps]   = useState<{
      title:        string,
      header_img?:  any,
      headerType:   'large' | 'default',
      color?:       string
  } | null>(null);
  const [pageContent, setPageContent]   = useState<string>("");

  /**
   * LOAD ABOUT CONTENT
   */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/about-page`)
      .then(res => res.json())
      .then(data => {
        const { header_title, content } = data;

        let hProps: HeaderPropsModel = { title: header_title, headerType: 'default' };

        // check if there is a header image
        if (data.hasOwnProperty('header_img')) {
          hProps.header_img = data.header_img;
        }

        // check if there is a header color
        if (data.hasOwnProperty('header_color')) {
          hProps.header_color = data.header_color;
        }

        setHeaderProps(hProps);
        setPageContent(content);

        setLoading(false);
      });
  }, []);

  return (
    <>
      {
        loading
        ?
          <h1>Loading</h1>
        :
          <>
            <Header {...headerProps!} />
            <div className="AboutContent">
              <ReactMarkdown>
                { pageContent! }
              </ReactMarkdown>
            </div>
          </>
      }
    </>
  )
};

export default About;
