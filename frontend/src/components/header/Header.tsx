import React from 'react';
import HeaderPropsModel from '../../models/HeaderProps.model';
import './Header.scss';
import validateColor from 'validate-color';

const Header = ({ title, header_img, headerType, header_color }: HeaderPropsModel) => {

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

  const titleFontSize = headerType === 'large'
    ? { fontSize: 'var(--header-font-size-home)', fontWeight: 300 }
    : { fontSize: 'var(--header-font-size-default)', fontWeight: 200 };

  const titleStyle = { ...titleMargin, ...titleFontSize };

  return(
    <div className="Header" style={ headerStyle }>
      <h1 className="HeaderTitle" style={ titleStyle }>{ headerType === 'large' ? title : title.toUpperCase() }</h1>
    </div>
  );
};

export default Header;
