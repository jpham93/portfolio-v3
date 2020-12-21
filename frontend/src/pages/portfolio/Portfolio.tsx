import React, { useEffect, useState } from 'react';
import './Portfolio.scss';
import { ProgressSpinner } from 'primereact/progressspinner';
import HeaderPropsModel from '../../models/HeaderProps.model';
import Header from '../../components/header/Header';
import ContactBanner from '../../components/contactBanner/ContactBanner';
import ContactBannerPropsModel from '../../models/ContactBannerProps.model';

const Portfolio = () => {

  const [headerProps, setHeaderProps] = useState<{
    title:        string,
    header_img?:  any,
    headerType:   'large' | 'default',
    color?:       string
  } | null>(null)
  const [contactBannerProps, setContactBannerProps] = useState<{
    header:             string,
    button_text:        string,
    background_color?:  string,
    button_color?:      string
  } | null>(null);
  const [projects, setProjects]       = useState<{

  } | null>(null);
  const [projectCategories, setProjectCategories] = useState<{

  } | null>(null);
  const [loading, setLoading]         = useState<boolean>(true);

  /**
   * Retrieve Projects from Project Page.
   */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/portfolio-page`)
      .then(res => res.json())
      .then(async data => {
        /**
         * Extract Projects & Categories collections
         */
        const projectsRes          = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
        const projectCategoriesRes = await fetch(`${process.env.REACT_APP_API_URL}/project-categories`);

        const projects          = await projectsRes.json();
        const projectCategories = await projectCategoriesRes.json();

        console.log(projects);
        console.log(projectCategories);

        /**
         * Extract Header Props from Portfolio Page endpoint
         */
        const { header_title } = data;

        let hProps: HeaderPropsModel = { title: header_title, headerType: 'default' };

        // check if there is a header image
        if (data.hasOwnProperty('header_img')) {
          hProps.header_img = data.header_img;
        }

        // check if there is a header color
        if (data.hasOwnProperty('header_color')) {
          hProps.header_color = data.header_color;
        }

        /**
         * Extract Contact Banner content
         */
        const contactBannerRes            = await fetch(`${process.env.REACT_APP_API_URL}/contact-banner`);
        const contactBanner               = await contactBannerRes.json();
        const { header, button_text }     = contactBanner;

        let cBannerProps: ContactBannerPropsModel = { header, button_text };

        // check if there are optional color options specified
        if (contactBanner.hasOwnProperty('background_color')) {
          cBannerProps.background_color = contactBanner.background_color;
        }

        if (contactBanner.hasOwnProperty('button_color')) {
          cBannerProps.button_color = contactBanner.background_color;
        }

        // set child component props
        setHeaderProps(hProps);
        setContactBannerProps(cBannerProps);

        setLoading(false);
      });
  }, []);


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
            <div className="PortfolioContent">
              <ContactBanner { ...contactBannerProps! } />
            </div>
          </>
      }
    </>
  );
}

export default Portfolio;
