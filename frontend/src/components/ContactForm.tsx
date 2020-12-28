import React from 'react';
import './ContactForm.scss';
import { Dialog } from 'primereact/dialog';
import ContactFormPropsModel from '../models/ContactFormProps.model';

const ContactForm = (props: any) => {  //@todo - strong type props & childRef
  return (
    <Dialog
      visible={ props.formVisible }
      onHide={() => {
        props.setFormVisible(false);
      }}
    >
      <h1>Contact Form</h1>
    </Dialog>
  );
}

export default ContactForm;
