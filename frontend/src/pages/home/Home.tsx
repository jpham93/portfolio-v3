import React, { useState, useEffect } from 'react';
import './Home.scss';
import Header from '../../components/header/Header';
import GridLinksView from '../../components/gridLinks/GridLinks';
import SocialLinksModel from '../../models/SocialLinks.model';
import GridLinksModel from '../../models/GridLinks.model';
import HeaderPropsModel from '../../models/HeaderProps.model';
import Loading from '../../components/loading/Loading';
import { CSSTransition } from 'react-transition-group';

const Home = ({ gridLinks }: { gridLinks: GridLinksModel[] }) => {

    const [loading, setLoading]             = useState<boolean>(true);
    const [headerProps, setHeaderProps ]    = useState<HeaderPropsModel | null>(null);
    const [gridLinkProps, setGridLinkProps] = useState<{ gridLinks: GridLinksModel[], socialLinks: SocialLinksModel[] } | null>(null);

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
          let hProps: HeaderPropsModel = {
            title: {
              text: header_title,
              style: 'large'
            },
            headerType: 'large'
          }
          // set all state (if it applicable)
          if (data.hasOwnProperty('header_img')) {
            hProps.header_img =  data.header_img;
          }
          if (data.hasOwnProperty('header_color')){
            hProps.header_color = data.header_color;
          }
          setHeaderProps(hProps);

          setLoading(false);
        });

    }, []);

    return(
      <>
        <CSSTransition in={ loading } timeout={ 400 } unmountOnExit classNames="Loading">
          <Loading headerType="large" initLoad={ true } />
        </CSSTransition>
        <CSSTransition in={ !loading } timeout={ 500 } unmountOnExit classNames="Content">
          <>
            <Header {...headerProps!} />
            <div className="HomeContent">
              <GridLinksView {...gridLinkProps!} />
            </div>
          </>
        </CSSTransition>
      </>
    );
};

export default Home;
