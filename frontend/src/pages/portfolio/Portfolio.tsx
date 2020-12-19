import React, { useEffect, useState } from 'react';
import './Portfolio.scss';
import { ProgressSpinner } from 'primereact/progressspinner';
import HeaderPropsModel from '../../models/HeaderProps.model';
import Header from '../../components/header/Header';

const Portfolio = () => {

  const [headerProps, setHeaderProps]               = useState<{
    title:        string,
    header_img?:  any,
    headerType:   'large' | 'default',
    color?:       string
  } | null>(null)
  const [projects, setProjects]                     = useState<{

  } | null>(null);
  const [projectCategories, setProjectCategories]   = useState<{

  } | null>(null);
  const [loading, setLoading]                       = useState<boolean>(true);

  /**
   * Retrieve Projects from Project Page.
   */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/portfolio-page`)
      .then(res => res.json())
      .then(async data => {
        // extract project collections
        const projectsRes          = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
        const projectCategoriesRes = await fetch(`${process.env.REACT_APP_API_URL}/project-categories`);

        const projects          = await projectsRes.json();
        const projectCategories = await projectCategoriesRes.json();

        console.log(projects);
        console.log(projectCategories);

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

        // set child component props
        setHeaderProps(hProps);

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
          <Header { ...headerProps! } />
      }
    </>
  );
}

export default Portfolio;
