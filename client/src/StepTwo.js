import React, { useState } from 'react';
import axios from 'axios';

const StepTwo = ({ formData, setFormData, prevStep, nextStep }) => {
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const checkUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/check?email=${formData.email}&phoneNumber=${formData.phoneNumber}`);
            return response;
        } catch (error) {
            // Handle error
            throw new Error('Failed to save user');
        }
    };

    const saveUser = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/users', formData);
            // Handle successful response
            console.log('User saved successfully', response.data);
        } catch (error) {
            // Handle error
            throw new Error('Failed to save user');
        }
    };




    const validateStep = async () => {
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const errors = {};

        if (!phoneRegex.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Phone number must be 10 digits';
        }

        if (!emailRegex.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!errors.email || !errors.phoneNumber) {
            let data = await checkUser(formData);
            if (data.data.emailUsed) {
                errors.email = 'Email Already Used';
            };
            if (data.data.phoneNumberUsed) {
                errors.phoneNumber = 'Phone Number Already Used';
            };
        }

        if (Object.keys(errors).length === 0) {
            // No validation errors, proceed to next step
            await saveUser(formData);
            nextStep();
        } else {
            // Validation errors found, update state
            setErrors(errors);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Step Two</h2>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input type="tel" className={`form-control ${errors.phoneNumber && 'is-invalid'}`} name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                        {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                    </div>
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} name="email" value={formData.email} onChange={handleChange} required />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <button className="btn btn-primary mr-2" onClick={prevStep}>Previous</button>
                    <button className="btn btn-primary" onClick={validateStep}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default StepTwo;
