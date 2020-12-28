import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './ContactForm.scss';
import { Dialog } from 'primereact/dialog';
import ContactFormPropsModel from '../models/ContactFormProps.model';

// Fill in default. If API contains content, change to user-defined content
const CONTENT = {
  header: 'Get in Touch',
  description: 'Thank you for your interest! Please fill out the form below if you would like to work together.',
  name_placeholder: 'Enter your name',
  email_placeholder: 'Enter your email',
  details_placeholder: 'What are your project details',
  button_text: 'Send'
}

const ContactForm = ({ formVisible, setFormVisible }: ContactFormPropsModel) => {  //@todo - strong type props & childRef

  const [contactFormContent, setContactFormContent] = useState(CONTENT);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/contact-form`)
      .then(res => res.json())
      .then(data => {
        // merge default content w/ API content & eliminate undefined null properties from API
        setContactFormContent(prevState => _.mergeWith(
          {},
          prevState,
          data,
          (defaultContent, apiContent) => _.isUndefined(apiContent) ? defaultContent : apiContent)
        )
      })
  }, []);

  return (
    <Dialog
      visible={ formVisible }
      onHide={() => {
        setFormVisible(false);
      }}
    >
      <h1>Contact Form</h1>
    </Dialog>
  );
}

export default ContactForm;
