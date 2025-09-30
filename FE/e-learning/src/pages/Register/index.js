import { Typography } from "antd";
import { GoogleLogin } from '@react-oauth/google';
import "./style.scss";
import { UserService } from "../../services/UserService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import api from "../../api/axios";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
console.log("API URL:", REACT_APP_API_URL);
const { Title } = Typography;
const Register = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    console.log("User trong Redux đã thay đổi:", user);
  }, [user]);


  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      console.log("Google token:", token);

      const res = await api.post(
        `${REACT_APP_API_URL}/auth/google`,
        { token },
        { withCredentials: true } 
      );

      const accessToken = res.data.result;
      localStorage.setItem("accessToken", accessToken);
      // Lưu thông tin user vào localStorage hoặc state quản lý người dùng
      // localStorage.setItem("user", JSON.stringify(data.user));
      console.log("JWT từ backend:", accessToken);
      // window.location.href = "/";
      const userRes = await UserService.getCurrentUser();
      console.log("Current User after Google login:", userRes);
      dispatch(setUser(userRes)); // lưu user vào Redux


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