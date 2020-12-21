import React, { useState, useEffect } from 'react';
import './Home.scss';
import Header from '../../components/header/Header';
import GridLinksView from '../../components/gridLinks/GridLinks';
import SocialLinksModel from '../../models/SocialLinks.model';
import GridLinksModel from '../../models/GridLinks.model';

const Home = ({ gridLinks }: { gridLinks: GridLinksModel[] }) => {

    const HEADER_HEIGHT = 400;

    const [loading, setLoading]             = useState<boolean>(true);
    const [headerProps, setHeaderProps ]    = useState<{ title: string, header_img: any, height?: number, headerType: 'large' | 'default' } | null>(null);
    const [gridLinkProps, setGridLinkProps] = useState<{gridLinks: GridLinksModel[], socialLinks: SocialLinksModel[]} | null>(null);

    useEffect(() => {
      /**
       * FETCH HOME PAGE DATA & SET STATE TO REFRESH
       */
      fetch(`${process.env.REACT_APP_API_URL!}/home-page`)
        .then(res => res.json())
        .then(data => {
          /**
           * LOAD PAGE CONTENT
           */
            // extract data
          const { header_title, social_links } = data;

          /**
           * GridLinkView props
           */
            // @TODO - narrow down retrieval with future GraphQL implementation
          const sLinks = social_links.map((link: any) => ({
            name: link.name,
            url: link.url,
            icon: link.icon,
            color: link.color
          }));
          setGridLinkProps({gridLinks: gridLinks, socialLinks: sLinks});

          /**
           * Header Props
           */
          // set all state (if it applicable)
          let headerImage = null;
          if (data.header_img) {
            headerImage =  data.header_img;
          }
          setHeaderProps({
            title: header_title,
            header_img: headerImage,
            headerType: 'large'
          });
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
              <Header {...headerProps!} />
              <div className="HomeContent">
                <GridLinksView {...gridLinkProps!} />
              </div>
            </>
        }
      </>
    );
};

export default Home;
