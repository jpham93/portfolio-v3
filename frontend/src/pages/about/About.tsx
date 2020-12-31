import React, { useState, useEffect } from 'react';
import './About.scss';
import Header from '../../components/header/Header';
import HeaderPropsModel from '../../models/HeaderProps.model';
import ReactMarkdown from 'react-markdown';
import Loading from '../../components/loading/Loading';
import { CSSTransition } from 'react-transition-group';

const About = (props: any) => {

  const [loading, setLoading]           = useState(true);
  const [headerProps, setHeaderProps]   = useState< HeaderPropsModel | null>(null);
  const [pageContent, setPageContent]   = useState<string>("");

  /**
   * LOAD ABOUT CONTENT
   */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/about-page`)
      .then(res => res.json())
      .then(data => {
        const { header_title, content } = data;

        let hProps: HeaderPropsModel = { title: { text: header_title, style: 'default' }, headerType: 'default' };

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
          <CSSTransition in={ loading } timeout={ 400 } classNames="Loading" unmountOnExit>
            <Loading headerType="default" />
          </CSSTransition>
          <CSSTransition in={ !loading } timeout={ 500 } classNames="Content" mountOnEnter>
            <>
              <Header {...headerProps!} />
              <div className="AboutContent Content">
                <ReactMarkdown>
                  { pageContent! }
                </ReactMarkdown>
              </div>
            </>
          </CSSTransition>
    </>
  )
};

export default About;
