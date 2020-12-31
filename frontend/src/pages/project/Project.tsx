import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Project.scss';
import validateColor from 'validate-color';

// Components
import Header from '../../components/header/Header';
import ReactMarkdown from 'react-markdown';
import ProjectGalleria from '../../components/projectGalleria/ProjectGalleria';
import ContactBanner from '../../components/contactBanner/ContactBanner';
import ProjectCards from '../../components/projectCards/ProjectCards';

// Model
import ProjectStateModel from '../../models/ProjectState.model';
import HeaderPropsModel from '../../models/HeaderProps.model';
import ContactBannerPropsModel from '../../models/ContactBannerProps.model';
import ProjectCardsPropsModel from '../../models/ProjectCardsProps.model';
import { CSSTransition } from 'react-transition-group';
import Loading from '../../components/loading/Loading';

const Project = () => {

  // extract project_id from router parameter (provided by ProjectCard component)
  const { project_id } : { project_id: string }       = useParams();
  const [headerProps, setHeaderProps]                 = useState<HeaderPropsModel | null>(null);
  const [project, setProject]                         = useState<ProjectStateModel | null>(null);
  const [contactBannerProps, setContactBannerProps]   = useState<ContactBannerPropsModel | null>(null);
  const [projectCardsProps, setProjectCardsProps]     = useState<{ projectCardsProps: ProjectCardsPropsModel[] } | null>(null);
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
        let hProps: HeaderPropsModel = {
          title: { text: title, style: 'default' },
          headerType: 'large',
          subtitle: { text: type, backgroundColor: color }
        };
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

        /**
         * Fetch Projects 3 recent Projects (excluding this project) for Recent Projects cards
         * @Note - can't use Strapi filter because they don't have reverse built-in. May want to write this into our custom endpoint.
         */
        const projectsRes = await fetch(`${process.env.REACT_APP_API_URL}/projects?project_id_ne=${project_id}`);
        const projects    = await projectsRes.json();

        const recentProjects: ProjectCardsPropsModel[] = projects.reverse().slice(0,3).map((projectCard: any) => ({
          title:    projectCard.title,
          main_img: projectCard.main_img,
          project_category: {
            type: projectCard.project_category.type,
            color: projectCard.project_category.color
          }
        }));

        setProjectCardsProps({ projectCardsProps: recentProjects });

        setLoading(false);
      });

  }, []);

  return (
    <>
      <CSSTransition in={ loading } timeout={ 400 } classNames="Loading" unmountOnExit>
        <Loading headerType="large" />
      </CSSTransition>
      <CSSTransition in={ !loading } timeout={ 500 } classNames="Content" mountOnEnter>
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
                          <h2 className="NoImagesMessage">Sorry - No examples images available</h2>
                          :
                          <ProjectGalleria { ...project.galleria_media! } />
                      }
                    </div>
                  </div>
                  <div className="RecentProjectsContainer">
                    <h2 className="RecentProjectsHeader">Recent Projects</h2>
                    <div className="SmallDivider" />
                    <ProjectCards { ...projectCardsProps! } />
                  </div>
                  <ContactBanner { ...contactBannerProps! } />
                </>
              :
                null
            }
          </>
        </CSSTransition>
    </>
  )
}

export default Project;
