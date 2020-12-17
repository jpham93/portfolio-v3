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

      // Determine tile's background color based on API values
      let backgroundStyle: {};
      if (menuLink.color && validateColor(menuLink.color)) {
        backgroundStyle = { backgroundColor: menuLink.color };
      } else {
        backgroundStyle = { backgroundColor: defaultGridColors[index] };
      }

      // Determine background image
      let backgroundImage: {} = {};
      if (menuLink.link_img) {
        const imgUrl = process.env.REACT_APP_API_URL + menuLink.link_img.url;
        backgroundImage = { backgroundImage: `url(${imgUrl})` };
        backgroundStyle = {};
      }

      return(
        <div key={ index } className={ `p-md-${colSize} p-col-12 GridTile` } style={ backgroundStyle }>
          <div className="GridTileImg" style={ backgroundImage }></div>
          <span className="GridTileText">{ menuLink.alt_title || menuLink.name }</span>
        </div>
      );
    });

  const socialLinkGridTiles = socialLinks.map((socialLink, index) => {
    // Determine tile's content based on API "icon" values
    let content: string | JSX.Element = socialLink.name.toLocaleUpperCase();
    if (socialLink.icon) {
      const imgUrl = process.env.REACT_APP_API_URL + socialLink.icon.url;
      content = <img className="SocialLinkIcon" src={ imgUrl } />;
    }

    // Determine tile's background color based on API "color" values
    let backgroundStyle: {} = {}; // assign to allow for spread regardless of condition
    if (socialLink.color && validateColor(socialLink.color)) {
      backgroundStyle = { ...backgroundStyle, backgroundColor: socialLink.color };
    } else {
      backgroundStyle = { ...backgroundStyle, backgroundColor: defaultSocialGridColors[index] };
    }

    return(
      <div key={index} className="p-col-6 GridTile SocialGridTile" style={ backgroundStyle }>
        <span className="SocialLinkContent">{ content }</span>
      </div>
    );
  });

  return(
    <div className="p-grid p-col-12 GridContainer">
      { gridTiles }
      <div className="p-md-4 p-col-12 p-grid GridTile SocialGridContainer">
        { socialLinkGridTiles }
      </div>
    </div>
  );
};

export default GridLinksView;
