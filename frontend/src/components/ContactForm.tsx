import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import './ContactForm.scss';
import { Dialog } from 'primereact/dialog';
import ContactFormPropsModel from '../models/ContactFormProps.model';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast, ToastMessage, ToastProps } from 'primereact/toast';

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
  const [inputValues, setInputValues]               = useState<{ name?: string, email?: string, details?: string }>({
    name: '',
    email: '',
    details: '',
  });
  const [inputErrors, setInputErrors]               = useState({ name: false, email: false, details: false });
  const [toastRef, setToastRef]                     = useState<Toast | null>(null);
  const [processingForm, setProcessingForm]         = useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      fetch(`${process.env.REACT_APP_API_URL}/contact-form`)
        .then(res => res.json())
        .then(data => {
          // merge default content w/ API content & eliminate undefined null properties from API
          setContactFormContent(prevState => _.mergeWith(
            {},
            prevState,
            data,
            (defaultContent, apiContent) => _.isUndefined(apiContent) ? defaultContent : apiContent)
          );
          setLoading(false);
        });
    }
  }, []);

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void  => {
    const { name, value } = e.currentTarget;
    setInputValues(prevState => ({ ...prevState, [name]: value}))
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    setProcessingForm(true);
    e.preventDefault();

    if (validateInputs()) {
      fetch(`${process.env.REACT_APP_API_URL}/contact-form-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValues)
      })
        .then(async res => {
          if (res.status === 200) {

            if (toastRef) {
              toastRef.show({
                severity: 'success',
                summary:  'Thank you!',
                detail:   'Your message has been successfully sent. I will respond as soon as I can!',
                life:     1000000
              });
            }

          } else {

            if(toastRef) {
              toastRef.show({
                severity: 'error',
                summary:  'Error',
                detail:   'Message could not be sent. Please try again later.'
              });
            }
            const { error, message }  = await res.json();
            const err                 = new Error(message);
            err.name                  = error;
            throw err;
          }
        })
        .catch(err => {
          console.error(err);
          setProcessingForm(false);
        });
    } else {
      setProcessingForm(false);
    }
  }

  /**
   * close form on success toast close
   */
  const handleCloseToast = (message: ToastMessage) => {
    if (message.severity === 'success') {
      setInputValues({ name: '', email: '', details: '' });
      setProcessingForm(false);
      setFormVisible(false);
    }
  };

  // Hacky way of injecting text into close icon. API does not provide a method to do so.
  const injectCloseText = () => {
    const closeButton = document.querySelector('button[aria-label="Close"].p-dialog-header-close');
    if (closeButton) {
      closeButton.innerHTML = '<span class="CloseString">Close&nbsp;</span>' + closeButton.innerHTML;
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
      position="top"
      dismissableMask
      // header="Close"
      ariaCloseIconLabel="Close"
      focusOnShow={ false }
      onShow={ injectCloseText }
    >
      <form onSubmit={handleSubmit}>
        <h1 className="ContactFormHeader">{ contactFormContent.header }</h1>
        <div className="SmallDivider" />
        <p className="ContactFormDescription">{ contactFormContent.description }</p>
        <div className="p-field ContactFormName">
          <InputText
            type="text"
            className={ `p-inputtext-lg ${inputErrors.name && 'p-invalid'} ContactFormInput` }
            placeholder={ contactFormContent.name_placeholder }
            onChange={ handleChange }
            name="name"
            value={ inputValues.name }
            disabled={ processingForm }
          />
          {
            inputErrors.name && <small id="username2-help" className="p-invalid p-d-block">Please enter a name.</small>
          }
        </div>
        <div className="p-field ContactFormEmail">
          <InputText
            type="email"
            className={ `p-inputtext-lg ${inputErrors.email && 'p-invalid'} ContactFormInput` }
            placeholder={ contactFormContent.email_placeholder }
            onChange={ handleChange }
            name="email"
            value={ inputValues.email }
            disabled={ processingForm }
          />
          {
            inputErrors.email && <small id="username2-help" className="p-invalid p-d-block">Please enter a valid email.</small>
          }
        </div>
        <div className="p-field ContactFormDetails">
          <InputTextarea
            className={ `p-inputtext-lg ${inputErrors.details && 'p-invalid'} ContactFormTextarea` }
            placeholder={ contactFormContent.details_placeholder }
            onChange={ handleChange }
            name="details"
            value={ inputValues.details }
            disabled={ processingForm }
          />
          {
            inputErrors.details && <small id="username2-help" className="p-invalid p-d-block">Please provide a description.</small>
          }
        </div>
        <Button
          className="ContactFormButton"
          label={ contactFormContent.button_text }
          disabled={ processingForm }
          iconPos="right"
          icon={processingForm ? 'pi pi-spin pi-spinner' : ''}
        />
        <Toast
          ref={(el) => setToastRef(el)}
          onRemove={ message => handleCloseToast(message) }
        />
      </form>
    </Dialog>
  );
}

export default ContactForm;
