import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Header";
import './style.scss';
import Footer from "../components/Footer";
function LayoutDefault() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="outlet">
          <Outlet />
        </div>
      </div>
      <Footer/>
    </>
  );
}
export default LayoutDefault;