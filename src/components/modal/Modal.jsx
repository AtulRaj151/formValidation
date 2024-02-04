// Modal.js

import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onUpdateContent, selectedCard }) => {
  const [formData, setFormData] = useState({
    id: selectedCard?.id,
    name: selectedCard.name,
    email: selectedCard?.email,
    phone: selectedCard?.phone,
    website: selectedCard?.website,
  });

  const [validationMessages, setValidationMessages] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    validateField(field, value);
  };

  const handleUpdateContent = () => {
    // Check for empty fields and validate email
    const updatedMessages = {};
    for (const key in formData) {
      validateField(key, formData[key]);

      if (!formData[key]) {
        updatedMessages[key] = `This field is required.`;
      } else if (key === 'email' && !isValidEmail(formData[key])) {
        updatedMessages[key] = 'Please enter a valid email address.';
      }
    }

    // If there are validation messages, update the state and return
    if (Object.keys(updatedMessages).length > 0) {
      setValidationMessages(updatedMessages);
      return;
    }

    // Proceed with the update if all checks pass
    onUpdateContent(formData);
    onClose();
  };

  const validateField = (field, value) => {
    if (!value) {
      setValidationMessages((prevMessages) => ({ ...prevMessages, [field]: `This field is required.` }));
    } else if (field === 'email' && !isValidEmail(value)) {
      setValidationMessages((prevMessages) => ({ ...prevMessages, [field]: 'Please enter a valid email address.' }));
    } else {
      setValidationMessages((prevMessages) => ({ ...prevMessages, [field]: '' }));
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const fields = [
    { label: 'Name', key: 'name', type: 'text' },
    { label: 'Email', key: 'email', type: 'text' },
    { label: 'Phone', key: 'phone', type: 'text' },
    { label: 'Website', key: 'website', type: 'text' },
  ];

  useEffect(() => {
    // Disable scrolling when modal is open
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);


  return (
    <div className="overlay" style={{ display: isOpen ? 'flex' : 'none' }} onClick={onClose}>
      <div className="modal" style={{ display: isOpen ? 'block' : 'none' }} onClick={(e) => e.stopPropagation()}>
        <div className="heading">
          Basic Modal
          <span className="closeIcon" onClick={onClose}>
            <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true">
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
            </svg>
          </span>
        </div>
        <div>
          <form className="form-horizontal">
            {fields.map(({ label, key, type }) => (
              <div key={key} className="formItem">

                <div className='input-wrapper'>
                  <label htmlFor={key} className="required" title={label}>
                    <span style={{ color: 'red' }}>*</span>{label}:
                  </label>
                  <input
                    type={type}
                    id={key}
                    className="input"
                    value={formData[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                  {validationMessages[key] && (
                    <div className="validationMessage" style={{ color: 'red', marginTop: '8px' }}>
                      {validationMessages[key]}
                    </div>

                  )}
                </div>
              </div>
            ))}
          </form>
        </div>
        <div className="buttonContainer">
          <button className="cancelButton" onClick={onClose}>
            Cancel
          </button>
          <button className="okButton" onClick={handleUpdateContent}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
