import React from 'react';
import HeaderPropsModel from '../../models/HeaderProps.model';
import './Header.scss';

const Header = ({ title, header_image, height }: HeaderPropsModel) => {
  return(
    <div className="Header" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL + header_image.url})` }}>
      <h1 className="HeaderTitle">{ title }</h1>
    </div>
  );
};

export default Header;
