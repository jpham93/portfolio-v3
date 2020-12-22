import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Project.scss';
import ProjectStateModel from '../../models/ProjectState.model';
import HeaderPropsModel from '../../models/HeaderProps.model';
import validateColor from 'validate-color';
import Header from '../../components/header/Header';

const Project = () => {

  // extract project_id from router parameter (provided by ProjectCard component)
  const { project_id } : { project_id: string } = useParams();
  const [headerProps, setHeaderProps]           = useState<{
    title:        string,
    headerType:   'default' | 'large',
    header_img?:   any,
    header_color?: string
  } | null>(null);
  const [project, setProject]                   = useState<ProjectStateModel | null>(null);
  const [loading, setLoading]                   = useState<boolean>(true);

  useEffect(() => {
    /**
     * Extract single Project entry from custom Endpoint
     */
    fetch(`${process.env.REACT_APP_API_URL}/project/${project_id}`)
      .then(res => res.json())
      .then(data => {
        // extract required content first
        const { title, description, project_category: { type, color } } = data;

        /**
         * Set Header Props first
         */
        let hProps: HeaderPropsModel = { title, headerType: 'large' };
        // check for optional characteristics
        if (data.hasOwnProperty('header_color') && validateColor(data.header_color)) {
          hProps.header_color = data.header_color;
        }
        if (data.hasOwnProperty('main_img')) {
          hProps.header_img = data.main_img;
        }

        setHeaderProps(hProps);

        /**
         * Set Content data
         */

        setLoading(false);
      });

  }, []);

  return (
    <>
      {
        loading
          ?
          <h1>Loading...</h1>
          :
          <>
            <Header { ...headerProps! } />
            <div className="ProjectContent">
              
            </div>
          </>
      }
    </>
  )
}

export default Project;
