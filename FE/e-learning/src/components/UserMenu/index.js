import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const UserMenu = ({ user, handleLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="user-menu" ref={dropdownRef}>
      <button className="user-btn" onClick={() => setOpen((prev) => !prev)}>
        <img
          src={user.avatarUrl || "/default-avatar.png"}
          alt="avatar"
          className="avatar"
        />
        <span className="username">{user.fullName}</span>
        {open ? (
          <FaAngleUp style={{ width: "15px", color: "#2F327D" }} />
        ) : (
          <FaAngleDown style={{ width: "15px", color: "#2F327D" }} />
        )}
      </button>

      {open && (
        <AnimatePresence>
          <motion.div
            className="dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/userinfo"
              className="dropdown-item"
              onClick={() => setOpen(false)}
            >
              Hồ sơ cá nhân
            </Link>
            <Link
              to="/mycourses"
              className="dropdown-item"
              onClick={() => setOpen(false)}
            >
              Khóa học của tôi
            </Link>

            <Link
              to="/cartdetail"
              className="dropdown-item"
              onClick={() => setOpen(false)}
            >
              Giỏ hàng
            </Link>
            <button onClick={handleLogout} className="dropdown-item logout">
              Đăng xuất
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default UserMenu;
