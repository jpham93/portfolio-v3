import React, { useState, useEffect } from 'react';
import SocialLinksModel from '../../models/SocialLinks.model';
import Header from '../../components/header/Header';

const Home = () => {

    const [loading, setLoading]           = useState<boolean>(true);
    const [headerProps, setHeaderProps ]  = useState<{ title: string, header_img: any }|null>(null);
    const [socialLinks, setSocialLinks]   = useState<SocialLinksModel[]|null>(null);

    useEffect(() => {
      /**
       * FETCH HOME PAGE DATA & SET STATE TO REFRESH
       */
      fetch(`${process.env.REACT_APP_API_URL!}/home-page`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          /**
           * LOAD PAGE CONTENT
           */
            // extract data
          const { header_title, social_links } = data;

          // @TODO - narrow down retrieval with future GraphQL implementation
          social_links.map((link: any) => ({
            name: link.name,
            url: link.url,
            icon: link.icon
          }));

          // set all state (if it applicable)
          let headerImage = null;
          if (data.header_img) {
            headerImage =  data.header_img;
          }
          setHeaderProps({
            title: header_title,
            header_img: headerImage
          });
          setSocialLinks(social_links);

          // indicate load is finished
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
            <Header {...headerProps!} />
        }
      </>
    );
};

export default Home;
