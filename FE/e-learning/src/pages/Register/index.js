import { useState } from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { GoogleLogin } from '@react-oauth/google';
import "./style.scss";
const { Title } = Typography;
const Register = () => {
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
          const token = credentialResponse.credential;
    
          // Gửi token về backend Spring Boot
          const res = await fetch("http://localhost:8080/elearning/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
    
          const data = await res.json();
          console.log("JWT từ backend:", data.result.accessToken);

          // Lưu vào localStorage
          localStorage.setItem("accessToken", data.result.accessToken);
          localStorage.setItem("refreshToken", data.result.refreshToken);

    
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
        <Title level={2} className="register-title">Register</Title>

        <Form
            layout="vertical"
            className="register-form"
        >
            <Form.Item
            label="Full Name"
            name="fullname"
          
            rules={[{ required: true, message: "Please enter your full name" }]}
            >
                <Input 
                    placeholder="Enter your full name" 
                />
            </Form.Item>

            <Form.Item
            label="Email"
            name="email"
            rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Invalid email format" },
            ]}
            >
                <Input 
                    placeholder="Enter your email" 
                />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" block>
                Sign Up
            </Button>
            </Form.Item>
        </Form>

        <Divider plain>Or</Divider>

       
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />

        <p className="register-footer">
            Already have an account? <a href="/login">Login</a>
        </p>
        </div>
    </div>
    );
};

export default Register;
