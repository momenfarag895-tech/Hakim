import React from 'react'
import { Link } from "react-router-dom";

const FormLogIn = () => {
  return (
    
    <section className="register-section">
    <div className="register-card">
        
      <div className="form-hid">
        <h1>Log in</h1>
        <p>Please log in</p>
      </div>

      
        <form className="form">
          <input 
            type="email" 
            placeholder="Email" 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
          />
          <Link to="/NewPassword" className="password-link">
            Go to New Password
          </Link>
           <div className="form-buttons">
            <Link to="/register" className="login-btn">
              register
            </Link>

            <button type="submit" className="register-btn">
              Login
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
                already have an account? <Link to="/register">Register</Link>
              </p>
    </div>
    </section>
  
  )
}

export default FormLogIn
