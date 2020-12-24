import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Project.scss';
import validateColor from 'validate-color';

// Components
import Header from '../../components/header/Header';
import ReactMarkdown from 'react-markdown';
import ProjectGalleria from '../../components/projectGalleria/ProjectGalleria';

// Model
import ProjectStateModel from '../../models/ProjectState.model';
import HeaderPropsModel from '../../models/HeaderProps.model';
import ContactBannerPropsModel from '../../models/ContactBannerProps.model';
import ContactBanner from '../../components/contactBanner/ContactBanner';

const Project = () => {

  // extract project_id from router parameter (provided by ProjectCard component)
  const { project_id } : { project_id: string } = useParams();
  const [headerProps, setHeaderProps]           = useState<{
    title:        string,
    headerType:   'default' | 'large',
    header_img?:   any,
    header_color?: string
  } | null>(null);
  const [project, setProject]                         = useState<ProjectStateModel | null>(null);
  const [contactBannerProps, setContactBannerProps]   = useState<ContactBannerPropsModel | null>(null);
  const [loading, setLoading]                         = useState<boolean>(true);

  useEffect(() => {
    /**
     * Extract single Project entry from custom Endpoint
     */
    fetch(`${process.env.REACT_APP_API_URL}/project/${project_id}`)
      .then(res => res.json())
      .then(async data => {
        console.log(data);
        // extract required content first
        const { title, description, project_category: { type, color } , galleriaMedia } = data;

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
         * Set Content data for Project page (including Galleria)
         */
        let pState: ProjectStateModel = { title, description, project_category: { type, color } };
        // check for optional Gallery Media

        if (data.hasOwnProperty('alt_img')) {
          pState.alt_img = data.alt_img;
        }

        if (data.hasOwnProperty('galleria_media') && data.galleria_media.length) {
          pState.galleria_media = data.galleria_media.map((obj: { url: string; alternativeText: string; caption: string; }) => ({
            url:             obj.url,
            alternativeText: obj.alternativeText,
            caption:         obj.caption
          }));
        }

        setProject(pState);

        /**
         * Set Props for Contact Banner
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
              {
                // load Project content when set
                project
                ?
                  <>
                    <div className="ProjectContent Content LargeHeaderOverlap">
                    {
                      // check if alternative image is defined and display dynamically
                      project.hasOwnProperty('alt_img')
                        ?
                        <div style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}${project.alt_img.url})` }}
                             className="ProjectAltImg"/>
                        :
                        null
                    }
                      <div className="ProjectDescription">
                        <ReactMarkdown>
                          { project.description }
                        </ReactMarkdown>
                      </div>
                      <div className="ProjectGalleriaContainer">
                        {
                          !project.galleria_media
                            ?
                            <h2 className="NoImageMessage">Sorry - No examples images available</h2>
                            :
                            <ProjectGalleria { ...project.galleria_media! } />
                        }
                      </div>
                    </div>
                    <ContactBanner { ...contactBannerProps! } />
                  </>
                :
                  null
              }
          </>
      }
    </>
  )
}

export default Project;
