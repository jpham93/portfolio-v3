import React, { useEffect, useState } from 'react';
import './GridLinks.scss';
import SocialLinksModel from '../../models/SocialLinks.model';
import GridLinksModel from '../../models/GridLinks.model';
import validateColor from 'validate-color';
import { NavLink } from 'react-router-dom';
import ContactForm from '../ContactForm';

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

const GridLinksView = ({ gridLinks, socialLinks }: { gridLinks: GridLinksModel[], socialLinks: SocialLinksModel[] }) => {

  const [formVisible, setFormVisible] = useState<boolean>(false);

  // Cascading Fade-In Animation effect
  useEffect(() => {
    setTimeout(() => {
      const gridTiles = document.querySelectorAll('.GridTile');
      for (let i = 0; i < 9; i++) {
        gridTiles[i].classList.add(`FadeCascade-${i}`);
      }
    }, 150);
  });

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
        const imgUrl = menuLink.link_img.url;
        backgroundImage = { backgroundImage: `url(${imgUrl})` };
        backgroundStyle = { backgroundColor: '#fff' };
      }

      // if last index aka "Contact", create a different behavior for link (opens Contact Form)
      const lastIndex = gridLinks.length - 2;

      return(
        <NavLink
          to={ index !== lastIndex ? `/${menuLink.path}` : '#' }
          key={ index }
          className={ `p-md-${colSize} p-col-12 GridTile` }
          style={ backgroundStyle }
          onClick={ index !== lastIndex ? () => null : () => setFormVisible(true) }
        >
          <div className="GridTileImg" style={backgroundImage} />
          <span className="GridTileText">{ menuLink.alt_title || menuLink.name }</span>
        </NavLink>
      );
    });

  const socialLinkGridTiles = socialLinks.map((socialLink, index) => {
    // Determine tile's content based on API "icon" values
    let content: string | JSX.Element = socialLink.name.toLocaleUpperCase();
    if (socialLink.icon) {
      const imgUrl = socialLink.icon.url;
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
      <a href={ `${socialLink.url}` } target="_blank" key={ index } className="p-col-6 GridTile SocialGridTile" style={ backgroundStyle }>
        <span className="SocialLinkContent">{ content }</span>
      </a>
    );
  });

  return(
    <div className="p-grid p-col-12 GridContainer LargeHeaderOverlap">
      { gridTiles }
      <div className="p-md-4 p-col-12 p-grid GridTile SocialGridContainer">
        { socialLinkGridTiles }
      </div>
      <ContactForm formVisible={ formVisible } setFormVisible={ setFormVisible }/>
    </div>
  );
};

export default GridLinksView;
