import { useState } from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { GoogleLogin } from '@react-oauth/google';
import "./style.scss";
const { Title } = Typography;
const Register = () => {
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
          const token = credentialResponse.credential;
          console.log("Google token:", token);
          const res = await fetch("http://localhost:8080/elearning/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
    
          const data = await res.json();
          console.log("JWT từ backend:", data.result);
          //window.location.href = "/"; 
    
        } catch (error) {
          console.error("Google login failed:", error);
        }
      };
      const handleGoogleLoginError = () => {
        console.error("Google login failed");
      };
    return (
    <div className="register-container">
        <div className="register-card">
        <Title level={2} className="register-title">Đăng ký tài khoản</Title>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />
        <p className="register-footer">
            Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
        </div>
    </div>
    );
};

export default Register;
