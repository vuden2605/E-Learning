import { NavLink, Link } from "react-router-dom";
import "./style.scss";
import logo from "../../assets/images/logo.png";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { UserService } from "../../services/UserService";
import UserMenu from "../UserMenu";
import { clearUser } from "../../redux/slices/userSilce"; 

function Navigation({ onLoginClick, onRegisterClick }) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await UserService.logout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("persist:root");
      dispatch(clearUser());
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navigation">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" height="70px" width="170px" />
        </Link>
      </div>
      <div className="nav-list">
        <NavLink to="/" className="nav-item">Trang chủ</NavLink>
        <NavLink to="/course" className="nav-item">Khóa học</NavLink>
        <NavLink to="/careers" className="nav-item">Nghề nghiệp</NavLink>
        <NavLink to="/blog" className="nav-item">Blog</NavLink>
        <NavLink to="/about" className="nav-item">About Us</NavLink>
      </div>
      {user ? (
        <UserMenu user={user} handleLogout={handleLogout} />
      ) : (
        <div className="sign-in-up">
          <div className="button-wrapper">
            <button
              onClick={onRegisterClick}
              className="shine-button button-ocean"
              style={{
                width: "fit-content",
                padding: "10px 15px",
                marginLeft: "-20px",
              }}
            >
              Bắt đầu ngay!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
