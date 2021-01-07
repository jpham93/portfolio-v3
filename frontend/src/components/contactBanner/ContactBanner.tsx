import React, { useState } from 'react';
import './ContactBanner.module.scss';
import ContactBannerPropsModel from '../../models/ContactBannerProps.model';
import ContactForm from '../contactForm/ContactForm';

const ContactBanner = ({ header, button_text, background_color, button_color }: ContactBannerPropsModel) => {

  const backgroundStyle               = background_color ? { backgroundColor: background_color } : {};
  const buttonStyle                   = button_color ? { backgroundColor: button_color } : {};
  const [formVisible, setFormVisible] = useState<boolean>(false);

  // const closeIcon =

  return (
    <div className="ContactBanner" style={ backgroundStyle }>
      <h2 className="ContactBannerHeader">{ header }</h2>
      <button
        className="ContactBannerButton"
        style={ buttonStyle }
        onClick={ () => setFormVisible(prevState => !prevState ) }
      >
        { button_text }
      </button>
      <ContactForm formVisible={ formVisible } setFormVisible={ setFormVisible }/>
    </div>
  );
}

export default ContactBanner;
