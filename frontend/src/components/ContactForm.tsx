import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './ContactForm.scss';
import { Dialog } from 'primereact/dialog';
import ContactFormPropsModel from '../models/ContactFormProps.model';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

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

  const [loading, setLoading]                       = useState<boolean>(true);
  const [contactFormContent, setContactFormContent] = useState(CONTENT);
  const [inputValues, setInputValues] = useState<{ name?: string, email?: string, details?: string }>({
    name: '',
    email: '',
    details: '',
  });
  const [inputErrors, setInputErrors] = useState({ name: false, email: false, details: false })

  useEffect(() => {
    if (loading) {
      console.log('fetching...');
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
          setLoading(false);
        });
    }
  }, []);

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void  => {
    const { name, value } = e.currentTarget;
    setInputValues(prevState => ({ ...prevState, [name]: value}))
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      console.log(inputValues);
    }
  }

  const validateInputs = (): boolean => {
    let valid: boolean = true;

    if (!inputValues.name) {
      setInputErrors(prevState => ({ ...prevState, name: true} ));
      valid = false;
    } else {
      setInputErrors(prevState => ({ ...prevState, name: false }));
    }

    if (!inputValues.details) {
      setInputErrors(prevState => ({ ...prevState, details: true }));
      valid = false;
    } else {
      setInputErrors(prevState => ({ ...prevState, details: false }));
    }
    const emailRegex = /^.+@.+\..+$/;
    if (!inputValues.email || !emailRegex.test(inputValues.email)) {
      setInputErrors(prevState => ({ ...prevState, email: true }));
      valid = false;
    } else {
      setInputErrors(prevState => ({ ...prevState, email: false }));
    }
    return valid;
  }

  return (
    <Dialog
      visible={ formVisible }
      onHide={() => {
        setFormVisible(false);
      }}
      className="p-fluid"
    >
      <form onSubmit={handleSubmit}>
        <h1 className="ContactFormHeader">{ contactFormContent.header }</h1>
        <div className="SmallDivider" />
        <p className="ContactFormDescription">{ contactFormContent.description }</p>
        <div className="p-field ContactFormName">
          <InputText
            type="text"
            className={ `p-inputtext-lg ${inputErrors.name && 'p-invalid'}` }
            placeholder={ contactFormContent.name_placeholder }
            onChange={ handleChange }
            name="name"
            value={ inputValues.name }
          />
          {
            inputErrors.name && <small id="username2-help" className="p-invalid p-d-block">Please enter a name.</small>
          }
        </div>
        <div className="p-field ContactFormEmail">
          <InputText
            type="email"
            className={ `p-inputtext-lg ${inputErrors.email && 'p-invalid'}` }
            placeholder={ contactFormContent.email_placeholder }
            onChange={ handleChange }
            name="email"
            value={ inputValues.email }
          />
          {
            inputErrors.email && <small id="username2-help" className="p-invalid p-d-block">Please enter a valid email.</small>
          }
        </div>
        <div className="p-field ContactFormDetails">
          <InputTextarea
            className={ `p-inputtext-lg ${inputErrors.details && 'p-invalid'}` }
            placeholder={ contactFormContent.details_placeholder }
            onChange={ handleChange }
            name="details"
            value={ inputValues.details }
          />
          {
            inputErrors.details && <small id="username2-help" className="p-invalid p-d-block">Please provide a description.</small>
          }
        </div>
        <Button>{ contactFormContent.button_text }</Button>
      </form>
    </Dialog>
  );
}

export default ContactForm;
