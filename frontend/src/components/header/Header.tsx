import React from 'react';
import HeaderPropsModel from '../../models/HeaderProps.model';
import './Header.scss';

const Header = ({ title, header_img, height, headerRef }: HeaderPropsModel) => {

  // check to make sure image exist from API
  let imgUrl = null;
  if (header_img !== null) {
    imgUrl = process.env.REACT_APP_API_URL + header_img.url;
  }

  const headerBackground = imgUrl
    ? { backgroundImage: `url(${imgUrl})` }
    : { backgroundColor: 'var(--primary-color)' };

  const headerHeight = height
    ? { height: `${height}px` }
    : { height: '275px' };

  const headerStyle = { ...headerBackground, ...headerHeight };

  return(
    <div className="Header" style={ headerStyle } ref={ headerRef }>
      <h1 className="HeaderTitle">{ title }</h1>
    </div>
  );
};

export default Header;
