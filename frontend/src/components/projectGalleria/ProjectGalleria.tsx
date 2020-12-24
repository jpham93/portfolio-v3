import React, { useEffect, useState } from 'react';
import './ProjectGalleria.scss';

// Components
import { Galleria } from 'primereact/galleria';

const ProjectGalleria = () => {

  const [images, setImages]           = useState<any[]>([]);
  const [galleriaRef, setGalleriaRef] = useState<Galleria | null>(null);  // hacky/deprecated way of using ref... Framework is just outdated

  useEffect(() => {
    for (let i = 1; i <= 10; i++) {
      fetch(`https://picsum.photos/id/${i}/500/940`)
        .then(res => {
          return res.url;
        })
        .then(data => {
          // @ts-ignore
          setImages((prevState) => [...prevState, data]);
        })
    }
  }, []);

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

  const itemTemplate = (url: string) => (
    <img
      src={ url }
      style={{ width: '100%', display: 'block' }}
      onClick={ showFullScreen }
    />
  );

  const thumbnailTemplate = (url: string) => (
   <img
     src={ url }
     style={{ width: '100%', display: 'block' }}
   />
  );

  // TODO: update ref. Framework is using deprecated syntax
  return (
    <>
      <Galleria
        responsiveOptions={ responsiveOptions }
        numVisible={ 5 }
        thumbnail={ thumbnailTemplate }
        item={ itemTemplate }
        value={ images }
        circular
        transitionInterval={ 5000 }
        autoPlay
        showThumbnails
        showIndicators
        changeItemOnIndicatorHover
      >
      </Galleria>
      <Galleria
        numVisible={ 5 }
        thumbnail={ thumbnailTemplate }
        showItemNavigators
        item={ itemTemplate }
        value={ images }
        ref={ (el) => setGalleriaRef(el) }
        fullScreen
        showThumbnails={ false }
      >
      </Galleria>
    </>
  );
}

export default ProjectGalleria;
