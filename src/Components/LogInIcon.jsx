import React from 'react'
import login from '../assets/login.png'

const LogInIcon = () => {
  return (
        <>
              <img src="/iconMain.png" alt="Hakim" className="main-icon"
       />
         <div className="register-icon">
       
    
    
      <div className="register-image-wrapper">
        <div className="register-shape"></div>
        <img src={login} alt="Register Illustration" />
      </div>
    </div>
    </>
    
       
  )
}

export default LogInIcon