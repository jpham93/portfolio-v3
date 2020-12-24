import React, { useEffect, useState } from 'react';
import './Portfolio.scss';

// Components
import { ProgressSpinner } from 'primereact/progressspinner';
import Header from '../../components/header/Header';
import ContactBanner from '../../components/contactBanner/ContactBanner';
import ProjectCards from '../../components/projectCards/ProjectCards';

// Models
import HeaderPropsModel from '../../models/HeaderProps.model';
import ContactBannerPropsModel from '../../models/ContactBannerProps.model';
import ProjectCardsPropsModel from '../../models/ProjectCardsProps.model';

const Portfolio = () => {

  const [headerProps, setHeaderProps] = useState<HeaderPropsModel| null>(null)
  const [contactBannerProps, setContactBannerProps] = useState<ContactBannerPropsModel| null>(null);
  const [projectCards, setProjectCards]           = useState<{
    projectCardsProps: ProjectCardsPropsModel[]
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

        // filter Projects data @todo - replace with GraphQL in the future
        const projectCardsProps = projects.map((project: any) => {
          
          const { title, project_id, project_category: { type, color } } = project;

          let returnProjectModelProp: ProjectCardsPropsModel = {
            project_id,
            title,
            project_category: {
              type,
              color
            }
          }

          // check if header image has been identified
          if (project.main_img) {
            returnProjectModelProp.main_img = project.main_img;
          }

          return returnProjectModelProp;
        });

        /**
         * Extract Header Props from Portfolio Page endpoint
         */
        const { header_title } = data;

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
          cBannerProps.button_color = contactBanner.button_color;
        }

        setContactBannerProps(cBannerProps);

        // only set Project Card props
        if (projectCardsProps.length) {
          setProjectCards({ projectCardsProps: projectCardsProps });
        }

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
              <div className="ProjectCardsContainer">
                {
                  projectCards === null
                  ?
                    <h2 className="NoProjectsHeader">No Projects Available. Coming Soon...</h2>
                  :
                    <ProjectCards { ...projectCards! } />
                }
              </div>
              <ContactBanner { ...contactBannerProps! } />
            </div>
          </>
      }
    </>
  );
}

export default Portfolio;
