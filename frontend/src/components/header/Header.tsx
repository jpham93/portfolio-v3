import React from 'react';
import HeaderPropsModel from '../../models/HeaderProps.model';
import './Header.scss';

const Header = ({ title, header_img, height, isHome }: HeaderPropsModel) => {

  // check to make sure image exist from API
  let imgUrl = null;
  if (header_img) {
    imgUrl = process.env.REACT_APP_API_URL + header_img.url;
  }

  const headerBackground = imgUrl
    ? { backgroundImage: `url(${imgUrl})` }
    : { backgroundColor: 'var(--primary-color)' };

  const headerHeight = height
    ? { height: `${height}px` }
    : { height: '275px' };

  const headerStyle = { ...headerBackground, ...headerHeight };

  const titleMargin = !height  // if there is no custom height,
    ? { marginTop: '2rem' }
    : {};

  const titleFontSize = isHome
    ? { fontSize: 'var(--header-font-size-home)', fontWeight: 300 }
    : { fontSize: 'var(--header-font-size-default)', fontWeight: 200 };

  const titleStyle = { ...titleMargin, ...titleFontSize };

  return(
    <div className="Header" style={ headerStyle }>
      <h1 className="HeaderTitle" style={ titleStyle }>{ title }</h1>
    </div>
  );
};

export default Header;
