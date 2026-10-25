
import React, { useState } from "react";
import '../Style/formpas.css'

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
    <section className="formpas">
      <p>Enter New Password</p>

      <form className="formpass" onSubmit={handleSubmit}>
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
    </section>
  );
};

export default FormPassword;
