import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegistrationForm() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isValidInput, setIsValidInput] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'userName') {
      setUserName(value);
    } else if (name === 'userPassword') {
      setUserPassword(value);
    } else if (name === 'userEmail') {
      setUserEmail(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateInputs = () => {
      let isValid = true;

      const validateField = (fieldName, value, min, max) => {
        if (!value) {
          setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: `Please enter your ${fieldName}` }));
          isValid = false;
        } else if (value.length < min || value.length > max) {
          setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: `Enter ${min}-${max} characters` }));
          isValid = false;
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
        }
      };

      validateField('name', userName, 3, 30);
      validateField('password', userPassword, 10, Infinity);
      validateField('email', userEmail, 1, Infinity);
      validateField('confirmPassword', confirmPassword, 1, Infinity);

      return isValid;
    };

    if (validateInputs()) {
      setIsValidInput(true);
      console.log('Registration successful!');
      // Additional logic for submitting data to the server or redirecting can be added here.
    } else {
      setIsValidInput(false);
    }
  };

  return (
    <div id='registrationForm'>
      <h1 id='formTitle'>Create Your Account</h1>
      <form onSubmit={handleSubmit}>
        <div id='formFields'>
          <input type="text" placeholder='Your name' id='nameField' onChange={handleInputChange} name='userName' />
          <p id='error'>{errors.name}</p>
          <input type="email" placeholder='Your email' id='emailField' onChange={handleInputChange} name='userEmail' />
          <p id='error'>{errors.email}</p>
          <input type="password" placeholder='Your password' id='passwordField' onChange={handleInputChange} name='userPassword' />
          <p id='error'>{errors.password}</p>
          <input
            type="password"
            placeholder='Confirm your password'
            onChange={handleInputChange}
            id='confirmPasswordField'
            name='confirmPassword'
          />
          <p id='error'>{errors.confirmPassword}</p>
        </div>

        <div id='submitButton'>
          <button id='signupBtn' type='submit'>
            SIGN UP
          </button>
        </div>
        
      </form>
    </div>
  );
}

export default RegistrationForm;
