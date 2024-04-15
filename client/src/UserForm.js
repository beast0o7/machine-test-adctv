// UserForm.js
import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const UserForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phoneNumber: '',
    address: '',
    email:''
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const submitForm = () => {
    console.log('Form submitted:', formData);
    // Submit the form data to the server or perform further actions here
  };

  switch (step) {
    case 1:
      return <StepOne formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    case 2:
      return <StepTwo formData={formData} setFormData={setFormData} prevStep={prevStep} nextStep={nextStep} />;
    case 3:
      return <StepThree formData={formData} setFormData={setFormData} prevStep={prevStep} submitForm={submitForm} />;
    default:
      return null;
  }
};

export default UserForm;
