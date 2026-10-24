import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Style/FormRegist/FormRegist.css';

const FormRegist = () => {
const [formData, setFormData] = useState({
fullname: '',
email: '',
password: '',
confirmPassword: '',
});

const [error, setError] = useState('');

const handleSubmit = (e) => {
e.preventDefault();


if (formData.password !== formData.confirmPassword) {
  setError('Passwords do not match');
  return;
}

setError('');

// Registration logic can be added here.
console.log('Registration data:', formData);


};

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

return (
   <section className="register-section">
     <div className="register-card">
       <div className="form-hid">
         <h1>Register</h1> 
         <p>Please enter details to register</p> 
         </div>


    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          autoComplete="name"
          required
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email or number phone"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        autoComplete="new-password"
        minLength={7}
        maxLength={9}
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={formData.confirmPassword}
        onChange={handleChange}
        autoComplete="new-password"
        minLength={7}
        maxLength={9}
        required
      />


      {error && <p className="error">{error}</p>}

      <div className="form-buttons">
        <Link to="/login" className="login-btn">
          Login
        </Link>

        <button type="submit" className="register-btn">
          Register
        </button>
      </div>
    </form>

    <div className="social-divider">
      <span>Or</span>
    </div>

    <div className="social-icons">
      <button
        type="button"
        className="social-icon facebook-icon"
        aria-label="Continue with Facebook"
      >
        <i className="fa-brands fa-facebook-f"></i>
      </button>

      <button
        type="button"
        className="social-icon google-icon"
        aria-label="Continue with Google"
      >
        <i className="fa-brands fa-google"></i>
      </button>
    </div>

    <p className="login-footer">
      already have an account? <Link to="/login">Login</Link>
    </p>
  </div>
</section>


);
};

export default FormRegist;
