import React from 'react';
import HeaderPropsModel from '../../models/HeaderProps.model';
import './Header.scss';
import validateColor from 'validate-color';

const Header = ({ title, header_img, headerType, header_color, subtitle }: HeaderPropsModel) => {

  // check to make sure image exist from API
  let imgUrl = null;
  if (header_img) {
    imgUrl = process.env.REACT_APP_API_URL + header_img.url;
  }

  const headerBackground = imgUrl
    ? { backgroundImage: `url(${imgUrl})` }
    : { backgroundColor: 'var(--primary-color)' };

  const headerHeight = { height: `var(--header-height-${headerType})` };

  const headerColor = !header_img && header_color && validateColor(header_color)
    ? { backgroundColor: header_color }
    : {};

  const headerStyle = { ...headerBackground, ...headerHeight, ...headerColor };

  const titleMargin = headerType === 'default'
    ? { marginTop: '2.5rem' }
    : {};

  //@note - workaround, TypeScript can't type it if defined in object for some reason.
  const uppercase: 'uppercase' = 'uppercase';

  const titleFontSize = title.style === 'large'
    ? { fontSize: 'var(--header-font-size-home)', fontWeight: 300 }
    : { fontSize: 'var(--header-font-size-default)', fontWeight: 200, textTransform: uppercase };

  const titleStyle = { ...titleMargin, ...titleFontSize };

  return(
    <div className="Header" style={ headerStyle }>
      <h1 className="HeaderTitle" style={ titleStyle }>{ title.text }</h1>
      {
        subtitle
          ?
          <h2 className="HeaderSubTitle">
            <span
              className={subtitle.backgroundColor ? "p-tag p-tag-rounded" : ""}
              style={{ backgroundColor: subtitle.backgroundColor }}
            >
              { subtitle.text }
            </span>
          </h2>
          :
          null
      }
    </div>
  );
};

export default Header;
