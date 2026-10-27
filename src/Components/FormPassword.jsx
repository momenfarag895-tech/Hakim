
import React, { useState } from "react";
import '../Style/formpas.css'
import { Link } from "react-router-dom";


const FormPassword = () => {
  const [formPas, setformPas] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [ok, setok] = useState("");

 const handleChange = (e) => {
  setformPas({
    ...formPas,
    [e.target.name]: e.target.value,
  });

  setError("");
  setok("");

};

const handleSubmit = (e) => {
  e.preventDefault();

  if (formPas.password !== formPas.confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  setError("");
  if (formPas.password == formPas.confirmPassword) {
    setok("Passwords match!");
    return;
  }
  setok("")

};

  return (
    <section className="register-section">
     <div className="register-card">
        <div className="form-hid  form-pas">
          <h1>Enter New Password</h1>
        </div>
      

      <form className="form" onSubmit={handleSubmit}>
           <input
            type="email"
            name="email"
            placeholder="Email or number phone"
            // value={formData.email}
            // onChange={handleChange}
            // autoComplete="email"
            required
          />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={formPas.password}
          onChange={handleChange}
          minLength={7}
          maxLength={9}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formPas.confirmPassword}
          onChange={handleChange}
          minLength={7}
          maxLength={9}
          required
        />
        {error && <p className="error-message">{error}</p>}
        {ok && <p className="error-message">{ok}</p>}


        <button className="register" type="submit">Reset Password</button>
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

export default FormPassword;
