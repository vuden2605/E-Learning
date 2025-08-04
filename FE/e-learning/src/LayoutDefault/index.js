import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import './style.scss';
function LayoutDefault() {
  return (
    <>
      <Header />
      <div className="container">
        <Navigation />
        <div className="outlet">
          <Outlet />
        </div>
      </div>

    </>
  );
}
export default LayoutDefault;