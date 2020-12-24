import React, { useState } from 'react';
import './ProjectGalleria.scss';

// Components
import { Galleria } from 'primereact/galleria';
import ProjectGalleriaPropsModel from '../../models/ProjectGalleriaProps.model';

const ProjectGalleria = (projectGalleria: ProjectGalleriaPropsModel[]) => {

  const API_URL                       = process.env.REACT_APP_API_URL;
  const [galleriaRef, setGalleriaRef] = useState<Galleria | null>(null);  // hacky/deprecated way of using ref... Framework is just outdated

  /**
   * GALLERIA SETTINGS (STATIC)
   */
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  const showFullScreen = () => {
    if (galleriaRef) {
      galleriaRef.show();
    }
  }

  const itemTemplate = (project: ProjectGalleriaPropsModel) => (
    <img
      src={ `${API_URL}${project.url}` }
      alt={ project.alternativeText ? project.alternativeText : '' }
      style={{ width: '100%', display: 'block' }}
      onClick={ showFullScreen }
    />
  );

  const thumbnailTemplate = (project: ProjectGalleriaPropsModel) => (
   <img
     src={ `${API_URL}${project.url}` }
     alt={ project.alternativeText ? project.alternativeText : '' }
     style={{ width: '100%', display: 'block' }}
   />
  );

  // TODO: update ref. Framework is using deprecated syntax
  return (
    <>
      <h2>Project Gallery</h2>
      <Galleria
        responsiveOptions={ responsiveOptions }
        numVisible={ 5 }
        thumbnail={ thumbnailTemplate }
        item={ itemTemplate }
        value={ Object.values(projectGalleria) }
        circular
        transitionInterval={ 5000 }
        autoPlay
        showThumbnails
        changeItemOnIndicatorHover
      >
      </Galleria>
      <Galleria
        item={ itemTemplate }
        value={ Object.values(projectGalleria) }
        ref={ (el) => setGalleriaRef(el) }
        fullScreen
        showThumbnails={ false }
        showItemNavigators
      >
      </Galleria>
    </>
  );
}

export default ProjectGalleria;
