import React from 'react';
import HeaderPropsModel from '../../models/HeaderProps.model';
import './Header.scss';

const Header = ({ title, header_img, height }: HeaderPropsModel) => {

  // check to make sure image exist from API
  let imgUrl = null;
  if (header_img !== null) {
    imgUrl = process.env.REACT_APP_API_URL + header_img.url;
  }

  const headerStyle = imgUrl
    ? { backgroundImage: `url(${imgUrl})` }
    : { background: '#0A3D62' };

  return(
    <div className="Header" style={ headerStyle }>
      <h1 className="HeaderTitle">{ title }</h1>
    </div>
  );
};

export default Header;
