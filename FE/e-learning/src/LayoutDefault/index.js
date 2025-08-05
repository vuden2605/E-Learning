import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Header";
import './style.scss';
function LayoutDefault() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="outlet">
          <Outlet />
        </div>
      </div>

    </>
  );
}
export default LayoutDefault;