import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Header";
import './style.scss';
import Footer from "../components/Footer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useState } from "react";
function LayoutDefault() {
  // const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
      <Header  onRegisterClick={() => setShowRegister(true)} />
      <div className="container">
        <div className="outlet">
          <Outlet />
        </div>
      </div>
      <Footer/>
      {/* {showLogin && <Login onClose={() => setShowLogin(false)} />} */}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </>
  );
}
export default LayoutDefault;