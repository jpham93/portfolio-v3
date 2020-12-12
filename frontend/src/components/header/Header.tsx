import React from 'react';
import HeaderPropsModel from '../../models/HeaderProps.model';
import Menu from '../menu/Menu';

const Header = ({title, header_image, height}: HeaderPropsModel) => {

  return(
    <div style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL + header_image.url})` }}>
      <h1>{ title }</h1>
    </div>
  );
};

export default Header;
