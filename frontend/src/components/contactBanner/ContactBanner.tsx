import React from 'react';
import './ContactBanner.scss';
import ContactBannerPropsModel from '../../models/ContactBannerProps.model';

const ContactBanner = ({ header, button_text, background_color, button_color }: ContactBannerPropsModel) => {

  const backgroundStyle = background_color ? { backgroundColor: background_color } : {};
  const buttonStyle     = button_color ? { backgroundColor: button_color } : {};

  return (
    <div className="Banner" style={ backgroundStyle }>
      <h2 className="ContactBannerTitle">{ header }</h2>
      <button className="ContactBannerButton" style={ buttonStyle }>{ button_text.toUpperCase() }</button>
    </div>
  );
}

export default ContactBanner;
