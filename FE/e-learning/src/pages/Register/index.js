import { Typography } from "antd";
import { GoogleLogin } from '@react-oauth/google';
import "./style.scss";
import {UserService} from "../../services/UserService";

const { Title } = Typography;

const Register = ({ onClose }) => {
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
      const accessToken = data.result;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Lưu thông tin user vào localStorage hoặc state quản lý người dùng
      // localStorage.setItem("user", JSON.stringify(data.user));
      console.log("JWT từ backend:", accessToken);
      // window.location.href = "/";
      const userRes = await UserService.getCurrentUser();
      console.log("Current User after Google login:", userRes);
      localStorage.setItem("user", JSON.stringify(userRes));
      if (onClose) onClose();
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleGoogleLoginError = () => {
    console.error("Google login failed");
  };

  return (
    <div className={`register-wrapper ${onClose ? "overlay" : ""}`}>
      <div className="register-card">
        {onClose && (
          <button className="close-btn" onClick={onClose}>✕</button>
        )}

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
