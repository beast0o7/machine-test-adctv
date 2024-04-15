// StepOne.js
import React,{useEffect} from 'react';
import axios from 'axios';

const StepOne = ({ formData, setFormData, nextStep }) => {
    useEffect(() => {
        hitApi();
      }, []);
    
      const hitApi = async () => {
        try {
          await axios.post('http://localhost:8000/api/logs');
        } catch (error) {
          console.error('Error hitting API:', error);
        }
      };
    
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateStep = () => {
    // Perform validation for Step One here
    // For simplicity, just check if required fields are filled
    if (formData.firstName && formData.lastName && formData.dob) {
      nextStep();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Step One</h2>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <button className="btn btn-primary" onClick={validateStep}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
