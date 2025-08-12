import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>LOGIN</h1>

        <div className="input-group">
          <label htmlFor="email">EMAIL</label>
          <input type="email" id="email" placeholder="your@email.com" />
        </div>

        <div className="input-group">
          <label htmlFor="password">PASSWORD</label>
          <input type="password" id="password" placeholder="••••••••" />
        </div>

        <button type="submit">SIGN IN</button>

        <div className="divider">OR</div>

        <div className="social-login">
          <div className="social-btn">G</div>
          <div className="social-btn">F</div>
          <div className="social-btn">X</div>
        </div>

        <div className="footer">
            <p>Don't have an account?</p>
          <Link to="/register" className="register-link">
            Sign Up
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
