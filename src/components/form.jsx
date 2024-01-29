import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate name (not greater than 30 characters or 3 words)
    if (formData.name.trim().length > 30) {
      alert('Name should not be greater than 30 characters.');
      return;
    }

    const nameWords = formData.name.trim().split(/\s+/);
    if (nameWords.length > 3) {
      alert('Name should not have more than 3 words.');
      return;
    }

    // Validate password (at least 10 characters, contains a special character)
    if (formData.password.length < 10) {
      alert('Password should be at least 10 characters long.');
      return;
    }

    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharacterRegex.test(formData.password)) {
      alert('Password should contain at least one special character.');
      return;
    }

    // Validate that Password and Repeat Password match
    if (formData.password !== formData.passwordRepeat) {
      alert('Password and Repeat Password should match.');
      return;
    }

    // Add logic to handle the registration (e.g., send data to a server)
    console.log('Registration data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Repeat Password:
        <input
          type="password"
          name="passwordRepeat"
          value={formData.passwordRepeat}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
