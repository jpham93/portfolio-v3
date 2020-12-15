import React from 'react';
import './GridLinks.scss';
import SocialLinksModel from '../../models/SocialLinks.model';
import GridLinksModel from '../../models/GridLinks.model';
import validateColor from 'validate-color';

const defaultGridColors = [
  '#CD5C5C',
  '#191970',
  '#800080',
  '#A52A2A',
  '#000080',
  '#FF4500',
  '#B0E0E6'
];

const defaultSocialGridColors = [
  '#55acee',
  '#3765a3',
  '#ffb04f',
  '#202020'
];

const GridLinksView = (
  { gridLinks, socialLinks }: { gridLinks: GridLinksModel[], socialLinks: SocialLinksModel[] },
) => {

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

      // Determine tile's background based on API values (Order: image, given color, default color)
      let backgroundStyle: {};
      if (menuLink.link_img) {
        const imgUrl = process.env.REACT_APP_API_URL + menuLink.link_img.url;
        backgroundStyle = { backgroundImage: `url(${imgUrl})`, background: 'inherit' };
      } else if (menuLink.color && validateColor(menuLink.color)) {
        backgroundStyle = { background: menuLink.color };
      } else {
        backgroundStyle = { background: defaultGridColors[index] };
      }

      return(
        <div key={ index } className={ `p-col-${colSize} GridTile` } style={ backgroundStyle }>
          <span>{ menuLink.alt_title || menuLink.name }</span>
        </div>
      );
    });

  const socialLinkGridTiles = socialLinks.map((socialLink, index) => {
    // Determine tile's background & content based on API values
    let backgroundStyle: {};
    if (socialLink.icon) {
      const imgUrl = process.env.REACT_APP_API_URL + socialLink.icon.url
      backgroundStyle = { backgroundImage: `url(${imgUrl})`, background: 'inherit' };
    } else if (socialLink.color) {
      backgroundStyle = { background: socialLink.color };
    } else {
      backgroundStyle = { background: defaultGridColors[index] };
    }

    return(
      <div key={index} className={`p-col-6 GridTile SocialGridTile`}>
        <span>{socialLink.name}</span>
      </div>
    );
  });

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
