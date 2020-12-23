import React, { useEffect, useState } from 'react';
import './ProjectGalleria.scss';

// Components
import { Galleria } from 'primereact/galleria';

const ProjectGalleria = () => {

  const [images, setImages] = useState<any[]>([]);

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

  const itemTemplate = (url: string) => {
    return <img src={url} style={{ width: '100%', display: 'block' }} />;
  }

  const thumbnailTemplate = (url: string) => (
   <img src={url} style={{ width: '100%', display: 'block' }} />
  );

  return (
    <Galleria
      responsiveOptions={ responsiveOptions }
      numVisible={ 5 }
      thumbnail={ thumbnailTemplate }
      item={ itemTemplate }
      value={ images }
      autoPlay
      circular
      transitionInterval={ 5000 }
    >
    </Galleria>
  );
}

export default ProjectGalleria;
