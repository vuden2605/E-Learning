import React from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import "./style.scss";

const { Title } = Typography;

const Register = () => {

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
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Or</Divider>

        <Button
          icon={<GoogleOutlined />}
          className="google-btn"
          block
        >
          Sign Up with Google
        </Button>

        <p className="register-footer">
          Already have an account? <a href="#">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
