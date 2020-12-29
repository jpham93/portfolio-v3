import React, { useState } from 'react';
import './ProjectGalleria.scss';

// Components
import { Galleria } from 'primereact/galleria';
import ProjectGalleriaPropsModel from '../../models/ProjectGalleriaProps.model';

const ProjectGalleria = (projectGalleria: ProjectGalleriaPropsModel[]) => {

  const API_URL                       = process.env.REACT_APP_API_URL;
  const [galleriaRef, setGalleriaRef] = useState<Galleria | null>(null);  //@todo - hacky/deprecated way of using ref... Framework is just outdated
  const [index, setIndex]             = useState<number>(0);

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
      onClick={ showFullScreen }
    />
  );

  const thumbnailTemplate = (project: ProjectGalleriaPropsModel) => (
   <img
     src={ `${API_URL}${project.url}` }
     alt={ project.alternativeText ? project.alternativeText : '' }
   />
  );

  // TODO: update ref. Framework is using deprecated syntax
  return (
    <>
      <hr/>
      <h2 className="ProjectGalleriaHeader">Project Gallery</h2>
      <div className="SmallDivider" />
      <Galleria
        className="ComponentMode"
        responsiveOptions={ responsiveOptions }
        numVisible={ 5 }
        thumbnail={ thumbnailTemplate }
        item={ itemTemplate }
        value={ Object.values(projectGalleria) }
        circular
        transitionInterval={ 5000 }
        autoPlay
        showThumbnails
        showItemNavigators
        onItemChange={ (e) => setIndex(e.index) }
        activeIndex={ index }
      >
      </Galleria>
      <Galleria
        item={ itemTemplate }
        value={ Object.values(projectGalleria) }
        ref={ (el) => setGalleriaRef(el) }
        fullScreen
        showThumbnails={ false }
        showItemNavigators
        onItemChange={ (e) => setIndex(e.index) }
        activeIndex={ index }
      >
      </Galleria>
      <hr style={{ marginTop: '40px' }}/>
    </>
  );
}

export default ProjectGalleria;
