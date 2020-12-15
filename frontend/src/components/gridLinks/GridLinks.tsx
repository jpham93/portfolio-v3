import React from 'react';
import './GridLinks.scss';
import SocialLinksModel from '../../models/SocialLinks.model';
import GridLinksModel from '../../models/GridLinks.model';

const GridLinksView = (
  { gridLinks, socialLinks }: { gridLinks: GridLinksModel[], socialLinks: SocialLinksModel[] },
) => {

  console.log(gridLinks);
  console.log(socialLinks);

  const gridTiles = gridLinks
    .filter(menuLink => menuLink.name.toLowerCase() !== 'home') // remove home from the array
    .map((menuLink, index) => {

      let colSize = 4;
      // special grid column sizes for first two links
      if (index === 0) {
        colSize = 7
      } else if (index === 1) {
        colSize = 5
      }

      return(
        <div key={index} className={`p-col-${colSize} GridTile`}>
          <span>{ menuLink.alt_title || menuLink.name }</span>
        </div>
      );
    });

  const socialLinkGridTiles = socialLinks.map((socialLink, index) => (
    <div key={index} className={`p-col-6 GridTile SocialGridTile`}>
      <span>{ socialLink.name }</span>
    </div>
  ));

  return(
    <div className="p-grid GridContainer">
      { gridTiles }
      <div className="p-col-4 p-grid GridTile">
        { socialLinkGridTiles }
      </div>
    </div>
  );
};

export default GridLinksView;
