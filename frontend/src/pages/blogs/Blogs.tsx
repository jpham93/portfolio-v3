import React, { useEffect, useState } from 'react';
import './Blogs.scss';
import HeaderPropsModel from '../../models/HeaderProps.model';
import { ProgressSpinner } from 'primereact/progressspinner';
import Header from '../../components/header/Header';
import validateColor from 'validate-color';

const Blogs = () => {

  const [loading, setLoading]               = useState<boolean>(true);
  const [headerProps, setHeaderProps]       = useState<HeaderPropsModel | null>(null);
  const [blogCardsProps, setBlogCardsProps] = useState(null);

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
        console.log(hProps);

        setLoading(false);
      });
  }, [])

  return(
    <>
      {
        loading
        ?
          <>
            <ProgressSpinner />
            <h2>Loading. Please wait...</h2>
          </>
        :
          <>
          <Header { ...headerProps! } />
            <div className="BlogsContent">
              <div className="BlogCardsContainer">
                
              </div>
            </div>
          </>
      }
    </>
  );
}

export default Blogs;
