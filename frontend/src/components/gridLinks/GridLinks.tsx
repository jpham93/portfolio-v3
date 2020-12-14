import React from 'react';
import './GridLinks.scss';
import SocialLinksModel from '../../models/SocialLinks.model';
import GridLinksModel from '../../models/GridLinks.model';

const GridLinksView = (
  { gridLinks, socialLinks }: { gridLinks: GridLinksModel[], socialLinks: SocialLinksModel[] },
) => {

  console.log(gridLinks);
  console.log(socialLinks);

  const gridTiles = gridLinks.map((menuLink, index) => {

    let colSize = 3;
    // special grid column sizes for first two links
    if (index === 0) {
      colSize = 5
    } else if (index === 1) {
      colSize = 4
    }

    return(
      <div key={index} className={`p-col${colSize} p-sm-col-12`}>
        <span>{ menuLink.alt_title || menuLink.name }</span>
      </div>
    );
  });

  const socialLinkGrid = socialLinks.map((socialLink, index) => {
    return 0;
  });

  return(
    <div className="p-grid">
      { gridTiles }
      { socialLinkGrid }
    </div>
  );
};

export default GridLinksView;
