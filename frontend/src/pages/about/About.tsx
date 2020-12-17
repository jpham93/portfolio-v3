import React, { useState, useEffect } from 'react';
import './About.scss';
import Header from '../../components/header/Header';
import HeaderPropsModel from '../../models/HeaderProps.model';

const About = (props: any) => {

  const [loading, setLoading]           = useState(true);
  const [headerProps, setHeaderProps]   = useState<{ title: string, header_img?: any, height?: number, color?: string } | null>();
  const [pageContent, setPageContent]           = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/about-page`)
      .then(res => res.json())
      .then(data => {
        const { header_title, content } = data;

        let hProps: HeaderPropsModel = { title: header_title };

        // check if there is a header image
        if (data.hasOwnProperty('header_img')) {
          hProps.header_img = data.header_img;
        }

        // check if there is a header color
        if (data.hasOwnProperty('color')) {
          hProps.header_color = data.header_color;
        }

        setHeaderProps(hProps);
        setPageContent(content);

        setLoading(false);
      });
  }, [])

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
              { pageContent }
            </div>
          </>
      }
    </>
  )
};

export default About;
