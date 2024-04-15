// StepThree.js
import axios from 'axios';
import React, { useState } from 'react';

const StepThree = ({ formData, setFormData, prevStep, submitForm }) => {
  const [addressFields, setAddressFields] = useState([{ id: 1, value: '' }]); // State to hold address fields

  const saveAddress = async () => {
    try {
        const response = await axios.post('http://localhost:8000/api/users/address', formData);
        // Handle successful response
        console.log('User saved successfully', response.data);
    } catch (error) {
        // Handle error
        console.error('Failed to save user');
    }
};


  const handleChange = (e, id) => {
    const newAddressFields = addressFields.map(field =>
      field.id === id ? { ...field, value: e.target.value } : field
    );
    setAddressFields(newAddressFields);
  };

  const addAddressField = () => {
    const newId = addressFields.length + 1;
    setAddressFields([...addressFields, { id: newId, value: '' }]);
  };

  const removeAddressField = (id) => {
    setAddressFields(addressFields.filter(field => field.id !== id));
  };

  const validateStep = async () => {
    let address = addressFields.filter(field => field.value.trim() !== '').map(e=>e.value.trim());

    console.log("address",address)
    if (address.length) {
      formData.address = address;
      await saveAddress(formData)
      submitForm();
      alert("Your request was recieved successfully")
      window.location.reload()
    } else {
      alert('Please add at least one address field.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Step Three</h2>
          {addressFields.map(addressField => (
            <div className="form-group" key={addressField.id}>
              <label>Address {addressField.id}:</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={addressField.value}
                  onChange={(e) => handleChange(e, addressField.id)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => removeAddressField(addressField.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="btn btn-success mr-2" type="button" onClick={addAddressField}>
            Add Address
          </button>
          <button className="btn btn-primary" onClick={validateStep}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
